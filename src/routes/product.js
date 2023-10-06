const express = require("express");
const router = express.Router();
const tokenMiddleware = require('../middlewares/auth')

const productController = require('../controllers/ProductController');

// router.post('/create', productController.create)
// router.post('/update', productController.update)
// router.get('/:id/edit', productController.edit)
// router.post('/delete', productController.delete)

module.exports = router;