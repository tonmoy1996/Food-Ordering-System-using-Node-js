var db = require('./db');
module.exports = {
	validateUser: function(username, password, callback){
		var sql = "SELECT * FROM login WHERE uname=? AND pass=?";
		var sqlParam = [username, password];
		db.executeQuery(sql, sqlParam, function(result){
			if(result.length == 0)
			{
				callback(false);
			}
			else
			{
				callback(true);
			}
		});
	},


		getAll: function(callback){
		var sql = "SELECT * FROM login";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

			get: function(id, callback){
				var sql = "SELECT * FROM login WHERE id=?";
				db.executeQuery(sql, [id], function(result){
					callback(result[0]);
				});
			},



 	delete: function(did,callback){
		console.log(did);

		 var sql="DELETE FROM login WHERE id=?";
		 db.executeQuery(sql,did, function(result){

            callback(result);

		 });

	},


		insert: function(category, callback){
		var sql = "INSERT INTO login VALUES (null,?,?,?,?)";
		db.executeQuery(sql, [category.namee, category.uname, category.pass, category.file], function(result){
			callback(result);
		});
	},


       	update: function(category, callback){
		var sql = "UPDATE login SET name=?, uname=? ,pass=? WHERE id=?";
		db.executeQuery(sql, [category.name, category.uname,category.pass, category.id], function(result){
			callback(result);
		});
	},













};
