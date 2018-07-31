var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Creates a new ArticleSchemea object
var ArticleSchema = new Schema({

    // Title will be the type of string
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    // Link will be the type of string
    link: {
        type: String,
        required: true
    },
    // Comment will be an array with a type of ObjectId
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Creates the model for the schema above.
var Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;