var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var valudationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator');

router.get('/', function(req, res){
	res.render('login/index',{errs: []});

});

router.get('/logout', function(req, res){
	res.render('login/index');

});

router.post('/', function(req, res){



	var un = req.body.username;
	var ps = req.body.password;
//
var rules = valudationRules.user.login;

	var data = {
		username: req.body.username,
		password: req.body.password
	};

	var validator = new asyncValidator(rules);

	validator.validate(data, (errors, fields)=>{
		if(!errors)
		{
		
		userModel.validateUser(un, ps, function(valid){
		if(valid)
		{
			req.session.username = un;
			res.redirect('/admin');
		}
		else
		{
			res.send('Invalid username or password');
		}
	});


		}
		else
		{
			console.log(fields);
			res.render('login/index', {errs: errors});
		}
	});


	//

	

});

module.exports = router;