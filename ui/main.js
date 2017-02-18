//counter code
var button=document.getElementById('counter');
var counter=0;
button.onclick = function() {
//make a respose to counter 
var request=new XMLHttpRequest();
//capture the response store in a variable
request.onreadystatechange= function(){
 if(request.readyState===XMLHttpRequest.Done){
     //take some anction
     if(request.status===200){
         var counter=request.responeText;
         span.innerHTML=counter.toString();
    
//render the variable in correct span
counter=counter+1;
var span=document.getElementById('count');
span.innerHTML =counter.toString();
}
}
};
request.open('GET','http://oreanroy.imad.hasura-app.io/counter',true);
request.send(null);
};