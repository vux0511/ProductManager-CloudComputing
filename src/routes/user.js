const express = require("express");
const router = express.Router();
const tokenMiddleware = require('../middlewares/auth')

const userController = require('../controllers/UserController');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getInfo', tokenMiddleware.auth, userController.getInfo)

module.exports = router;