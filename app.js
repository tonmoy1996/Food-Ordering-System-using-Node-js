// DECLARATION
var express = require('express');
var app = express();
var port = 1337;
var path = require('path');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var login = require('./controllers/login');
var logout = require('./controllers/logout');
var home = require('./controllers/home');
var category = require('./controllers/category');
var product = require('./controllers/product');
var admin = require('./controllers/admin');
var user = require('./controllers/user');
var index = require('./controllers/index');
var order = require('./controllers/order');
var review = require('./controllers/review');

// CONFIGURE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'alibaba', resave: false, saveUninitialized: true}));

app.use(express.static(path.join(__dirname,'public')));

/*
app.use('*', function(req, res, next){
	
	// i was using the wrong property
	// is will be req.originalUrl, not req.path

	if(req.originalUrl == '/login' || req.originalUrl == '/logout' || req.originalUrl =='/' || req.originalUrl =='/product' || req.originalUrl =='/product/details/:id')
	{
		next();
	}
	else
	{
		if(!req.session.username)
		{
			res.redirect('/login');
			return;
		}
		next();
	}
});
*/

// ROUTES
app.use('/login', login);
app.use('/logout', logout);
app.use('/',index);
app.use('/home', home);
app.use('/product', product);
app.use('/categories', category);
app.use('/admin', admin);
app.use('/user', user);
app.use('/order', order);
app.use('/review', review);




// SERVER START
app.listen(port, function(){
	console.log(`Server started at port ${port}`);
});