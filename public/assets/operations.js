//when the document is ready, fire a function
$(document).ready(function(){
     
    
    //when submit event occurs on a the form,fire this function
    $('form').on('submit',function(){

        //input field of the form is stored in variable task
        var task = $('form input');
        //the value/text in input field is stored in variable todoObj
        //whatever will be input in the box will be converted to this object and added to the data array
        var todoObj = {task: task.val()};

        //make an ajax request to the server
        //todo POST request handler will be fired when when this request is made
        //and this request will be made when form is submitted and form data 
        //has been extracted into variables
        //Here, we will specify the type of request,url,pass the data along with the req in the body
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todoObj,
            success: function(data){
               //do something with the updated data via front-end framework
               //reload the page after submit is done and data is updated at the backend
               location.reload();
            }
        });
        return false;
    });
   

    $('li').on('click',function(){
        console.log("li clicked");
        //extract item to be deleted in a variable and replace spaces with hyphens

        //taskTrim = $(this).text().trim();
        //var task = taskTrim.replace(/ /g,"-");
        var task = $(this).text().replace(/ /g,"-");
        console.log(task);

        //fire delete request
        $.ajax({
            type: 'DELETE',
            url: '/todo/'+task,   //this is the url we are deleting.So in the controller, this 'task' parameter 
                                    //will be added to the request handler url
            success: function(data){
                location.reload();
            }                        

        });
    })
});

