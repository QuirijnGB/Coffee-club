/**
 *  Author: Quirijn Groot Bluemink
 */

var database = require('../lib/database');


exports.index = function(req, res) {
	database.getUsers(function(err, doc) {
		if(err) {
			res.send(err)
		}
		res.render('index', {
			title : 'Overview - Coffee Club',
			id : '/',
			users : doc
		})
	})
};


exports.update = function(req, res) {
	console.log("Updating")
	console.log(req.body)
	database.updateUser(req.body, function(err, doc) {
		if(err) {
		console.log(err)
			res.send(err)
		}
		database.getUsers(function(err, doc) {
			if(err) {
				res.send(err)
			}
			res.render('index', {
				title : 'Overview - Coffee Club',
				id : '/',
				users : doc
			})
		})
	})
};
