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








