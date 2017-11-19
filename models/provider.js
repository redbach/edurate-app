var mongoose = require("mongoose");
//SCHEMA SETUP
var providerSchema = new mongoose.Schema({
	name: {
		type: String
	},
	price: String,
	image: String,
	descriptor: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User" //the model being referred to with the above ObjectId
      },
   	username: String
   },
	reviews: [
		{
		type: mongoose.Schema.Types.ObjectId, //Don't forget the 's' on Types!!
		ref: "Review"
		}
	]
});

module.exports = mongoose.model("Provider", providerSchema);