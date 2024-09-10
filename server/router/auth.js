const express = require('express');
const router = express.Router();
const { signup, SignIn, register, login, verify, invite } = require('../controller/authCOntroller'); 


// router.post("/signup", signup).get(singupGet); 
router.route('/signup').post(register)
router.route('/signin').post(SignIn)
router.route('/verify').post(verify)
router.route('/invite').post(invite)
module.exports = router;
