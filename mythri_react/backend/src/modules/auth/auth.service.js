const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const authService = {
  async login({ mobileNumber, password }) {
    const sql = `
      SELECT id, mobile_number, password_hash, role, district, hospital, cdpo
      FROM users
      WHERE mobile_number = $1
      LIMIT 1
    `;
    const { rows } = await db.query(sql, [mobileNumber]);
    if (!rows.length) throw Object.assign(new Error("Invalid credentials"), { status: 401 });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw Object.assign(new Error("Invalid credentials"), { status: 401 });

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      expiresIn: 3600,
      user: {
        id: user.id,
        mobileNumber: user.mobile_number,
        role: user.role,
        district: user.district,
        hospital: user.hospital,
        cdpo: user.cdpo
      }
    };
  },

  async register({ mobileNumber, password, district, hospital, cdpo }) {
    const passwordHash = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (mobile_number, password_hash, role, district, hospital, cdpo, created_at, updated_at)
      VALUES ($1, $2, 'user', $3, $4, $5, NOW(), NOW())
      RETURNING id, mobile_number
    `;
    const { rows } = await db.query(sql, [mobileNumber, passwordHash, district, hospital, cdpo]);

    return { id: rows[0].id, mobileNumber: rows[0].mobile_number, message: "Registered successfully" };
  },

  async forgotPassword({ mobileNumber, newPassword, confirmPassword }) {
    if (newPassword !== confirmPassword) {
      throw Object.assign(new Error("Passwords do not match"), { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const sql = `
      UPDATE users
      SET password_hash = $1, updated_at = NOW()
      WHERE mobile_number = $2
    `;
    const result = await db.query(sql, [passwordHash, mobileNumber]);
    if (result.rowCount === 0) throw Object.assign(new Error("User not found"), { status: 404 });

    return { message: "Password reset successful" };
  },

  async getMe(userId) {
    const sql = `
      SELECT id, mobile_number, role, district, hospital, cdpo
      FROM users
      WHERE id = $1
      LIMIT 1
    `;
    const { rows } = await db.query(sql, [userId]);
    if (!rows.length) throw Object.assign(new Error("User not found"), { status: 404 });

    return {
      id: rows[0].id,
      mobileNumber: rows[0].mobile_number,
      role: rows[0].role,
      district: rows[0].district,
      hospital: rows[0].hospital,
      cdpo: rows[0].cdpo
    };
  },

  async logout() {
    return { message: "Logged out successfully" };
  }
};

module.exports = authService;