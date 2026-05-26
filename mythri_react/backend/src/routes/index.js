const express = require("express");

const router = express.Router();

/**
 * Placeholder middlewares (replace with real implementations)
 */
const requireAuth = (req, res, next) => next();
const requireAdmin = (req, res, next) => next();

/**
 * Controllers placeholders (replace by importing module controllers)
 */
const ok = (name) => (req, res) => res.json({ route: name, ok: true });

/* =========================
   Auth Routes (/api/v1/auth)
========================= */
router.post("/auth/login", ok("POST /api/v1/auth/login"));
router.post("/auth/register", ok("POST /api/v1/auth/register"));
router.post("/auth/forgot-password", ok("POST /api/v1/auth/forgot-password"));
router.post("/auth/logout", requireAuth, ok("POST /api/v1/auth/logout"));
router.get("/auth/me", requireAuth, ok("GET /api/v1/auth/me"));

/* ==============================
   Admin Auth (/api/v1/admin/auth)
============================== */
router.post("/admin/auth/login", ok("POST /api/v1/admin/auth/login"));
router.post("/admin/auth/logout", requireAdmin, ok("POST /api/v1/admin/auth/logout"));
router.get("/admin/auth/me", requireAdmin, ok("GET /api/v1/admin/auth/me"));

/* =================================
   User Reports (/api/v1/reports)
================================= */
router.get("/reports", requireAuth, ok("GET /api/v1/reports"));
router.post("/reports", requireAuth, ok("POST /api/v1/reports"));
router.get("/reports/:reportId", requireAuth, ok("GET /api/v1/reports/:reportId"));
router.put("/reports/:reportId", requireAuth, ok("PUT /api/v1/reports/:reportId"));
router.delete("/reports/:reportId", requireAuth, ok("DELETE /api/v1/reports/:reportId"));

/* ==========================================
   Admin Dashboard + Reports (/api/v1/admin/*)
========================================== */
router.get("/admin/dashboard/summary", requireAdmin, ok("GET /api/v1/admin/dashboard/summary"));
router.get("/admin/reports", requireAdmin, ok("GET /api/v1/admin/reports"));
router.get("/admin/reports/:reportId", requireAdmin, ok("GET /api/v1/admin/reports/:reportId"));
router.get("/admin/reports/export", requireAdmin, ok("GET /api/v1/admin/reports/export"));

/* ==========================
   Uploads (/api/v1/uploads)
========================== */
router.post("/uploads/report-document", requireAuth, ok("POST /api/v1/uploads/report-document"));
router.get("/uploads/:fileId/download", requireAuth, ok("GET /api/v1/uploads/:fileId/download"));
router.delete("/uploads/:fileId", requireAuth, ok("DELETE /api/v1/uploads/:fileId"));

/* =========================
   Health (/api/v1/health)
========================= */
router.get("/health", ok("GET /api/v1/health"));

module.exports = router;