//counter code
var button=document.getElementByid('counter');
button.onclick = function() {
//make a respose to counter 
//capture the response store in a variable
//render the variable in correct span
counter=counter+1;
var span=document.getElementByid('count');
span.innerHTML =counter.toString();
};