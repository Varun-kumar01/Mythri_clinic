// backend/src/modules/reports/reports.controller.js

const reportsService = require("./reports.service");

const reportsController = {
  async listMyReports(req, res, next) {
    try {
      const userId = req.user.sub;
      const { page = 1, limit = 20 } = req.query;

      const data = await reportsService.listMyReports({
        userId,
        page: Number(page),
        limit: Number(limit)
      });

      /** Response DTO
       * {
       *   items: ReportDTO[],
       *   pagination: { page: number, limit: number, total: number }
       * }
       */
      return res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async createReport(req, res, next) {
    try {
      /** Request DTO (from dashboard form)
       * {
       *   reportDate: "YYYY-MM-DD",
       *   championAttended: string,
       *   transmanOp: number,
       *   transwomanOp: number,
       *   totalOps: number,
       *   remarks?: string
       * }
       */
      const payload = req.body;
      const userId = req.user.sub;

      const created = await reportsService.createReport({ userId, payload });

      /** Response DTO
       * ReportDTO
       */
      return res.status(201).json(created);
    } catch (err) {
      return next(err);
    }
  },

  async getReportById(req, res, next) {
    try {
      const userId = req.user.sub;
      const reportId = Number(req.params.reportId);

      const report = await reportsService.getReportById({ userId, reportId });
      return res.status(200).json(report);
    } catch (err) {
      return next(err);
    }
  },

  async updateReport(req, res, next) {
    try {
      const userId = req.user.sub;
      const reportId = Number(req.params.reportId);
      const payload = req.body;

      const updated = await reportsService.updateReport({
        userId,
        reportId,
        payload
      });

      return res.status(200).json(updated);
    } catch (err) {
      return next(err);
    }
  },

  async deleteReport(req, res, next) {
    try {
      const userId = req.user.sub;
      const reportId = Number(req.params.reportId);

      await reportsService.deleteReport({ userId, reportId });
      return res.status(200).json({ message: "Report deleted successfully" });
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = reportsController;