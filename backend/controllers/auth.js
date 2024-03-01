const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const mailer = require('../middleware/mailer');
const { Op } = require('sequelize');

const User = require('../models/User');

module.exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).send({ user: 'This user already exist. Please try with different email address.' })
        }
    } catch (error) {
        res.status(500).send('Internal server error. Finding user');
    }
    // for creating new user.
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword)
    try {
        console.log('Inside try block of saving.')
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        if (user) {
            console.log(user)
            const authToken = await jwt.sign({ id: user.id }, config.jwtSecretKey);
            res.status(200).send(authToken);
        } else {
            res.status(400).send('Error while creating user.')
        }
    } catch (error) {
        res.status(500).send({ error: error.message + ' Internal server error.' })
    }
}

module.exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(400).send('Invalid username or password.')
        }
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
    // code for login functionality.
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const matchPass = await bcrypt.compare(req.body.password, user.password)
            if (matchPass) {
                const data = {
                    id: user.id,
                }
                const authToken = jwt.sign(data, config.jwtSecretKey);
                res.status(200).send({ authToken });
            } else {
                return res.status(400).send('Invalid username or password.')
            }
        } else {
            return res.status(400).send('Invalid username or password.')
        }
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
}

module.exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: { [Op.gt]: Date.now() }
            }
        })
        if (!user) {
            return res.status(400).send('Invalid Token. Kindly provide a valid')
        }
        // for encrypting password.
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        res.status(200).send('Password updated successfully.');
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Internal Server Error' })
    }
}

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(400).send('Invalid Username.');
        }
        console.log(user)
        user.resetToken = await jwt.sign({ id: user.id }, config.jwtSecretKey);
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();
        console.log('updated', user)
        res.status(200).send({ token: user.resetToken });
        const resetLink = `http://localhost:3000/reset-password?token=${user.resetToken}`;
        const mailOptions = {
            from: config.emailUsername,
            to: user.email,
            subject: 'Reset your password for tech solutiopn testing website.',
            text: `Click on the link to proceed.${resetLink}`
        }
        mailer.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Internal Server Error' })
    }
}