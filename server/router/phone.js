const express = require('express'); 
const router = express.Router(); 

const { createPhone, getPhone, deletePhone, editPhone } = require('../controller/phoneController');

router.route('/Phone').post(createPhone).get(getPhone); 
router.route('/Phone/:id').delete(deletePhone).put(editPhone)
module.exports = router;
