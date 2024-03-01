const jwt = require('jsonwebtoken');
const config = require('../config/config'); //jwt secure key. this sould shift in a config file.

const fetchUser = (req, res, next) => {
    const authToken = req.header('x-auth-token');
    if (!authToken) {
        res.status(401).send('Authentication failed. Token not found.');    //check and confirm whether return to be added or not.
    }
    try {
        const data = jwt.verify(authToken, config.jwtSecretKey);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Access denied. please authenticate using valid token' })
    }

}

module.exports = fetchUser;