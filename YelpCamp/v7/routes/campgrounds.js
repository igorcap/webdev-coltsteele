var express     = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");


var router = express.Router({mergeParams: true});

router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
});

router.post("/", function(req, res){
    // get data from form and add to campgrounds array

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newCamp){
        if (err) {
            console.log(err);
        } else {
            console.log(newCamp);
            res.redirect("/campgrounds");
        }
    })
});

router.get("/new", function(req, res){
   res.render("campgrounds/new.ejs"); 
});

// SHOW -
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, found){
        if (err) {
            console.log(err);
        } else {
            console.log(found);
            res.render("campgrounds/show", {campground: found});
        }
    })
})


module.exports = router;