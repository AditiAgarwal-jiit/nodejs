Building a To-do app using Express:

app.js =>

1. require express module
2. set up your express app
3. set your view engine
4. set up the middleware to serve static files
5. listen to a port for incoming requests

We are using MVC model here.
M (model) - data:todo list items
V (view) - ejs template files i.e. data we will share with the user (or send to the user)
           It may have data embedded into it which the user can see.eg. todo.ejs
C (controller) - bridge between model and view.It controls different sections of the application. For the todo section we
                 can have a todoController, so it will take the data from the model and pass it to the view and vice versa
                 So any kind of data manipulation can be done in the controller.

6. Create controllers folder.
7. Add a file => todoController.js

todoController.js =>

1. export (module.exports so that we can import it in app.js. So that we can pass app to the function and use app.get
           inside that function)
2. export what? export a function
3. what function? where all the request handlers are set up
   (Earlier we used to set up routes in app.js itself. So app.get could be used there w/o any problem.
    But now, we are setting up routes in a separate file so that file needs reference of 'app' to use app.get.
    That's why we will import this controller in app.js, fire the controller and pass the 'app' to the controller
    function.)
3a.) import todoController in app.js
3b.) fire the controller
3c.) pass the 'app' to it
4. now use app.get in the function to set up routes. 
5. set up routes and handlers for various requests like get,post and delete.
6. now render the views accordingly.
   (create views in 'views' folder eg. views/todo.ejs)
   (render using res.render('todo'); )
Run the app

******************************************************************************************************

Adding Dummy data:-

1. Create data in your controller

var data = [{task:"get grocery"},{task:"water plants"},{task:"pay bills"}];

2. Pass this data to the view (as the second argument to the render function)
   so that view can dynamically display the data

3. In the view, use ejs tags to embed code and data into your view
4. Traverse the array using a for loop and print each item

       <ul>
           <% for(var i=0; i< todos.length; i++){ %>
        <li>
            <%= todos[i].item %>
        </li>
        <% } %>
      </ul>

Run the app:

****************************************************

AJAX Requests to Delete and Add tasks:-

Add:

>public > assets > operations.js

1. fire a function when document is ready
2. fire another function when form is submitted (submit event occurs on form)
3. extract the form data
4. compose the object with that data (object will be added to the data array)
5. fire an ajax post request containing the data entered by user
6. that request will be handled by the /todo post request handler in the controller(at the backend)
7. handler will receive the data sent by the client (through ajax request)
8. add the body-parser so that we can access the data sent to server by the post request
   a. require body-parser
   b. set up the body-parser in your applcation (this will obtain the request data)
      var urlencodedParser = bodyparser.urlencoded({extended:false});
   c. add this middleware in the request handler so that we can access the data sent to us
      app.post('/todo',urlencodedParser, function(req,res){

            //data obtained is available in req.body
    });
