var db = require('./db');
module.exports = {


	getAll: function(callback){
		var sql = "SELECT * FROM order_t where status='p'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
	get: function(id, callback){
		var sql = "SELECT * FROM order_t WHERE date=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},

      getRegister: function(callback){
		var sql = "SELECT * FROM order_t WHERE status='up' ";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
		 getp: function(callback){
				var sql = "SELECT * FROM order_t WHERE status='d' ";
				db.executeQuery(sql, null, function(result){
					callback(result);
				});
			},
	 getc: function(callback){
		var sql = "SELECT * FROM order_t WHERE status='c' ";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},




	insert: function(name, description, callback){
		var sql = "INSERT INTO categories VALUES (null, ?, ?)";
		db.executeQuery(sql, [name, description], function(result){
			callback(result);
		});
	},
	update: function(category, callback){
		var sql = "UPDATE order_t SET status=? WHERE ord_id=?";
		db.executeQuery(sql, [category.status,category.id], function(result){
			callback(result);
		});
	},

	delete: function(did,callback){
	
		 var sql="DELETE FROM order_t WHERE ord_id=?";
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
