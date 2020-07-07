var db = require('./db');
var mysql      = require('mysql');
module.exports = {


		getAll: function(callback){
		var sql = "SELECT * FROM product";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
		},



      	lastid: function(callback){
		var sql = "SELECT ord_id FROM order_t ORDER by id DESC ";
		db.executeQuery(sql, null, function(result){
		callback(result);
		});
	},


	get: function(id, callback){
		var sql = "SELECT * FROM product WHERE id=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},
	insert: function(category, callback){
		var sql = "INSERT INTO product VALUES (null,?, ?,?,?,?)";
		db.executeQuery(sql, [category.namee, category.price, category.comment, category.file,"availabel"], function(result){
			callback(result);
		});
	},

      cartInsert: function(category, callback){

             for (var i=0;i<category.cart.length;i++)
             {
	    var sql = "INSERT INTO order_t VALUES (null,?,?,?,?,?,?,?,?,?)";
		db.executeQuery(sql, [category.lastid +1,category.cname,category.mob,category.add ,category.cart[i].name, category.cart[i].price, category.cart[i].qty,category.day,"up"], function(result){
			
		});
            }

             callback(true);

	},



	update: function(category, callback){

		var sql = "UPDATE product SET p_name=?, p_price=?, detalis=?, path=? WHERE id=?";
		db.executeQuery(sql, [category.name, category.price,category.desc,category.path,category.id], function(result){
			callback(result);
		});
	},

	delete: function(did,callback){
		console.log(did);

		 var sql="DELETE FROM product WHERE id=?";
		 db.executeQuery(sql,did, function(result){

            callback(result);

		 });

	},

	search: function(sid,callback){
		console.log(sid);

		var sql="SELECT * FROM categories WHERE name=sid ";
     db.executeQuery(sql, function(result){

            callback(result);

		 });

	}
};
