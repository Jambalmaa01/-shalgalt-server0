const express = require('express');
const router = express.Router();

const { createClass, getClass, deleteClass,editClass } = require('../controller/classController');

router.post('/createClass', createClass);
router.get('/createClass', getClass);
router.delete('/createClass/:id', deleteClass);
router.put('/createClass/:id', editClass);

module.exports = router;
