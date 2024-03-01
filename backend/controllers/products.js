const Product = require('../models/Product');
const sequelize = require('sequelize')

module.exports.postAddProduct = async (req, res) => {
    try {
        const product = await Product.create({
            category: req.body.category,
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description
        })
        if (product) {
            res.status(200).send(product);
        } else
            res.status(404).send('error creating product');
    } catch (error) {
        res.status(500).send('Internal server error')
    }
}

module.exports.getCameras = async (req, res) => {
    try {
        const cameras = await Product.findAll({ where: { category: req.params.category } });
        if (cameras) {
            res.status(200).send(cameras);
        } else
            res.status(404).send('Products not found');
    } catch (error) {
        res.status(500).send('Internal server error')
    }
}

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category'],'imageUrl',]});
        if (products) {
            res.status(200).send(products)
        } else {
            res.status(404).send('Products not found');
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        let product;
        product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).send('No such product exist.')
        } else {
            const modelFields = Object.keys(Product.rawAttributes)  //to get all the fields described in a model.
            for (const field of modelFields) {
                if (req.body[field] !== undefined) {
                    product[field] = req.body[field];
                }
            }
            // product = await Product.update(updatedFields, { where: { id: req.params.id }, returning: true, plain: true })
            await product.save()
            if (product) {
                res.status(200).send(product);
            }
        }
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Internal Server Error' });
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        let product;
        console.log(req.params.id)
        product = await Product.findByPk(Number.parseInt(req.params.id));
        if (!product) {
            return res.status(404).send('No such product exist.')
        } else {
            product = await Product.destroy({where: {id: req.params.id}});
            res.sendStatus(200);// (product);
        }
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Internal Server Error' });
    }
}