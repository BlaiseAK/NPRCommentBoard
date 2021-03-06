var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");


app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);

var routes = require("./controllers/controller.js");

app.use(routes);


// Start the server
app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
});