//control the behaviour of todo list, manipulate the data, handle the routes, passin g data to the view
//export it so that it can be imported in app.js
// set up request habndlers in this function

//todo app with database- request handlers working with database

//adding the body-parser
var bodyParser = require('body-parser');

//adding mongoose
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test123@ds223015.mlab.com:23015/tododb');

//create a schema
var todoSchema = new mongoose.Schema({
    task: String
});

//create a model
// Todo on RHS is model name which is going to be stored as a collection on mongodb
//Todo on LHS is just a variable in nodejs which is holding the reference to our model/collection on the db
var Todo = mongoose.model('Todo', todoSchema);

//set up the body-parser
//obtains the request data
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get('/todo',function(req,res){
       //res.render('todo',{todos: data});     //passing data to the view
       //get data from mongdb and pass it to the view
       Todo.find({},function(err,data){
           if (err) throw err;
           res.render('todo',  {todos: data})   //this data is the data fetched from the db 
       });

    });

    //when a user wants to add an item to a list
    //by filling out a small form and clicking on submit
    //The data by sent ajax post request will be received here and added to the array
    //The obtained data is available in req.body
    //Then save that data/object into the db collection
    app.post('/todo',urlencodedParser,function(req,res){
        //get data from te view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data)
        {
            if(err) throw err;
            res.json(data);
        });
        //   data.push(req.body);
        //   res.json(data);          
    });
    
    
   //delete the requested item from mongodb
    app.delete('/todo/:task',function(req,res){  //with this parameter, it can access which task on the url we tried to delete
                                                 //because it sent along with the request
     Todo.find({task: req.params.task.replace(/\-/g," ")}).remove(function(err,data){
         if(err) throw err;
         res.json(data);
     });
     //data = data.filter((obj)=> {return obj.task.replace(/ /g,'-') !== req.params.task;
    });
    //console.log(data);
     //res.json(data);
 
}

// *************************************************************************************************


// //connecting to db and saving to db- request handlers working with dummy data

// //adding the body-parser
// var bodyParser = require('body-parser');

// //adding mongoose
// var mongoose = require('mongoose');

// //connect to the database
// mongoose.connect('mongodb://test:test123@ds223015.mlab.com:23015/tododb');

// //create a schema
// var todoSchema = new mongoose.Schema({
//     task: String
// });

// //create a model
// // Todo on RHS is model name which is going to be stored as a collection on mongodb
// //Todo on LHS is just a variable in nodejs which is holding the reference to our model/collection on the db
// var Todo = mongoose.model('Todo', todoSchema);
// var task1 = Todo({task: 'water plants'}).save(function(err){
//     if (err) throw err;
//     console.log("saved successfully");
// });

// //dummy data
// var data = [{task:"get grocery"},{task:"water plants"},{task:"pay bills"}];

// //set up the body-parser
// //obtains the request data
// var urlencodedParser = bodyParser.urlencoded({extended:false});

// module.exports = function(app){

//     app.get('/todo',function(req,res){
//        res.render('todo',{todos: data});     //passing data to the view
//     });

//     //when a user wants to add an item to a list
//     //by filling out a small form and clicking on submit
//     //The data by sent ajax post request will be received here and added to the array
//     //The obtained data is available in req.body
//     //Then push that data/object into the array
//     app.post('/todo',urlencodedParser,function(req,res){
//           //console.log("in post handler",req.body);
//           data.push(req.body);

//           //we can send this data back to the front end
//           //updated data will be received in the success function of ajax request
//           res.json(data);
            
//     });
    
//     //delete items
//     app.delete('/todo/:task',function(req,res){  //with this parameter, it can access which task on the url we tried to delete
//                                                  //because it sent along with the request
//      console.log("in delete");
//      data = data.filter((obj)=> {return obj.task.replace(/ /g,'-') !== req.params.task;
//     });
//     console.log(data);
//      res.json(data);
//     });
// }


// ************************************************************************************************

// //todo app without database

// //working with dummy data instead of database.To run your app without database just using dummy data
// //uncomment this section and comment the above section

// //adding the body-parser
// var bodyParser = require('body-parser');

// //dummy data
// var data = [{task:"get grocery"},{task:"water plants"},{task:"pay bills"}];

// //set up the body-parser
// //ov=btains the request data
// var urlencodedParser = bodyParser.urlencoded({extended:false});

// module.exports = function(app){

//     app.get('/todo',function(req,res){
//        res.render('todo',{todos: data});     //passing data to the view
//     });

//     //when a user wants to add an item to a list
//     //by filling out a small form and clicking on submit
//     //The data by sent ajax post request will be received here and added to the array
//     //The obtained data is available in req.body
//     //Then push that data/object into the array
//     app.post('/todo',urlencodedParser,function(req,res){
//           //console.log("in post handler",req.body);
//           data.push(req.body);

//           //we can send this data back to the front end
//           //updated data will be received in the success function of ajax request
//           res.json(data);
            
//     });
    
//     //delete items
//     app.delete('/todo/:task',function(req,res){  //with this parameter, it can access which task on the url we tried to delete
//                                                  //because it sent along with the request
//      console.log("in delete");
//      data = data.filter((obj)=> {return obj.task.replace(/ /g,'-') !== req.params.task;
//     });
//     console.log(data);
//      res.json(data);
//     });
// }