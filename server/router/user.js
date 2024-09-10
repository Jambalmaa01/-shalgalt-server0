const express = require('express');
const router = express.Router();
const { login } = require('../controller/userController');

router.route('/login').post(login);

module.exports = router;

