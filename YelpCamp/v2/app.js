var express =       require("express"),
    app =           express(),
    bodyParser =    require("body-parser"),
    mongoose =      require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


/*Campground.create(
    { 
    name: "Salmon Creek", 
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
    description: "Very good place!"
    }, function(err, campground){
            if(err){
                consolo.log(err);
            } else {
                console.log(campground);
            }
        }
       
    );
*/

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index",{campgrounds:campgrounds})
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
   res.render("new.ejs"); 
});

// SHOW -
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id, function(err, found){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: found});
        }
    })
})



app.listen(9000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});