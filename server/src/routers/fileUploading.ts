

import multer from "multer";
import express from "express";
import path from "path";
import { handleResponse } from "../utils/responseHandler"

const router = express.Router();

// Configure multer storage with original file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "media/"); // save files in media folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Upload route
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return handleResponse.handleError(res, "", "no file uploaded", 400);
    }

    // Full path (useful if frontend needs full URL)
    const filePath = `/media/${req.file.filename}`;

    return handleResponse.handleSuccess(res, filePath, "file uploaded successfully", 200);
});

export default router;
