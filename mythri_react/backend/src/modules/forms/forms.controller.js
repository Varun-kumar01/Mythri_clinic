// backend/src/modules/forms/forms.controller.js
const db = require("../../config/db");

exports.createForm = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const result = await db.query(
      `INSERT INTO forms (title, description, created_by)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, created_by`,
      [title, description, req.user.sub]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};