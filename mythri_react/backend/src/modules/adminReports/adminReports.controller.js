// backend/src/modules/adminReports/adminReports.controller.js

const adminReportsService = require("./adminReports.service");

const adminReportsController = {
  async getSummary(req, res, next) {
    try {
      const { filter = "weekly" } = req.query;

      /** Response DTO
       * {
       *   totalOfficersReported: number,
       *   totalReportsSubmitted: number,
       *   totalOpsConducted: number
       * }
       */
      const summary = await adminReportsService.getSummary({ filter });
      return res.status(200).json(summary);
    } catch (err) {
      return next(err);
    }
  },

  async listDetailedReports(req, res, next) {
    try {
      const {
        filter = "weekly",
        district,
        hospital,
        fromDate,
        toDate,
        page = 1,
        limit = 50
      } = req.query;

      const data = await adminReportsService.listDetailedReports({
        filter,
        district,
        hospital,
        fromDate,
        toDate,
        page: Number(page),
        limit: Number(limit)
      });

      /** Response DTO
       * {
       *   items: AdminReportDTO[],
       *   pagination: { page, limit, total }
       * }
       */
      return res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async getReportById(req, res, next) {
    try {
      const reportId = Number(req.params.reportId);
      const report = await adminReportsService.getReportById({ reportId });
      return res.status(200).json(report);
    } catch (err) {
      return next(err);
    }
  },

  async exportReports(req, res, next) {
    try {
      const { filter = "weekly", district, hospital, fromDate, toDate } = req.query;

      // Service should return file path/buffer/stream
      const file = await adminReportsService.exportReports({
        filter,
        district,
        hospital,
        fromDate,
        toDate
      });

      // Example if service returns { buffer, filename, mimeType }
      res.setHeader("Content-Type", file.mimeType);
      res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
      return res.status(200).send(file.buffer);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = adminReportsController;