var express = require('express');
var router = express.Router();

var orderModel = require.main.require('./models/order-model');

router.get('/current', function(req, res){

orderModel.getAll(function(result){
    var data = {
      productlist: result
    };
    res.render('order/current', data);

    
  });

});



router.get('/regorder', function(req, res){

  orderModel.getRegister(function(result){
  	 var data = {
      productlist: result
    };
		
		 res.render('order/notification', data);
	});
   

    
  });


router.get('/pending', function(req, res){

  orderModel.getp(function(result){
  	 var data = {
      productlist: result
    };
		
		 res.render('order/pending', data);
	});
   

    
  });



router.get('/completed', function(req, res){

  orderModel.getc(function(result){
  	 var data = {
      productlist: result
    };
		
		 res.render('order/complete', data);
	});
   

    
  });


router.get('/delivery/:id/:st', function(req, res){
   status2= req.params.st;
    console.log(status2);
    console.log(req.params.id);
	

var cat = {

	 id: req.params.id,
	 status: req.params.st

	};

	orderModel.update(cat, function(obj){
		res.redirect('/order/current');
	});



});


router.get('/delete/:id', function(req, res){
 
	


	 id= req.params.id,
	


	orderModel.delete(id, function(obj){
		res.redirect('/order/regorder');
	});



});


module.exports = router;