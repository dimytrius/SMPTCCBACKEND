//Import express
var express = require('express');


//Import consign 
var consign = require('consign');


//Init the object express
var app = express();

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);








module.exports = app;