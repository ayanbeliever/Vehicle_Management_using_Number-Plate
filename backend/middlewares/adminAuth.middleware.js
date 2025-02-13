import jwt, { decode } from 'jsonwebtoken';
import { Admin } from '../models/admin.model.js';

export const adminAuth = async (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ",""); // Extract token from header

  if (!token) {
    return res.status(403).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded._id).select("-password")

    if(!admin) {
      return res.status(401).json({success: false , message: "Invalid jwt token"})
    }
    
    req.admin = decoded; // Attach admin data to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};