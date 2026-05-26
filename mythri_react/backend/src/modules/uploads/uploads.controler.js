// backend/src/modules/uploads/uploads.controller.js

const uploadsService = require("./uploads.service");

const uploadsController = {
  async uploadReportDocument(req, res, next) {
    try {
      // multer puts file metadata in req.file
      // expected field name: "document"
      const userId = req.user.sub;
      const reportId = req.body.reportId ? Number(req.body.reportId) : null;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const saved = await uploadsService.saveUploadMetadata({
        userId,
        reportId,
        file: req.file
      });

      /** Response DTO
       * {
       *   id: number,
       *   reportId: number | null,
       *   originalName: string,
       *   storedName: string,
       *   mimeType: string,
       *   sizeBytes: number,
       *   downloadUrl: string
       * }
       */
      return res.status(201).json(saved);
    } catch (err) {
      return next(err);
    }
  },

  async downloadFile(req, res, next) {
    try {
      const userId = req.user.sub;
      const fileId = Number(req.params.fileId);

      const file = await uploadsService.getDownloadableFile({ userId, fileId });
      // file: { absolutePath, originalName, mimeType }

      res.setHeader("Content-Type", file.mimeType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.originalName}"`
      );

      return res.sendFile(file.absolutePath);
    } catch (err) {
      return next(err);
    }
  },

  async deleteFile(req, res, next) {
    try {
      const userId = req.user.sub;
      const fileId = Number(req.params.fileId);

      await uploadsService.deleteFile({ userId, fileId });
      return res.status(200).json({ message: "File deleted successfully" });
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = uploadsController;