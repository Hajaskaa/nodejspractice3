const path = require('path');
const fs = require('fs');
const express = require('express');

const Student = require('../models/student');


exports.getMain = (req,res,next)=>{
    console.log("1");
    res.sendFile(path.join(__dirname,'..','views','index.html'));
}

exports.getStudents = (req,res,next)=>{
    console.log("2");
    let asd = Student.show();
    console.log('asd:',asd);
    res.send(asd);
}

exports.postStudents = (req,res,next)=>{
    console.log("3");
    const student = new Student(studentsJSON.length>0 ? studentsJSON[studentsJSON.length-1].id+1 : 0,req.body.name);
    student.save();
    return res.send(studentsJSON);
}


exports.deleteStudents = (req,res,next)=>{
    console.log("4");
    const id = req.body.id;
    const p = path.join(path.dirname(require.main.filename),'data','students.json');

    const found = studentsJSON.some(s =>s.id === Number(id));
    if(found){
        studentsJSON.splice(id,1)
        fs.writeFile(p,JSON.stringify(studentsJSON),(err)=>console.log(err));
    }
    return res.send(studentsJSON);
}

exports.putStudents = (req,res,next)=>{
    console.log("5");
    console.log(req.body);
    Student.editById(req.body.id,req.body.name);
    res.send(Student.show());
}

exports.getStudentById = (req,res,next)=>{
    console.log("6");
    res.send(Student.findById(req.params.id));
}


