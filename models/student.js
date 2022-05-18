const { resolveSoa } = require('dns');
const fs =require('fs');
const path = require('path');

//const students = [];

const p = path.join(
    path.dirname(require.main.filename),'data','students.json');

/*const getStudentsFromFile = () => {
    let students = [];
    fs.readFile(p, (err, fileContent) => {
        if (!err) {
            students = JSON.parse(fileContent);
        }
    });
    console.log(typeof students);
    return students;

}*/

function getStudentsFromFile(cb) {//own callback pass for async
    fs.readFile(p, (err, fileContent) => {
        if (err) cb([]);
        else cb(JSON.parse(fileContent));
    });
}

module.exports = class Student {
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }

    save() {
        getStudentsFromFile(students =>{
            students.push(this);
            console.log('students:',students);
            fs.writeFile(p, JSON.stringify(students),err=>console.log('Error: ',err));
        })
    }

    static show(cb) {
        getStudentsFromFile(cb);
    }
    
    static findById (id,cb) {
        getStudentsFromFile(students=>{
            const found = students.some(s =>s.id === Number(id));
            if(found) cb(students);
        })

    }

    static editById(id,name,cb){ 
        getStudentsFromFile(students=>{
            const found = students.some(s =>s.id === Number(id));
            console.log(found);
            if(found){
                students[id].name = name; 
                fs.writeFile(p,JSON.stringify(students),(err)=>console.log('Error::',err));
                console.log('studentsASD:',students);
            }
            cb(students);
        })
        //this.findById(id,students=>fs.writeFile(p,JSON.stringify(),(err)=>console.log(err)));
        //fs.writeFile(p,JSON.stringify(),(err)=>console.log(err));
    }

    static deleteById(id,cb){
        getStudentsFromFile(students=>{
            const found = students.some(s =>s.id === Number(id));
            if(found){
                students.splice(id,1)
                fs.writeFile(p,JSON.stringify(students),(err)=>console.log('Error: ',err));
            }
            cb(students);
        })
    }
}