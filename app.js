const path = require('path');
const express = require('express');
//const bodyParser = require('body-parser');
const mainRoutes = require('./routes/index');
const sideRoutes = require('./routes/side');
const errorController = require('./controllers/error');
const studentController = require('./controllers/students');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


app.use(sideRoutes);
app.use(mainRoutes);

app.use(errorController.get404);

app.listen(3000);