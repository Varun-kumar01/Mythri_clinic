// backend/src/modules/auth/auth.controller.js
// Replace service calls with your actual PostgreSQL queries/service methods.

const authService = require("./auth.service");

const authController = {
  async login(req, res, next) {
    try {
      /** Request DTO
       * { mobileNumber: string, password: string }
       */
      const { mobileNumber, password } = req.body;

      const result = await authService.login({ mobileNumber, password });

      /** Response DTO
       * {
       *   token: string,
       *   expiresIn: number,
       *   user: {
       *     id: number,
       *     mobileNumber: string,
       *     role: "user" | "admin",
       *     district?: string,
       *     hospital?: string,
       *     cdpo?: string
       *   }
       * }
       */
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },

  async register(req, res, next) {
    try {
      /** Request DTO
       * {
       *   mobileNumber: string,
       *   password: string,
       *   district: string,
       *   hospital: string,
       *   cdpo: string
       * }
       */
      const payload = req.body;
      const created = await authService.register(payload);

      /** Response DTO
       * { id: number, mobileNumber: string, message: string }
       */
      return res.status(201).json(created);
    } catch (err) {
      return next(err);
    }
  },

  async forgotPassword(req, res, next) {
    try {
      /** Request DTO
       * { mobileNumber: string, newPassword: string, confirmPassword: string }
       */
      const payload = req.body;
      const result = await authService.forgotPassword(payload);

      /** Response DTO
       * { message: string }
       */
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },

  async me(req, res, next) {
    try {
      // req.user comes from auth middleware
      const user = await authService.getMe(req.user.sub);

      /** Response DTO
       * { id, mobileNumber, role, district, hospital, cdpo }
       */
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  },

  async logout(req, res, next) {
    try {
      // JWT stateless: usually client deletes token.
      // If using refresh tokens, revoke it here.
      await authService.logout(req.user?.sub);
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = authController;