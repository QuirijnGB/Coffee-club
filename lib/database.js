/**
 *  Author: Quirijn Groot Bluemink
 */
var mongoose = require('mongoose');
var schemas = require("./coffee-schemas")

mongoose.connect('mongodb://localhost/coffee_club');

exports.getUsers = function getUsers(callback) {
	var userModel = mongoose.model('userObject');

	userModel.find().sort('totalTimesBought', 1).run(function(err, docs) {
		callback(err, docs)
	})
}


exports.createUser = function createUser(name, callback) {
	console.log('Creating user ' + name)
	var userModel = mongoose.model('userObject');
	var user = new userModel();
	user.name = name;
	user.timesBought = 0;
	user.totalTimesBought = 0;
	user.save(function(err) {
		callback(err)
	});
}


exports.updateUser = function updateUser(data, callback) {
	var userModel = mongoose.model('userObject');

	var query = {
		_id : data.id
	};
	delete data.id

	userModel.update(query, data, null, function(err, numAffected) { 
		userModel.find().sort('date', 1).sort('timesBought', -1).run(function(err, docs) {
			var _totalTimesBought = 0;
			for(var i=0; i < docs.length; i++) {
				_totalTimesBought += docs[i].timesBought;
			}
			//data.totalTimesBought = ( 100 / _totalTimesBought ) * data.timesBought;
			//data.totalTimesBought = ( 1 / _totalTimesBought ) ;
			data.totalTimesBought = ( 100 / _totalTimesBought ) ;

			for(var i=0; i < docs.length; i++) {
				//var tmp = ((100 / _totalTimesBought ) * docs[i].timesBought) * docs[i].handicap ;
				var tmp = ((100 / _totalTimesBought ) * docs[i].timesBought) * docs[i].handicap ;
				query = { _id: docs[i]._id };
				data = { totalTimesBought: Math.ceil(tmp)};
				userModel.update(query, data, null, function(err, numAffected) {})
			}
			callback(err, numAffected)
		})
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
