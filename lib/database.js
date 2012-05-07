/**
 *  Author: Quirijn Groot Bluemink
 */
var mongoose = require('mongoose');
var schemas = require("./coffee-schemas")

mongoose.connect('mongodb://localhost/coffee_club');

exports.getUsers = function getUsers(callback) {
	var userModel = mongoose.model('userObject');

	userModel.find().sort('date', 1, 'totalTimesBought', -1).run(function(err, docs) {
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
	console.log(data)
	console.log('updating user ' + data.id)
	var totalTimesBought = parseInt(data.totalTimesBought) + 1
	console.log('times bought ' + totalTimesBought)

	var userModel = mongoose.model('userObject');
	var query = {
		_id : data.id
	};
	userModel.update(query, {
		date : new Date(),
		totalTimesBought : totalTimesBought
	}, null, function(err, numAffected) {
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