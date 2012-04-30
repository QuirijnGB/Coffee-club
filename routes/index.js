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
	database.updateUser(req.body, function(err, doc) {
		if(err) {
			res.send(err)
		}
		console.log("doc")
		console.log(doc)
		database.getUsers(function(err, doc) {
			if(err) {
				res.send(err)
			}
			console.log(doc)
			res.render('index', {
				title : 'Overview - Coffee Club',
				id : '/',
				users : doc
			})
		})
	})
};
