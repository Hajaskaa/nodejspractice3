const { resolveSoa } = require('dns');
const fs =require('fs');
const path = require('path');

//const students = [];

module.exports = class Student {
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }

    save() {
        //students.push(this);
        const p = path.join(
            path.dirname(require.main.filename),'data','students.json');
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

    show() {
        //students.push(this);
        const p = path.join(
            path.dirname(require.main.filename),'data','students.json');
        fs.readFile(p, (err,fileContent) => {
            console.log('hehe');
            return fileContent;
        });
    }


}