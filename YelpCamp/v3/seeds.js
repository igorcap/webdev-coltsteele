var mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment 	= require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg",
		description: "blablablalbalbal"
	},
	{
		name: "Desert's Rest",
		image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg",
		description: "blablablalbalbal"
	},
	{
		name: "Smoke Bet",
		image: "https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg",
		description: "blablablalbalbal"
	}
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		} else {
			console.log("Removed Campgrounds!");					
		}
		//add a few campgrounds
		data.forEach( function(seed) {
		// statements
			Campground.create(seed, function(err,campground){
				if (err) {
					console.log(err);
				} else {
					console.log("added a campground");
					//create a comment
					Comment.create({
						text: "This place is great, but could be better!",
						author: "Jack"
					}, function(err, comment){
						if (err) {
							console.log(err);
						} else {
							console.log('added a comment');
							campground.comments.push(comment);
							campground.save();							
						}
					});
				}
			});
		});
	});	
	

}

module.exports = seedDB;