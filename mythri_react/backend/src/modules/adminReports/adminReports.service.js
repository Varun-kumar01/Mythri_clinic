const db = require("../../config/db");

function filterToInterval(filter) {
  if (filter === "monthly") return "1 month";
  if (filter === "daily") return "1 day";
  return "7 day"; // weekly default
}

const adminReportsService = {
  async getSummary({ filter }) {
    const interval = filterToInterval(filter);

    const sql = `
      SELECT
        COUNT(DISTINCT r.user_id)::int AS total_officers_reported,
        COUNT(r.id)::int AS total_reports_submitted,
        COALESCE(SUM(r.total_ops), 0)::int AS total_ops_conducted
      FROM reports r
      WHERE r.report_date >= (CURRENT_DATE - INTERVAL '${interval}')
    `;

    const { rows } = await db.query(sql);
    return {
      totalOfficersReported: rows[0].total_officers_reported,
      totalReportsSubmitted: rows[0].total_reports_submitted,
      totalOpsConducted: rows[0].total_ops_conducted
    };
  },

  async listDetailedReports({ filter, district, hospital, fromDate, toDate, page, limit }) {
    const offset = (page - 1) * limit;
    const conditions = [];
    const values = [];
    let i = 1;

    if (fromDate) { conditions.push(`r.report_date >= $${i++}`); values.push(fromDate); }
    if (toDate) { conditions.push(`r.report_date <= $${i++}`); values.push(toDate); }
    if (!fromDate && !toDate) {
      const interval = filterToInterval(filter);
      conditions.push(`r.report_date >= (CURRENT_DATE - INTERVAL '${interval}')`);
    }
    if (district) { conditions.push(`u.district = $${i++}`); values.push(district); }
    if (hospital) { conditions.push(`u.hospital = $${i++}`); values.push(hospital); }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const listSql = `
      SELECT
        r.id, r.report_date, r.champion_attended, r.transman_op, r.transwoman_op, r.total_ops, r.remarks,
        r.document_file_id, r.created_at, r.updated_at,
        u.id AS user_id, u.mobile_number AS officer_mobile_number, u.district, u.hospital, u.cdpo
      FROM reports r
      JOIN users u ON u.id = r.user_id
      ${where}
      ORDER BY r.report_date DESC, r.id DESC
      LIMIT $${i++} OFFSET $${i++}
    `;
    const listValues = [...values, limit, offset];

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM reports r
      JOIN users u ON u.id = r.user_id
      ${where}
    `;

    const [listRes, countRes] = await Promise.all([
      db.query(listSql, listValues),
      db.query(countSql, values)
    ]);

    return {
      items: listRes.rows,
      pagination: { page, limit, total: countRes.rows[0].total }
    };
  },

  async getReportById({ reportId }) {
    const sql = `
      SELECT
        r.id, r.report_date, r.champion_attended, r.transman_op, r.transwoman_op, r.total_ops, r.remarks,
        r.document_file_id, r.created_at, r.updated_at,
        u.id AS user_id, u.mobile_number AS officer_mobile_number, u.district, u.hospital, u.cdpo
      FROM reports r
      JOIN users u ON u.id = r.user_id
      WHERE r.id = $1
      LIMIT 1
    `;
    const { rows } = await db.query(sql, [reportId]);
    if (!rows.length) throw Object.assign(new Error("Report not found"), { status: 404 });
    return rows[0];
  },

  async exportReports({ filter, district, hospital, fromDate, toDate }) {
    // Keep same filter logic as listDetailedReports, then build XLSX in this service.
    // Return { buffer, filename, mimeType } for controller.
    // Stub return:
    return {
      buffer: Buffer.from("TODO: generate xlsx"),
      filename: "reports.xlsx",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    };
  }
};

module.exports = adminReportsService;