var express = require("express"),
    passport = require("passport"),
    User = require("../models/user");
    

var router = express.Router({mergeParams: true});


router.get("/", function(req, res){
    res.render("landing");
});


// AUTH ROUTES

//show register form
router.get("/register", function(req,res){
    res.render("register");
});

//sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    }); 
})

//show login form
router.get("/login", function(req,res){
    res.render("login")
})

//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
    ),function(req,res){
})

// logout route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;