var db = require('./db');
module.exports = {


		getAll: function(callback){
		var sql = "SELECT * FROM review";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
		getAll5: function(callback){
		var sql = "SELECT * FROM review where rating='5'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
		getAll1: function(callback){
		var sql = "SELECT * FROM review where rating='1'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},



};
