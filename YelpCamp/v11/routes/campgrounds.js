var express     = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");


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

router.post("/", middleware.isLoggedIn ,function(req, res){
    // get data from form and add to campgrounds array

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, price: price, author: author};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newCamp){
        if (err) {
            console.log(err);
        } else {
           
            res.redirect("/campgrounds");
        }
    })
});

router.get("/new", middleware.isLoggedIn ,function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW -
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, found){
        if (err) {
            console.log(err);
        } else {
            
            res.render("campgrounds/show", {campground: found});
        }
    })
})

// edit campground 
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req,res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render("campgrounds/edit", {campground: foundCamp});
    });
    
});

router.put("/:id", middleware.checkCampgroundOwnership ,function(req,res){
    // find and update the correct campground

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCamp){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground updated!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
    // redirect somewhere(show page)

});

// destroi campground route
router.delete("/:id",middleware.checkCampgroundOwnership , function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;