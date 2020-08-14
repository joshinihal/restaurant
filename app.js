var express = require("express");
var app = express();
// const ejsLint = require("ejs-lint");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var MongoClient = require("mongodb").MongoClient;
// var ObjectId = require("mongodb").ObjectID;

// mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// var myobj = {
//   name: "Shree Nidhi",
//   image:
//     "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
// };
// });

// var mydb;
// var mycollection;

const uri =
  "";

mongoose.connect(uri, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
console.log(db);
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//   {
//     name: "CCD",
//     image:
//       "https://b.zmtcdn.com/data/reviews_photos/70d/5893316be887c7189398585bc972d70d_1509166266.jpg?impolicy=newcropandfit&cropw=780&croph=780&cropoffsetx=146&cropoffsety=0&cropgravity=NorthWest&fitw=200&fith=200&fittype=ignore",
//     description: "This is the best coffee shhop you'll ever visit"
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("created new campground");
//       console.log(campground);
//     }
//   }
// );

app.get("/", function(req, res) {
  res.render("landing");
});

// index route -- show all
app.get("/campgrounds", function(req, res) {
  // console.log(mycollection);
  // mycollection("campgrounds").find()

  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      console.log(allCampgrounds);
      res.render("index", { campgrounds: allCampgrounds });
    }
    // if you close here, server wont be available in the routes so keep the connection open
    // db.close();
  });
});

// create route-- add new
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;

  var newCampground = { name: name, image: image, description: description };
  Campground.create(newCampground, function(err, myRes) {
    if (err) {
      console.log(err);
    } else {
      console.log(myRes);
      res.redirect("/campgrounds");
    }
  });
});

// new-- show form to create new
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

// important to be the last one or else it will confuse with anything that matches the pattern for ex campgrounds/new
// show-- shows more info about restaurant
app.get("/campgrounds/:id", function(req, res) {
  // res.send("this will be the show page");
  var myId = req.params.id;
  console.log(myId);
  // var myquery = { _id: `${req.params.id}` };
  // console.log(myquery);

  // var query = { _id: myId };
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("show.ejs", { campground: foundCampground });
    }
    // if you close here, server wont be available in the routes so keep the connection open
    // db.close();
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Yelp has started");
});
