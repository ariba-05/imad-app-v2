//counter code
var button=document.getElementById('counter');
button.onclick = function() {
//make a respose to counter 
//capture the response store in a variable
//render the variable in correct span
counter=counter+1;
var span=document.getElementById('count');
span.innerHTML =counter.toString();
};