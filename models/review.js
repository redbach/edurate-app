var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
    text: String,
    author:  {
    id:  {
        type: mongoose.Schema.Types.ObjectId, //Don't forget the 's' on Types!!
        ref: "User" //the model being referred to with the above ObjectId
      },
    username: String
   },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId, //Don't forget the 's' on Types!!
        ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Review", reviewSchema);
