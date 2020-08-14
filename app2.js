var express = require("express");
var app = express();
// const ejsLint = require("ejs-lint");
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

// mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// var myobj = {
//   name: "Shree Nidhi",
//   image:
//     "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
// };
// });

var mydb;
// var mycollection;

const uri =
  "";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  mydb = client.db("restaurant");
  const collection = client
    .db("restaurant")
    .collection("restaurant_collection");
  // perform actions on the collection object
  if (err) {
    console.log(err);
  } else {
    console.log("connection successfull");
    // var newCampground = {
    //   name: "Dominos",
    //   image:
    //     "https://media-cdn.tripadvisor.com/media/photo-s/13/df/d8/ea/our-new-look-store.jpg",
    //   description:
    //     "This is the dominos outlet in Bhayander West. Plenty of space, less crowded on weekdays. Great Offers"
    // };
    // mydb
    //   .collection("restaurant_collection")
    //   .insertOne(newCampground, function(err, myRes) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log(myRes);
    //     }
    //   });
    // console.log(collection);
    // mycollection = collection;
  }
  // client.close();
});

// var campgrounds = [
//   {
//     name: "Shree Nidhi",
//     image:
//       "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
//   },
//   {
//     name: "Veg Saagar",
//     image:
//       "https://www.photosforclass.com/download/pixabay-768771?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F51e6dd444d53b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
//   },
//   {
//     name: "Navrang Veg",
//     image:
//       "https://www.photosforclass.com/download/pixabay-690975?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d54a4d57b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
//   },
//   {
//     name: "Shree Nidhi",
//     image:
//       "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
//   },
//   {
//     name: "Veg Saagar",
//     image:
//       "https://www.photosforclass.com/download/pixabay-768771?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F51e6dd444d53b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
//   },
//   {
//     name: "Navrang Veg",
//     image:
//       "https://www.photosforclass.com/download/pixabay-690975?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d54a4d57b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
//   },
//   {
//     name: "Shree Nidhi",
//     image:
//       "https://www.photosforclass.com/download/pixabay-1834784?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d6474d5aa814f6da8c7dda793f7f1636dfe2564c704c7d2f73d6964fcc58_960.jpg&user=Pexels"
//   },
//   {
//     name: "Veg Saagar",
//     image:
//       "https://www.photosforclass.com/download/pixabay-768771?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F51e6dd444d53b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
//   },
//   {
//     name: "Navrang Veg",
//     image:
//       "https://www.photosforclass.com/download/pixabay-690975?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d54a4d57b108f5d084609620367d1c3ed9e04e507441752779d59544c5_960.jpg&user=Free-Photos"
//   }
// ];

app.get("/", function(req, res) {
  res.render("landing");
});

// index route -- show all
app.get("/campgrounds", function(req, res) {
  // console.log(mycollection);
  // mycollection("campgrounds").find()
  mydb
    .collection("restaurant_collection")
    .find({})
    .toArray(function(err, allCampgrounds) {
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
  mydb
    .collection("restaurant_collection")
    .insertOne(newCampground, function(err, myRes) {
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
  mydb
    .collection("restaurant_collection")
    .findOne({ _id: ObjectId(`${req.params.id}`) }, function(
      err,
      foundCampground
    ) {
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
