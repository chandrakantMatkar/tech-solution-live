const express = require('express');
const productHandler = require('../controllers/products');
const fetchUser = require('../middleware/fetchuser');

const router = express.Router();


router.get('/:category', productHandler.getCameras)

router.put('/:id',fetchUser,productHandler.editProduct)

router.post('/',fetchUser,productHandler.postAddProduct)

router.delete('/:id',fetchUser, productHandler.deleteProduct)

router.get('/',productHandler.getAllProducts)

module.exports = router;