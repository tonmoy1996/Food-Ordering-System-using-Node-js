var express = require('express');
var router = express.Router();

var homeModel = require.main.require('./models/home-model');

router.get('/', function(req, res){
	if(!req.session.username)
	{
		res.redirect('/login');
		return;
	}


res.render('home/index');
});




module.exports = router;