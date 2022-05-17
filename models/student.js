const { resolveSoa } = require('dns');
const fs =require('fs');
const path = require('path');

//const students = [];

const p = path.join(
    path.dirname(require.main.filename),'data','students.json');

const getStudentsFromFile = () => {
    //students.push(this);
    fs.readFile(p, (err,fileContent) => {
        let students = [];
        if (!err) {
            //console.log(fileContent);
            students = JSON.parse(fileContent);
        }
        //console.log(JSON.stringify(students));
        console.log(students[1]);
        return students;
    });
}

module.exports = class Student {
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }

    save() {
        //students.push(this);
        
        fs.readFile(p, (err,fileContent) => {
            let students = [];
            if (!err) {
                //console.log(fileContent);
                students = JSON.parse(fileContent);
            }
            students.push(this);
            fs.writeFile(p, JSON.stringify(students),(err)=>{
               // console.log(err);
            })
        });
    }

    static show(){
        const arr = getStudentsFromFile();
        console.log('arr: ',arr);
        return getStudentsFromFile();
    }
    
    static findById(id){
    const students = getStudentsFromFile();
    console.log(students);
    const found = students.some(s =>s.id === Number(id));
        if(found){
            console.log(students[id].name);
            return students[id].name;
        }
    }

    static editById(id,name){ 
        console.log('asd');
        const students = getStudentsFromFile();
        students.findById(id) = name;
        fs.writeFile(p,JSON.stringify(students),(err)=>console.log(err));
    }
}