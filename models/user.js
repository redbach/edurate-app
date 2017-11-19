var mongoose   = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// var ip = (req.headers['x-forwarded-for'] ||
//      req.connection.remoteAddress ||
//      req.socket.remoteAddress ||
//      req.connection.socket.remoteAddress).split(",")[0];

var UserSchema	= new mongoose.Schema({
    username: String,
    password: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema); 