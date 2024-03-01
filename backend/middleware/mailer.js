const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: config.emailService,
    // host: config.emailHost,
    port: 465,
    secure: true,
    debug: true,
    logger: true,
    secureConnection: false,
    auth: {
        user: config.emailUsername,
        pass: config.emailPassword
    },
    tls: {
        rejectUnauthorized: false,
    }
});


module.exports = transporter  