// backend/src/middlewares/upload.middleware.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const allowedTypes = new Set(["image/jpeg", "image/png", "application/pdf"]);

const fileFilter = (req, file, cb) => {
  cb(null, allowedTypes.has(file.mimetype));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});