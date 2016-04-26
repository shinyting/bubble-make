var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name: String,
	loginTime: String
});

var User = mongoose.model("User", UserSchema);
module.exports = User;