var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mongoHeadlines");


app.get("/scrape", function(req, res) {

    axios.get("http://www.npr.org/").then(function(response) {
        var cheer = cheerio.load(response.data);

        cheer("h3.title").each(function(i, element) {
            var collection = {};

            collection.title = cheer(this)
                .text();
            collection.link = cheer(this)
                .parent()
                .attr("href");

            db.Article.create(collection)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
        location.reload();
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    location.reload();
});



// Start the server
app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
});