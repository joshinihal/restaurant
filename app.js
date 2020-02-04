var express = require("express");
var app = express();
const ejsLint = require("ejs-lint");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
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
    }
  ];
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Yelp has started");
});
