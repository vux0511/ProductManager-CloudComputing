const express = require("express");
const router = express.Router();
const tokenMiddleware = require('../middlewares/auth')

router.get('/', tokenMiddleware.auth ,(req, res) => {
  res.render('index.ejs');
})

router.get('/login', (req, res) => {
  res.render('login.ejs');
})

router.get('/register', (req, res) => {
  res.render('register.ejs');
})

module.exports = router;