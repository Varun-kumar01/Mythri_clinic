const router = require("express").Router();
const upload = require("../../middlewares/upload.middleware");
const auth = require("../../middlewares/auth.middleware");
const db = require("../../config/db");

router.post("/upload", auth, upload.single("document"), async (req, res, next) => {
  try {
    const { originalname, filename, mimetype, size, path } = req.file;

    await db.query(
      `INSERT INTO file_uploads (user_id, original_name, stored_name, mime_type, size_bytes, storage_path)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [req.user.sub, originalname, filename, mimetype, size, path]
    );

    res.status(201).json({ message: "Upload successful", file: filename });
  } catch (err) {
    next(err);
  }
});

module.exports = router;