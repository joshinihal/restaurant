var express = require("express");
var app = express();
// const ejsLint = require("ejs-lint");
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
// mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const uri =
  "mongodb+srv://user:1234@cluster0-k18a8.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("restaurant").collection("campgrounds");
  // perform actions on the collection object
  client.close();
  console.log("connection successfull");
});

var campgrounds = [
  {
    name: "Shree Nidhi",
    image:
      "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
  },
  {
    name: "Veg Saagar",
    image:
      "https://www.photosforclass.com/download/pixabay-768771?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F51e6dd444d53b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
  },
  {
    name: "Navrang Veg",
    image:
      "https://www.photosforclass.com/download/pixabay-690975?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d54a4d57b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
  },
  {
    name: "Shree Nidhi",
    image:
      "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
  },
  {
    name: "Veg Saagar",
    image:
      "https://www.photosforclass.com/download/pixabay-768771?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F51e6dd444d53b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
  },
  {
    name: "Navrang Veg",
    image:
      "https://www.photosforclass.com/download/pixabay-690975?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d54a4d57b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
  },
  {
    name: "Shree Nidhi",
    image:
      "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
  },
  {
    name: "Veg Saagar",
    image:
      "https://www.photosforclass.com/download/pixabay-768771?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F51e6dd444d53b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
  },
  {
    name: "Navrang Veg",
    image:
      "https://www.photosforclass.com/download/pixabay-690975?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d54a4d57b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
  }
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Yelp has started");
});
