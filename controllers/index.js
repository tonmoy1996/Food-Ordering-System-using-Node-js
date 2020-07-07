var express = require('express');
var router = express.Router();

var homeModel = require.main.require('./models/home-model');

router.get('/', function(req, res){

res.render('home/index');

});

router.post('/', function(req, res){


homeModel.insert(req.body.star, req.body.email, function(obj){
		res.redirect('/');
	});



});


module.exports = router;