import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/VehicleDB`)
        console.log('MongoDB connected successfully ' + conn.connection.host)
    } catch (error) {
        console.log('Error : ' + error.message)
    }
}

export default connectDB