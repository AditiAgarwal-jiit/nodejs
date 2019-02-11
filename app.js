//entry point of ypur application
//import express module in variable called express
var express = require('express');

//import the controller
var todoController = require('./controllers/todoController');
//so whatever is there in module.exports will be in this variable 'todoController' here, 
//which is just a function

//set up the express app by firing the express function
var app = express();

//set up the template/view engine as ajs
app.set('view engine','ejs');

//middleware to serve static files
//routes to all and any static file will be mapped to this folder
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port for incoming requests on this port
app.listen(3000);
console.log("Server is listeing to port 3000");
