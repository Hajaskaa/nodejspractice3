const path = require('path');
const fs = require('fs');
const express = require('express');

const Student = require('../models/student');


exports.getMain = (req,res,next)=>{
    console.log("1");
    res.sendFile(path.join(__dirname,'..','views','index.html'));
}

exports.getStudents = (req,res,next)=>{
    Student.show(students=>{
        res.send(students);
    });
    //.then((students)=>res.send(students));
}

exports.postStudents = (req,res,next)=>{
    Student.show(students=>{
        const student = new Student(students.length>0 ? students[students.length-1].id+1 : 0,req.body.name);
        student.save();
        res.redirect('/students');
    });
    //ha ide is berakom a Student.show-t megint egyel kesobbit ir ki
    //de ha redirectelem akkor jol irja ki. miert? mi az isten ez az egyel kesobbi kiiras tema?

}


exports.deleteStudents = (req,res,next)=>{
    Student.deleteById(req.body.id,students=>res.send(students));
}

exports.putStudents = (req,res,next)=>{
    Student.editById(req.body.id,req.body.name,students=>res.send(students));
}

//GET with params
exports.getStudentsById = (req,res,next)=>{
    Student.findById(req.params.id,students=>res.send(students[req.params.id].name));
}


