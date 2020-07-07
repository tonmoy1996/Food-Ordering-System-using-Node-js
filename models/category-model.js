var db = require('./db');
module.exports = {
	getAll: function(callback){
		var sql = "SELECT * FROM categories";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
	get: function(id, callback){
		var sql = "SELECT * FROM categories WHERE id=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},
	insert: function(name, description, callback){
		var sql = "INSERT INTO categories VALUES (null, ?, ?)";
		db.executeQuery(sql, [name, description], function(result){
			callback(result);
		});
	},
	update: function(category, callback){
		var sql = "UPDATE categories SET name=?, description=? WHERE id=?";
		db.executeQuery(sql, [category.name, category.desc, category.id], function(result){
			callback(result);
		});
	},

	delete: function(did,callback){
		console.log(did);

		 var sql="DELETE FROM categories WHERE id=?";
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
