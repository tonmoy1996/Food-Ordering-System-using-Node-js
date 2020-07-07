var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var multer = require('multer');

var userModel = require.main.require('./models/user-model');
var valudationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator');

// Set The Storage Engine
var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');




function checkFileType(file, cb){
  // Allowed ext
  var filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
 //var mimetype = filetypes.test(file.mimetype);

  if(extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}



//middleware
app.use(express.static(path.join(__dirname,'public')));



router.get('/', function(req, res){

userModel.getAll(function(result){
		var data = {
			productlist: result
		};
		res.render('user/list', data);
	});


});


router.get('/add', function(req, res){

	res.render('user/add', {errs: []});
});


router.post('/add', (req, res) => {


   
      var data = {
       
        name: req.body.name,
        username: req.body.uname,
        password: req.body.pass

      };


   var rules = valudationRules.user.create;


  var validator = new asyncValidator(rules);

  validator.validate(data, function(errors, fields){

    if(!errors)
    {
    
    upload(req, res, (err) => {
    if(err){
      res.render('user/add');
    } else {
      if(req.file == undefined){
        res.render('user/add');
      } else {
        
     
  
      var cat = {
       
        namee: req.body.name,
        uname: req.body.uname,
        pass: req.body.pass,
        file:  req.file.filename

      };

          userModel.insert(cat, function(obj){

                res.redirect('/user');

          });


    

      }

   
    }
  });

    }
    else
    {
      console.log(fields);
      res.render('user/add', {errs: errors});
    }
  });






});



router.get('/edit', function(req, res){


userModel.getAll(function(result){
    var data = {
      productlist: result
    };
    res.render('user/edit', data);

    console.log(data);
  });


});


router.get('/edit/:id', function(req, res){
  

   var id = req.params.id;
     console.log(id);
  userModel.get(id, function(cat){
    console.log(cat);
    res.render('user/edit2',cat);
  });


  
});


router.post('/edit/:id', function(req, res){
  
  var cat = {
    id: req.body.pid,
    name: req.body.name,
    uname: req.body.uname,
    pass: req.body.pass

  };

  userModel.update(cat, function(obj){

    res.redirect('./');

    console.log("successfully Updated");
  });
});





module.exports = router;