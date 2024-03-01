const express = require('express');
const router = express.Router();
const inputValidator = require('../middleware/validateInput');
const authHandler = require('../controllers/auth');

router.post('/create-user', inputValidator, authHandler.createUser)

router.post('/login', inputValidator, authHandler.login)

router.post('/reset-password', inputValidator, authHandler.resetPassword)

router.post('/forgot-password', inputValidator, authHandler.forgotPassword)

module.exports = router;