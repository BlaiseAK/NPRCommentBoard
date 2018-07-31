var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Creates a new CommentSchema object
var CommentSchema = new Schema({
    // Body will be the type of string
    body: String
});

// Creates the model for the schema above.
var Comments = mongoose.model("Comment", CommentSchema);

// Export Comment model
module.exports = Comments;
