const fs = require("fs/promises");
const path = require("path");
const db = require("../../config/db");

const uploadsService = {
  async saveUploadMetadata({ userId, reportId, file }) {
    const sql = `
      INSERT INTO uploads
      (user_id, report_id, original_name, stored_name, mime_type, size_bytes, storage_path, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING id, user_id, report_id, original_name, stored_name, mime_type, size_bytes, storage_path, created_at
    `;
    const { rows } = await db.query(sql, [
      userId,
      reportId,
      file.originalname,
      file.filename,
      file.mimetype,
      file.size,
      file.path
    ]);

    // Optional: link uploaded file to report
    if (reportId) {
      await db.query(
        `UPDATE reports SET document_file_id = $1, updated_at = NOW() WHERE id = $2`,
        [rows[0].id, reportId]
      );
    }

    return {
      id: rows[0].id,
      reportId: rows[0].report_id,
      originalName: rows[0].original_name,
      storedName: rows[0].stored_name,
      mimeType: rows[0].mime_type,
      sizeBytes: rows[0].size_bytes,
      downloadUrl: `/api/v1/uploads/${rows[0].id}/download`
    };
  },

  async getDownloadableFile({ userId, fileId }) {
    const sql = `
      SELECT id, user_id, original_name, mime_type, storage_path
      FROM uploads
      WHERE id = $1
      LIMIT 1
    `;
    const { rows } = await db.query(sql, [fileId]);
    if (!rows.length) throw Object.assign(new Error("File not found"), { status: 404 });

    const file = rows[0];
    // Add admin bypass in controller/service if needed
    if (file.user_id !== userId) {
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    }

    return {
      absolutePath: path.resolve(file.storage_path),
      originalName: file.original_name,
      mimeType: file.mime_type
    };
  },

  async deleteFile({ userId, fileId }) {
    const sql = `
      DELETE FROM uploads
      WHERE id = $1 AND user_id = $2
      RETURNING id, storage_path
    `;
    const { rows } = await db.query(sql, [fileId, userId]);
    if (!rows.length) throw Object.assign(new Error("File not found or not permitted"), { status: 404 });

    // Best effort filesystem cleanup
    try {
      await fs.unlink(path.resolve(rows[0].storage_path));
    } catch (_) {
      // ignore missing file; optionally log
    }
  }
};

module.exports = uploadsService;