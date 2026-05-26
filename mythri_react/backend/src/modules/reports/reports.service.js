const db = require("../../config/db");

const reportsService = {
  async listMyReports({ userId, page, limit }) {
    const offset = (page - 1) * limit;

    const listSql = `
      SELECT id, user_id, report_date, champion_attended, transman_op, transwoman_op, total_ops,
             remarks, document_file_id, created_at, updated_at
      FROM reports
      WHERE user_id = $1
      ORDER BY report_date DESC, id DESC
      LIMIT $2 OFFSET $3
    `;
    const countSql = `SELECT COUNT(*)::int AS total FROM reports WHERE user_id = $1`;

    const [listRes, countRes] = await Promise.all([
      db.query(listSql, [userId, limit, offset]),
      db.query(countSql, [userId])
    ]);

    return {
      items: listRes.rows,
      pagination: { page, limit, total: countRes.rows[0].total }
    };
  },

  async createReport({ userId, payload }) {
    const {
      reportDate,
      championAttended,
      transmanOp,
      transwomanOp,
      totalOps,
      remarks = null
    } = payload;

    const sql = `
      INSERT INTO reports
      (user_id, report_date, champion_attended, transman_op, transwoman_op, total_ops, remarks, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id, user_id, report_date, champion_attended, transman_op, transwoman_op, total_ops, remarks, document_file_id, created_at, updated_at
    `;
    const { rows } = await db.query(sql, [
      userId, reportDate, championAttended, transmanOp, transwomanOp, totalOps, remarks
    ]);

    return rows[0];
  },

  async getReportById({ userId, reportId }) {
    const sql = `
      SELECT id, user_id, report_date, champion_attended, transman_op, transwoman_op, total_ops,
             remarks, document_file_id, created_at, updated_at
      FROM reports
      WHERE id = $1 AND user_id = $2
      LIMIT 1
    `;
    const { rows } = await db.query(sql, [reportId, userId]);
    if (!rows.length) throw Object.assign(new Error("Report not found"), { status: 404 });
    return rows[0];
  },

  async updateReport({ userId, reportId, payload }) {
    const {
      reportDate,
      championAttended,
      transmanOp,
      transwomanOp,
      totalOps,
      remarks = null
    } = payload;

    const sql = `
      UPDATE reports
      SET report_date = $1,
          champion_attended = $2,
          transman_op = $3,
          transwoman_op = $4,
          total_ops = $5,
          remarks = $6,
          updated_at = NOW()
      WHERE id = $7 AND user_id = $8
      RETURNING id, user_id, report_date, champion_attended, transman_op, transwoman_op, total_ops,
                remarks, document_file_id, created_at, updated_at
    `;
    const { rows } = await db.query(sql, [
      reportDate, championAttended, transmanOp, transwomanOp, totalOps, remarks, reportId, userId
    ]);

    if (!rows.length) throw Object.assign(new Error("Report not found or not permitted"), { status: 404 });
    return rows[0];
  },

  async deleteReport({ userId, reportId }) {
    const sql = `DELETE FROM reports WHERE id = $1 AND user_id = $2`;
    const result = await db.query(sql, [reportId, userId]);
    if (result.rowCount === 0) throw Object.assign(new Error("Report not found or not permitted"), { status: 404 });
  }
};

module.exports = reportsService;