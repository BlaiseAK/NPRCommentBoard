var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mongoHeadlines")