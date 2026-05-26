const express = require('express');
const authController = require('./auth.controller');
const validate = require('../../middlewares/validate.middleware');
const { loginSchema } = require('./auth.validation');

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authController.me);
router.post('/register', authController.register);
router.post('/reset', authController.forgotPassword);

module.exports = router;
