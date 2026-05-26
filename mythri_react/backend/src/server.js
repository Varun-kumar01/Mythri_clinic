// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const db = require("./config/db");

// const app = express();

// app.use(cors({ origin: "http://localhost:5173" }));
// app.use(express.json());

// /**
//  * POST /api/v1/auth/login
//  * body: { mobileNumber, password }
//  */
// app.post("/api/v1/auth/login", async (req, res) => {
//   try {
//     const { mobileNumber, password } = req.body;
//     if (!mobileNumber || !password) {
//       return res.status(400).json({ message: "mobileNumber and password are required" });
//     }

//     const sql = `
//       SELECT id, mobile_number, password_hash, district, hospital, cdpo
//       FROM public.officer_registration
//       WHERE mobile_number = $1
//       LIMIT 1
//     `;
//     const result = await db.query(sql, [mobileNumber]);

//     if (result.rowCount === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const user = result.rows[0];
//     const ok = await bcrypt.compare(password, user.password_hash);
//     if (!ok) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { sub: user.id, role: "officer" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Modular routers
//     const authRoutes = require("./modules/auth/auth.routes");
//     const formsRoutes = require("./modules/forms/forms.routes");
//     const filesRoutes = require("./modules/files/files.routes");
//     // If you have reports routes, import them here
//     // const reportsRoutes = require("./modules/reports/reports.routes");

//     app.use("/api/v1/auth", authRoutes);
//     app.use("/api/v1/forms", formsRoutes);
//     app.use("/api/v1/files", filesRoutes);
//     // app.use("/api/v1/reports", reportsRoutes); // Uncomment if reports.routes.js exists
//       INSERT INTO public.dashboard_reports
//       (officer_id, report_date, champion_attended, transman_op, transwoman_op, total_ops, remarks, created_at, updated_at)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
//       RETURNING id, officer_id, report_date, champion_attended, transman_op, transwoman_op, total_ops, remarks, created_at
//     `;

//     const values = [
//       req.user.sub,
//       reportDate,
//       championAttended,
//       Number(transmanOp || 0),
//       Number(transwomanOp || 0),
//       Number(totalOps),
//       remarks || null
//     ];

//     const result = await db.query(sql, values);
//     return res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("Create report error:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/api/v1/health", async (req, res) => {
//   try {
//     await db.query("SELECT 1");
//     res.json({ ok: true });
//   } catch {
//     res.status(500).json({ ok: false });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`API running on http://localhost:${PORT}`);
// });



require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config/db");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


// ROUTES IMPORTS
const authRoutes = require("./modules/auth/auth.routes");
const formsRoutes = require("./modules/forms/forms.routes");
const filesRoutes = require("./modules/files/files.routes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/forms", formsRoutes);
app.use("/api/v1/files", filesRoutes);


// LOGIN API
app.post("/api/v1/auth/login", async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password) {
      return res.status(400).json({
        message: "mobileNumber and password are required"
      });
    }

    const sql = `
      SELECT id, mobile_number, password_hash, district, hospital, cdpo
      FROM public.officer_registration
      WHERE mobile_number = $1
      LIMIT 1
    `;

    const result = await db.query(sql, [mobileNumber]);

    if (result.rowCount === 0) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = result.rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { sub: user.id, role: "officer" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        mobileNumber: user.mobile_number,
        district: user.district,
        hospital: user.hospital,
        cdpo: user.cdpo
      }
    });

  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});


// HEALTH API
app.get("/api/v1/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});