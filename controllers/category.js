var express = require('express');
var router = express.Router();
var categoryModel = require.main.require('./models/category-model');



router.get('/', function(req, res){
	categoryModel.getAll(function(result){
		var data = {
			catList: result
		};
		res.render('category/list', data);
	});
});

router.get('/create', function(req, res){
	res.render('category/create');
});

router.post('/create', function(req, res){

	categoryModel.insert(req.body.catname, req.body.desc, function(obj){
		res.redirect('/categories');
	});
});

router.get('/edit/:id', function(req, res){
	var id = req.params.id;
	categoryModel.get(id, function(cat){
		console.log(cat);
		res.render('category/edit', cat);
	});
});

router.post('/edit/:id', function(req, res){
	
	var cat = {
		id: req.body.catid,
		name: req.body.catname,
		desc: req.body.desc
	};

	categoryModel.update(cat, function(obj){
		res.redirect('/categories');
	});
});

router.get('/delete/:id', function(req, res){
	var id = req.params.id;
	categoryModel.get(id, function(cat){
		console.log(cat);
		res.render('category/delete', cat);
	});
});

router.post('/delete/:id', function(req, res){
	

		var id= req.body.catid;
	
	

	categoryModel.delete(id, function(obj){
		res.redirect('/categories');
	});
});


router.get('/search', function(req, res){
	
	res.render('category/search');
	
});




router.post('/search', function(req, res){
	

	var sh=req.body.query;
    //res.send(sh);

    categoryModel.search(sh, function(cat){

		console.log(cat);
		//res.render('category/edit', cat);

		res.send(cat.id);
	});



	
});
module.exports = router;
