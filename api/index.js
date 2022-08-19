import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import cookieParse from 'cookie-parser';
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
// const cors = require('cors');
dotenv.config()



//mongoDB connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect to mongo db");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});


//middlewares
app.use(cors()); //Use for COR origin server policy to make request from different user
app.use(cookieParse());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage 
    });
}) 



app.get("/users" , (req, res) => {
    res.send("Hello");
})


app.listen(8800, () => {
    connect();
    console.log("Connect to backend!");
})