const path = require('path');
const express = require('express');
//const bodyParser = require('body-parser');
const mainRoutes = require('./routes/index');
const sideRoutes = require('./routes/side');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


app.use(sideRoutes);
app.use(mainRoutes);

app.listen(3000);