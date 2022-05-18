const path = require('path');
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');


router.get('/', studentsController.getMain);

router.get('/students', studentsController.getStudents);

router.post('/students',studentsController.postStudents);

router.put('/students',studentsController.putStudents);

router.delete('/students',studentsController.deleteStudents);

router.get('/students/:id',studentsController.getStudentsById);

module.exports = router;

