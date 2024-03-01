require('dotenv').config();

module.exports = {
    dialect: process.env.dialect,
    host: process.env.host,
    port: process.env.port,
    dbname: process.env.dbname,
    dbpassword: process.env.dbpassword,
    dbusername: process.env.dbusername,
    jwtSecretKey: process.env.jwtPrivateKey,
    emailUsername: process.env.emailUsername,
    emailPassword: process.env.emailPassword,
    emailService: process.env.emailService,
    emailHost: process.env.emailHost,
}