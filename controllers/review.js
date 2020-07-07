var express = require('express');
var router = express.Router();

var reviewModel = require.main.require('./models/review-model');

router.get('/', function(req, res){

reviewModel.getAll(function(result){
    var data = {
      productlist: result
    };
    res.render('review/all', data);

    
  });

});

router.get('/5', function(req, res){

reviewModel.getAll5(function(result){
    var data = {
      productlist: result
    };
    res.render('review/5', data);

    
  });

});


router.get('/1', function(req, res){

reviewModel.getAll1(function(result){
    var data = {
      productlist: result
    };
    res.render('review/1', data);

    
  });

});



  









module.exports = router;