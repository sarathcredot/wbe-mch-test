

import express from 'express';
import cors from "cors";
import dotenv from "dotenv"
import authRouter from "./routers/authRouter"
import productRouter from "./routers/productRouter"
import cartRouter from "./routers/cartRouter"
import orderRouter from "./routers/orderRouter"
import fileUploadRouter from "./routers/fileUploading"
import path from 'path';
import fs from "fs";



dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Serving media from:", path.join(__dirname, "../media"));

app.use(
    "/media",
    express.static(path.join(__dirname, "../media"))
);


app.get("/check", (req, res) => {
    console.log("Checking media file...");
    const filePath = path.join(__dirname, "../media/img.jpeg");
    const exists = fs.existsSync(filePath);
    res.json({ path: filePath, exists });
});


// server check router

app.get("/test", (req, res) => {

    console.log("hiii")
    // res.json({ msg: "Server is running" })
});


// file uploading 

app.use("/api/upload", fileUploadRouter)

// auth router

app.use("/api/auth", authRouter);

// product router

app.use("/api/product", productRouter)

// cart router

app.use("/api/cart", cartRouter);

// order router

app.use("/api/order", orderRouter);

export default app; 