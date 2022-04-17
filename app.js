//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent =
  "This is Niall Flannery's journal. I plan on updating this journal as and when I do some learning relating to web development or when I post a new project online. Get in touch with any questions, comments or feedback.";
const aboutContent =
  "Im a Web Developer, with a passion for magic 🧙‍♂️. I am also a qualified Hypnotherapist.";

const contactContent = "please get in touch";

var posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const postContent = {
    postTitle: req.body.newTitle,
    postBody: req.body.newEntry,
  };
  posts.push(postContent);
  res.redirect("/");
});

app.get("/posts/:entry", (req, res) => {
  const reqTitle = _.lowerCase(req.params.entry);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.postTitle);

    if (storedTitle === reqTitle) {
      const pageTitle = post.postTitle;
      const pageContent = post.postBody;
      res.render("post", { pageTitle: pageTitle, pageContent: pageContent });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server active");
});
