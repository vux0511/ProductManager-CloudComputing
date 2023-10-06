const express = require('express');
const Product = require('../models/Product')
const productController = require('../controllers/ProductController');

const productRouter = require('./product')

const router = express.Router();

router.post('/create', productController.create)
router.post('/update', productController.update)
router.get('/:id/edit', productController.edit)
router.post('/delete', productController.delete)
router.get('/', productController.index)
router.get('/search', productController.search)


module.exports = router;