import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

const app = express();

app.use(cors( {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
// app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use(cookieParser())

const PORT = process.env.PORT

app.listen(PORT, () => {
    connectDB()
    console.log('Server connected successfully')
})

import adminRoutes from './routes/admin.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import ownerRoutes from './routes/owner.routes.js'
import violationRoutes from './routes/violation.routes.js'
import tollRecordRoutes from './routes/tollRecord.routes.js'
import insuranceRoutes from './routes/insurance.routes.js'

app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/vehicles", vehicleRoutes)
app.use("/api/v1/owners", ownerRoutes)
app.use("/api/v1/violations", violationRoutes)
app.use("/api/v1/tollrecords",tollRecordRoutes)
app.use("/api/v1/insurances", insuranceRoutes)