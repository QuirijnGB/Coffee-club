/**
 *  Author: Quirijn Groot Bluemink
 */
var mongoose = require('mongoose');
var schemas = require("./coffee-schemas")

mongoose.connect('mongodb://localhost/coffee_club');

exports.getUsers = function getUsers(callback) {
	var userModel = mongoose.model('userObject');

	userModel.find().sort('date', 1).sort('totalTimesBought', -1).run(function(err, docs) {
		callback(err, docs)
	})
}

exports.createUser = function createUser(name, callback) {
	console.log('Creating user ' + name)
	var userModel = mongoose.model('userObject');
	var user = new userModel();
	user.name = name;
	user.totalTimesBought = 0;
	user.save(function(err) {
		console.log(err)
		callback()
	});
}

exports.updateUser = function updateUser(data, callback) {

	var userModel = mongoose.model('userObject');
	var query = {
		_id : data.id
	};
	delete data.id
	userModel.update(query, data, null, function(err, numAffected) {
		callback(err, numAffected)
	})
}

exports.deleteUser = function deleteUser(id, callback) {

	var userModel = mongoose.model('userObject');
	var query = {
		_id : id
	};
	userModel.remove(query, function(err, numAffected) {
		callback(err, numAffected)
	})
}