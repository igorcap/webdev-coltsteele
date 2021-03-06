var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

var app = express();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "secredo secreto",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ROUTER

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
});

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new.ejs"); 
});

// SHOW -
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, found){
        if (err) {
            console.log(err);
        } else {
            console.log(found);
            res.render("campgrounds/show", {campground: found});
        }
    })
})


// COMMENTS ROUTE

app.get("/campgrounds/:id/comments/new", isLoggedIn ,function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn , function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);  
                }
            })

        }
    });
});


// AUTH ROUTES

//show register form
app.get("/register", function(req,res){
    res.render("register");
});

//sign up logic
app.post("/register", function(req,res){
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
app.get("/login", function(req,res){
    res.render("login")
})

//login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
    ),function(req,res){
})

// logout route
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(8000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});