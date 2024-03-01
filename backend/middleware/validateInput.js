const validator = require('validator');

const inputValidator = (req, res, next) => {
    const { name, email, password } = req.body;
    if ((email) && !validator.isEmail(email)) {
        return res.status(400).send('Please insert a valid email address');
    }
    if ((password) && !validator.isLength(password, { min: 6 })) {
        return res.status(400).send('Password has to be atleast 6 characters long');
    }
    if ((name) && !validator.isLength(name, { min: 6 })) {
        return res.status(400).send('Name has to be atleast 6 characters long');
    }
    next();
}

module.exports = inputValidator;