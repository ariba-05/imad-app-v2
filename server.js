var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool
var crypto=require('crypto');
var bodyParser=require('body-Parser');


var config = {
    user: 'oreanroy',
    database: 'oreanroy',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
    
};
var app = express();
app.use(morgan('combined'));

var articles ={
         'article-one':{
        title: 'Article one by orean',
        heading: 'Article one',
        date: 'feb 12 2017',
        content: `<p>
         This the first para to be witten in the html code of a first webpage towards the making of a website
         </p>
         <p>
         The second paragraph to make the code look fullfuling and a bit astheticaly look
         </p>
         <p>
         The third para and the last one look on more is coming
         </p>`},
         'article-two':{
             title: 'Article two',
             heading: 'Article two being made',
             date: 'feb 13 2017',
             content: `<p>
         This the first para to be witten in the html code of a first webpage towards the making of a website
         </p>
         <p>
         The second paragraph to make the code look fullfuling and a bit astheticaly look
         </p>
         <p>
         The third para and the last one look on more is coming
         </p>`},
         'article-three':{
             tiltle: 'Article three',
             heading: 'Article three',
             date: 'feb 13 2017',
             content: `<p>
         This the first para to be witten in the html code of a first webpage towards the making of a website
         </p>
         <p>
         The second paragraph to make the code look fullfuling and a bit astheticaly look
         </p>
         <p>
         The third para and the last one look on more is coming
         </p>`},
    };
    
    
    app.use(bodyParser.json());
    function createTemplate(data) {
        var title=data.title;
        var date=data.date;
        var heading=data.heading;
        var content=data.content;
    var htmlTemplate=`<html>
    <head>
        <title>
            ${title}
            </title>
            
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="/ui/style.css" rel="stylesheet" />
        
     </head>
     <body>
      <div class="con">
       <div>
         <a href="/">Home</a>
         </div>
         <hr/>
         <h3>
         ${heading}
         </h3>
         <div>
         ${date}
         </div>
         <div>
         ${content}
           </div>
          </div>
         </body>
 </html>`;
 return htmlTemplate;}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    //how do we create a hash?
    var hashed=crypto.pbkdf25Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt,hashed.toString('hex')].join('$');

//algorithm md5
}
app.get('/hash/:input', function(req,res){
    var hashedString= hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
    
});

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
   var salt=crypto.RandomBytes(128).toString('hex');
   var doString = hash(password,salt);
   pool.query('INSERT INTO "user"(username,password) VALUES($1,$2)',[username, dbString], function(err,result){
   
   if(err){
    res.status(500).send(err.toString());
    }
    else{
        res.send('user successfully created'+username);
        
    }
   }); 
});


app.post('/login',function(req,res){
    
    var username=req.body.username;
    var password=req.body.password;
   
   var doString = hash(password,salt);
   pool.query('SELECT * from "user" WHERE username=$1',[username], function(err,result){
   
   if(err){
    res.status(500).send(err.toString());
    }
    else{
        if(result.rows.length === 0){
            res.send(403).send('usernmae or password is invalid');
        }else{
        //match the pasword
        var dbstring=result.rows[0].password;
        var salt=dbString.split('$')[2];
        var hashedPassword=hash(password,salt);//creating a hash based on the password submited and the original salt
        if(hashedPassword==db.String){
        
        res.send('credentials are correct');
        }else{
          res.send(403).send('usernmae or password is invalid');   
        }
            
        }
    }
   }); 
});


var pool = new pool(config);
app.get('/test-db', function(req, res){
    //make a select request
    //return a response with results
    pool.query('SELECT * FROM test', function(err, result){
    if(err){
    res.status(500).send(err.toString());
    }
    else{
        res.send(JSON.Stringify(result.rows));
        
    }
    
    });
});

var counter=0;
app.get('/counter', function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function(req, res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
