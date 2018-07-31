var express = require("express");

var router = express.Router();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

// HTML Route
router.get("/", function(req, res) {
    db.Article.find({}, function(data) {
            var hbsObject = {
                Article: data
            }
            // console.log(dbArticle);
            // res.render(hbsObject)
        })
        .then(function(dbArticle) {
           res.render("index", dbArticle)
        })
        .catch(function(err) {
            res.json(err);
        });
});

// API Routes

// Scraper and puts data into an array of objects that is sent to MongoDB
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
            collection.summary = cheer(this)
                .children(".story-text")
                .children("a")
                .children("p")
                .text();
            collection.photo = cheer(this)
                .children(".thumb-image")
                .children(".bucketwrap")
                .children(".imagewrap")
                .children("a")
                .children(".img")
                .attr("src");
            collection.link = cheer(this)
                .children(".story-text")
                .children("a")
                .attr("href");

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

// Renders all the articles into the browser window
router.get("/articles", function(req, res) {
    db.Article.find({}, function(data) {
        var hbsObject = {
            Article: data
        }
        // console.log(dbArticle);
        // res.render(hbsObject)
    })
        .then(function(dbArticle) {
           res.json(dbArticle)
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Renders all the comments for a particular article
router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})
        .populate("comment")
        .then(function(dbArticle) {
            res.render(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body)
        .then(function(dbComment) {
            return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: {comment: dbComment._id}}, {new: true});

        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});


module.exports = router