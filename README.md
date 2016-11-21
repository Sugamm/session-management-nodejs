# session-management-nodejs
In this i am going to explain how to handle Session in ExpressJS 4 and above. Express 3 deprecate many dependencies like ‘bodyParser‘ , ‘logger‘ etc. Our code is written by taking consideration of latest Express JS framework.

#Dependencies 
  express-session
  body-parser
  ejs
  
#Package.json
{
  "name": "login",
  "version": "1.0.0",
  "description": "A session based nodejs app ",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
        "body-parser": "^1.7.0",
        "ejs": "^1.0.0",
        "express": "^4.8.7",
        "express-session": "^1.7.6"
   },
  "author": "Sugam Malviya",
  "license": "ISC"
}

#Run
    npm install

#Server.js
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/views'));

app.use(session({secret: 'ssshhhhh',resave: true,saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;
app.get('/',function(req,res){
	sess = req.session;

	if (sess.email) {
		res.redirect('/admin');
	}else{
		res.render('index.html');
	}
});

app.post('/login',function(req,res){
	sess = req.session;
	sess.email = req.body.email;
	res.end('done');
});

app.get('/admin',function(req,res){
	sess = req.session;
	if (sess.email) {
		res.write('<html><body style="background-color:#3b5998;"><div style="background-color:#fff;text-align:center;box-shadow: 0px 0px 27px #000;padding:10px;margin:10% 32%;"><h1>Hello '+ sess.email +'</h1>');
		res.end('<a href="/logout">Logout</a></div></body></html>');
	}else{
		res.write('<h1>Please login first.</h1>');
		res.end('<a href="/logout">Logout </a>');
	}
});

app.get('/logout',function(req,res){
	req.session.destroy(function(err){
		if (err) {
			console.log(err);
		}else{
			res.redirect('/');
		}
	});
});

app.listen(3000,function(){
	console.log("listening in 3000 port");
});

#views/index.html


<!DOCTYPE html>
<html>
<head>
	<title>Nodejs Login - Sugam Malviya</title>
	<!-- All the files that are required -->
	<link href='style.css' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

	<script>
		$(document).ready(function(){
		    var email,pass;
		    $("#submit").click(function(){
		        email=$("#email").val();
		        pass=$("#password").val();
		        /*
		        * Perform some validation here.
		        */
		        $.post("http://localhost:3000/login",{email:email,pass:pass},function(data){        
		            if(data==='done')           
		            {
		                window.location.href="/admin";
		            }
		        });
		    });
		});
	</script>
</head>
<body style="text-align: center;">


<!-- Where all the magic happens -->
<!-- LOGIN FORM -->
<div class="text-center" style="padding:50px 0">
	<div class="logo">login</div>
	<!-- Main Form -->
	<div class="login-form-1">
			<div class="login-form-main-message"></div>
			<div class="main-login-form">
				<div class="login-group">
					<div class="form-group">
						<label for="email" class="sr-only">Username</label>
						<input type="text" class="form-control" id="email">
					</div>
					<div class="form-group">
						<label for="password" class="sr-only">Password</label>
						<input type="password" class="form-control" id="password">
					</div>
					
				</div>
				<button type="button" value="Submit" id="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
			</div>
	</div>
	<!-- end:Main Form -->
</div>

	<script src="script.js"></script>
</body>
</html>

Thankyou :)
