/**
 *  Author: Quirijn Groot Bluemink
 */
var database = require('../lib/database');
exports.index = function(req, res) {
	database.getUsers(function(err, doc) {
		if(err) {
			res.send(err)
		}
		res.render('admin', {
			title : 'Admin - Coffee Club',
			id : '/admin',
			users : doc
		})
	})
};
exports.create = function(req, res) {
	var name = req.body.name
	database.createUser(name, function(err, doc) {
		if(err) {
			res.send(err)
		}
		database.getUsers(function(err, doc) {
			if(err) {
				res.send(err)
			}
			res.render('admin', {
				title : 'Express',
				id : '/admin',
				users : doc
			})
		})
	})
};
exports.remove = function(req, res) {
	console.log(req)
};