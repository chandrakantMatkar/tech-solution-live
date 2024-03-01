const Contact = require('../models/Contact');
const { Op } = require('sequelize');

module.exports.pendingContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            where: { convenientTime: { [Op.gte]: Date.now() } },
            attributes: ['id','name', 'email', 'phone', 'convenientTime', 'message','remark'],
        });
        if (!contacts) {
            return res.status(200).send('No pending calls to make.');
        } else {
            return res.status(200).send(contacts);
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error.' })
    }
}

module.exports.allContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll({ attributes: ['id','name', 'email', 'phone', 'convenientTime', 'message','remark'], });
        if (!contacts) {
            return res.status(200).send('No pending calls to make.');
        } else {
            return res.status(200).send(contacts);
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error.' })
    }
}

module.exports.updateContact = async (req, res) => {
    const { remark } = req.body;
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) {
            return res.status(404).send('Contact not found to update.')
        }
        contact.remark = remark;
        await contact.save();
        res.status(200).send('Remark added successfully.')
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Internal Server Error.' })
    }
}

module.exports.searchContact = async (req, res) => {
    const { name } = req.params.name;
    try {
        const contacts = await Contact.findAll({
            where: {
                name: name
            }
        })
        if (!contacts) {
            return res.status(404).Send('No contacts associated with this name.')
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Internal Server Error.' })
    }
}

module.exports.createContact = async(req,res)=>{
    try {
        const contact = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            phone: req.body.phone,
            convenientTime: req.body.convenientTime,
        })
        if (contact) {
            res.status(200).send(contact);
        } else
        res.status(404).send('error creating item');
    } catch (error) {
       res.status(500).send('Internal server error')
       console.log(error) 
    } 
}