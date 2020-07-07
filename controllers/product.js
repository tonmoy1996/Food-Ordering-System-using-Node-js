var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var multer = require('multer');
var cart =[];
var cartid=0
var productModel = require.main.require('./models/product-model');


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

productModel.getAll(function(result){
		var data = {
			productlist: result
		};
		res.render('product/index', data);
	});

	//res.render('product/index',data);

});


router.get('/add', function(req, res){

	res.render('product/add');
});


router.post('/add', (req, res) => {


  upload(req, res, (err) => {
    if(err){
      res.render('product/add', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('product/add', {
          msg: 'Error: No File Selected!'
        });
      } else {
      	
      var cat = {
       
        namee: req.body.pname,
        price: req.body.pprice,
        comment: req.body.comment,
        file:   req.file.filename

      };

        	productModel.insert(cat, function(obj){
        		    res.render('product/add', {
                msg: 'File Uploaded!',
                file: `uploads/${req.file.filename}`

        });

        	});

      }
   
    }
  });


});

router.get('/delete', function(req, res){


productModel.getAll(function(result){
    var data = {
      productlist: result
    };
    res.render('product/delete', data);

  });


});


router.get('/delete/:id', function(req, res){
  
  var id= req.params.id;
  

  productModel.delete(id, function(obj){
    res.redirect('/product/delete');
  });
});


router.get('/edit', function(req, res){


productModel.getAll(function(result){
    var data = {
      productlist: result
    };
    res.render('product/edit', data);

  });


});


router.get('/edit/:id', function(req, res){
  

   var id = req.params.id;
     console.log(id);
  productModel.get(id, function(cat){
    console.log(cat);
    res.render('product/edit2',cat);
  });


  
});


router.post('/edit/:id', function(req, res){
  
  var cat = {
    id: req.body.pid,
    name: req.body.pname,
    price: req.body.pprice,
    desc: req.body.desc,
    path: req.body.path

  };

  productModel.update(cat, function(obj){

    res.redirect('./');

    console.log("successfully Updated");
  });
});




router.get('/details/:id', function(req, res){
   var id = req.params.id;

  productModel.get(id, function(cat){

    res.render('./product/details',cat);
  });


  
});


router.post('/cartadd', function(req, res){ 
if(!req.session.Cart)
    {
        var cart =[];
    }
    else
    {
  var cart = req.session.Cart;
    }

  var Item=function(id,name,price,qty)
  {
    this.id=id;
    this.name=name;
    this.price=price;
    this.qty=qty;
  }


function additem(id,name,price,qty)
{
  for(var i in cart)
  {

    if(cart[i].id === id)
    {

      cart[i].qty =parseInt(qty)+parseInt(cart[i].qty);
      return;
    }
  }

  var item = new Item(id,name,price,qty);


   cart.push(item);

}

additem(req.body.id,req.body.name,req.body.price,req.body.qty);

  console.log(cart);

   req.session.Cart=cart;
var path='/product/details/'+ req.body.id;
res.redirect(path);
 
});

router.get('/cart', function(req, res){
    var data = {
      sart: req.session.Cart
    };

res.render('./product/cart',data);
}

);

router.get('/remove/:id', function(req, res){

   var id = req.params.id;

  var fruits=req.session.Cart;

  //console.log(id);

     delete fruits[id]; 

    // console.log(fruits);

   var newArray = new Array();

 for (var i = 0; i < fruits.length; i++) {
    if (fruits[i]) {
      newArray.push(fruits[i]);
    }
  }

          req.session.Cart=newArray;
   var data = {
      sart: newArray
    }; 

res.render('./product/cart',data);


  
});



router.post('/cart', function(req, res){


     productModel.lastid( function(result){
     cartid=parseInt(result[0].ord_id) 
     console.log("-->",cartid) 
     senddata(cartid)
  })
  
function senddata(data)
{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 
  var cat = {
    lastid: data,
    cname: req.body.cname,
    mob: req.body.mob,
    add: req.body.add,
    cart: req.session.Cart,
    day:date
  };
  productModel.cartInsert(cat, function(obj){
    res.redirect('/');
  });
}
  
});

module.exports = router;