//Import express
var express = require('express');


//Import consign 
var consign = require('consign');


//Init the object express
var app = express();

consign()
    .include('../routes')
    .then('../models')
    .then('../controllers')
    .into(app);








module.exports = app;