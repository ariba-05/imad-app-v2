//counter code
var button=document.getElementById('counter');

button.onclick = function() {
//make a respose to counter 
var request=new XMLHttpRequest();
//capture the response store in a variable
request.onreadystatechange= function(){
   if(request.readyState === XMLHttpRequest.DONE){
     //take some anction
     if(request.status===200){
         var counter=request.responeText;
         
    


var span=document.getElementById('count');
span.innerHTML = counter.toString();
}
}
};
request.open('GET','http://oreanroy.imad.hasura-app.io/counter',true);
request.send(null);
};

var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onclick = function()
{
    var names=['name1','name2','nmae3'];
    var list='';
    for(var i=0;i<names.length;i++){
        list+= '<li>'+names[i]+'</li>';
    }var ul=document.getElementById('name list');
    ul.innerHtml= list;
};