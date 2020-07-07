var express = require('express');
var router = express.Router();

var homeModel = require.main.require('./models/home-model');

router.get('/', function(req, res){


res.render('admin/index');

});






module.exports = router;