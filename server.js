var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var exphbs = requireF("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");


app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mongoHeadlines");

var routes = require("./controllers/controller.js");

app.use(routes);


// Start the server
app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
});