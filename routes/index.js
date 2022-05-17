const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

const Student = require('../models/student');
const studentsJSON = require('../data/students.json');


router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'));
})

router.get('/students',(req,res,next)=>{
    const p = path.join(
        path.dirname(require.main.filename),'data','students.json');
    fs.readFile(p, (err,fileContent) => {
        let students = [];
        if (!err) {
            //console.log(fileContent);
            students = JSON.parse(fileContent);
        }
        console.log(JSON.stringify(students));
        return res.send(students)
    })
})

router.post('/students',(req,res,next)=>{
    console.log(req.body);
    const student = new Student(studentsJSON.length>0 ? studentsJSON[studentsJSON.length-1].id+1 : 0,req.body.name);
    student.save();
    return res.send(studentsJSON);
})

router.get('/students/:id',(req,res,next)=>{
    const id = req.params.id;

    const found = studentsJSON.some(s =>s.id === Number(id));
    if(found){
        console.log(studentsJSON[id].name);
        return res.send(studentsJSON[id].name);
    }
    res.redirect('/students');
})

router.delete('/students',(req,res,next)=>{
    const id = req.body.id;
    const p = path.join(path.dirname(require.main.filename),'data','students.json');

    const found = studentsJSON.some(s =>s.id === Number(id));
    if(found){
        studentsJSON.splice(id,1)
        fs.writeFile(p,JSON.stringify(studentsJSON),(err)=>console.log(err));
    }
    return res.send(studentsJSON);
})

router.put('/students',(req,res,next)=>{
    const id = req.body.id;
    const p = path.join(path.dirname(require.main.filename),'data','students.json');

    const found = studentsJSON.some(s =>s.id === Number(id));
    if(found){
        studentsJSON[id].name = req.body.name;
        fs.writeFile(p,JSON.stringify(studentsJSON),(err)=>console.log(err));
    }
    return res.send(studentsJSON);
})

module.exports = router;

