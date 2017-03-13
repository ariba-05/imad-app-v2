
var submit=document.getElementById('submit_btn');
submit.onclick = function()
{//create reequest
    var request=new XMLHttpRequest();
    //capture response and store in a variable
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
     {//take some action
     if(request.status===200){
    alert('Logged in successfully');     
     }else if(request.status===403){
     alert('Username/password is incorrect');
    }
    else if(request,status===500){
        alert('Something went wrong');
    }}};
    
    
    var usernames=document.getElementByID('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://oreanroy.imad.hasura-app.io/login',true);
    request.send(JSON.stringify({username: username,password: password}));
};