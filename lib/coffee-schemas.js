/**
 * @author Quirijn Groot Bluemink
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/coffee_club');

var UserSchema = new Schema({
	name : String,
	date: { type: Date, default: Date.now },
	timesBought: Number,
	totalTimesBought: Number,
	handicap: { type: Number, default: 1 },
});
var userObject = mongoose.model('userObject', UserSchema);

exports.userObject = userObject;
