import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin.model.js';

const registerAdmin = async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
      const admin = new Admin({ email, password, name });
      await admin.save();
  
      res.status(201).json({ message: 'Admin registered successfully',data: admin });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!(email && password)) {
        return res.status(400).json({success: false, message: "All fields are required"})
    }

    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    // Verify the password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate a token
    const token = await admin.generateJwtToken()
    const loggedInAdmin = await Admin.findById(admin._id).select("-password")

    const options = {
      httpOnly: true,
      secure: true
    }

    return res
    .status(200)
    .cookie("token", token, options)
    .json({success: true, message: 'Login successful', data : {admin: loggedInAdmin , token} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Logout Admin
 */
const logoutAdmin = async (req, res) => {
  try {
    // Invalidate the token by removing it on the client-side
    await Admin.findByIdAndUpdate(
      req.admin._id,
      {
        $unset: {token : 1}
      },
      {
        new: true
      }
    )
    const options = {
      httpOnly: true,
      secure: true
    }
    return res
    .status(200)
    .clearCookie("token", options)
    .json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to logout' });
  }
};

/**
 * Update Admin Password
 */
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find the logged-in admin by ID from the request (set in adminAuth middleware)
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Check if the old password matches
    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // Hash the new password and update
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
};

/**
 * Update Admin Email
 */
const updateEmail = async (req, res) => {
  try {
    console.log(req.admin)
    const { email } = req.body;

    if(!email) {
      return res.status(403).json({success: false , message: "Email is required"})
    }

    // Find the logged-in admin by ID from the request (set in adminAuth middleware)
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Update the email
    admin.email = email;
    await admin.save();

    res.status(200).json({ message: 'Email updated successfully', email: admin.email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update email' });
  }
};


export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    updatePassword,
    updateEmail
}