9. push the obtained data into the array
10. send the updated data array back to the client(ajax request's success function) using res.json
11. success method of ajax request will reload the page and print the updated array

Run the application

***************************************************

Delete:

1. fire a function on 'li' click
2. extract the data,i.e. whatever task (li) is clicked, save it into a variable.
   just replace spaces with hyphens(-) before saving the text into the variable.
3. fire a delete ajax reques which will fire the delete handler in the controller
4. give the url as '/todo/' + task (the task to be deleted)- so this is the url we want to delete
5. now just apply the JS 'filter' function on the data array and filter out the object from the array
   that does not match the object that has come along with request as parameter (i.e. the object requested for delete)
   data = data.filter((obj)=> {return obj.task.replace(/ /g,'-') !== req.params.task} );
6. send the data back using res.json() and reload the page.

Run the application.  

************************************************************************


MongoDB

[1. Create db.
 2. Connect to the db.
 3. Create Schema.
 4. Create model.
 5. Pass data to model and save to db.]


  var mongoose = require('mongoose');
  mongoose.connect('mongodb://test:test123@ds223015.mlab.com:23015/tododb');
  var todoSchema = new mongoose.Schema({
    task: String
   });
  var Todo = mongoose.model('Todo', todoSchema);
  var task1 = Todo({task: 'water plants'})
    .save(function(err){
              if (err) throw err;
              console.log("saved successfully");
             });


EXPLAINED:


Create and Connect to db:-

1. install mongoose (used to connect and interact with your database, here mongodb)
2. require mongoose in controller
3. create a database to interact with (here we are using mLab, cloud-based storage)
   a. Go to mlab.com
   b.register and login
   c. Create New
   d. select cloud as AWS, region as Europe (as of now, only two regions are available US east and Europe)
   e. Give a name(ed. tododb). Submit.
   f. Open the db.It is empty now.No documents inside it.
      (Note: "documents" refres to the objects that you save inside your db. Collection of these
       these documents is called a "collection". Collections is analogous to Tables in sql db.
       And documents are analogous to records.)
   g. Add a user so that we have a db username and pwd for accessing the database.
   h. Go to Users Tab > Add database user > Provide any name and pwd (eg. test, test123)
   i. Do not make read only. Click Create.
   j. To connect the user to the database, copy the mongodb standard uri.
      mongodb://<dbuser>:<dbpassword>@ds223015.mlab.com:23015/tododb
4. In controller, use mongooose.connect() to connect to the dband paste this uri.
5. Give username and pwd.

ADDING DATA:

Create Schema:-

schema is a blueprint of your db so that mongodb knows what to expect,i.e. strcture of the data

1. Create a schema. 
2. Use mongooose.Schema() to crte schema and store it in a variable.
   var todoSchema = new mongoose.Schema({});
3. The method takes an object as an argument in which we will declare what our todo items/tasks will look like.
4. All the todo items are going to have the property name "task" and the value is going to be a String.
   So the objects will look like this ->  {task: String}
   var todoSchema = new mongoose.Schema({task:String});
  (note: this object should resemble the objects of our data array.Because that is what our data will acually be.)
   

Create model:-

model is basically an implementation of your schema

1. Create a model.
2. Use mongoose.model('<name-of-the-model>',<name-of-the-schema>) to create model.
   Provide the model name and the name of the schema on which the model will be based,i.e. the structure
   which the model is going to implement/follow.
   var Todo = mongoose.model('Todo', todoSchema)
   (model should be named in capital)


Create new todo items and push/save them to the database:-

1. var task1 = Todo();
   in Todo() we are going to pass in the object that we want to provide/add which is based on the schema we have ceated.
   So,
   var task1 = Todo({task: 'water plants'});
  
   (Note: We can see that our schema as has just one property i.e. task which is a String.
          So, we need to pass in an object with task as a property and a corresponding string value.
          The structure of our data should exactly match/follow the structure described in the schema.)

   Todo({task: 'water plants'}); -> Now this returns us an object(which we have stored in variable task1) which has a
   save method on it.So we can call the save method on the returned object and save this data to the db.
   So,
   we can say
   task1.save();   -> to save the data to db.
   var dbData = task1.save();
   OR,
   you can directly write,
   var task1 = Todo({task: 'water plants'}).save();

   The save method takes a callback function as an argument.The callback function runs after the save operation 
   takes place,i.e. after the save method runs.The method throws error if error occurs while saving or 
   prints to console if saved successfully. (you can make the method do anything other than this.)

 
  var task1 = Todo({task: 'water plants'})
              .save(function(err){
                         if (err) throw err;
                         console.log("saved successfully");
              });



**********************************************************************************

Updating request handlers(get,post,delete) to work with db and not dummy data:

Now we do not need a new item/task being created and added to the db everytime the application starts.
So we will remove this part:

var task1 = Todo({task: 'water plants'}).save(function(err){
    if (err) throw err;
    console.log("saved successfully");
});

We will keep the schema and the model as it is because we will need it.

A. GET REQUEST:

Get data from Mongodb and pass it to the view. (instead of dummy data i.e. data array)

1. First specify which model (or collection) you want to get the data from.
2. We want it from Todo model in this case. So on the model run the find() method.
   Todo.find()
   find() can go to a collection and find either all of the items in that collection or a particular item(s).

   To fetch all the items, pass a blank object as an argument to find() => Todo.find({})
   To fetch a particular item, specify that item in the object => find({task: 'water plants'})

   Second argument to find() is a callback function that takes up twp parameters-> error and data retrieved.
   if error,throw error else pass the data to the view.
   
   ____________________________________________________________________________

B. POST REQUEST:

Get data from the view and add it to mongodb

Data will be added in the same way as we were earlier adding an item to the db.
The only difference is, this time data to be added will not be hardcoded but will come from req.body

 var newTodo = Todo(req.body).save(function(err,data)
        {
            if(err) throw err;
            res.json(data);
        });

   ________________________________________________________________________________

C. DELETE REQUEST:

Delete the requested item from mongodb

1. First find the requested item(object sent with the request as parameter) from the collection.
   Todo.find({task: req.params.task.replace(/\-/g," "));
   
































