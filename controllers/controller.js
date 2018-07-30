var express = require("express");

var router = express.Router();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");



router.get("/scrape", function(req, res) {

    return axios.get("http://www.npr.org/").then(function(response) {
        var cheer = cheerio.load(response.data);

        cheer("div.story-wrap").each(function(i, element) {
            var collection = {};

            collection.title = cheer(this)
                .children(".story-text")
                .children("a")
                .children(".title")
                .text();
            collection.link = cheer(this)
                .children(".story-text")
                .children("a")
                .attr("href")
                .val();

            db.Article.create(collection)
                .then(function(dbArticle) {
                    console.log(dbArticle);

                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
    });
});

router.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})
        .populate("comment")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});


module.exports = router