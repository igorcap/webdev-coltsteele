var mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment 	= require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg",
		description: "Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam faucibus mi quis velit. Integer in sapien. Fusce tellus odio, dapibus id, fermentum quis, suscipit id, erat. Fusce aliquam vestibulum ipsum. Aliquam erat volutpat. Pellentesque sapien. Cras elementum. Nulla pulvinar eleifend sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porta. Vivamus porttitor turpis ac leo. Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac"
	},
	{
		name: "Desert's Rest",
		image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg",
		description: "Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam faucibus mi quis velit. Integer in sapien. Fusce tellus odio, dapibus id, fermentum quis, suscipit id, erat. Fusce aliquam vestibulum ipsum. Aliquam erat volutpat. Pellentesque sapien. Cras elementum. Nulla pulvinar eleifend sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porta. Vivamus porttitor turpis ac leo. Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac"
	},
	{
		name: "Smoke Bet",
		image: "https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg",
		description: "Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam faucibus mi quis velit. Integer in sapien. Fusce tellus odio, dapibus id, fermentum quis, suscipit id, erat. Fusce aliquam vestibulum ipsum. Aliquam erat volutpat. Pellentesque sapien. Cras elementum. Nulla pulvinar eleifend sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porta. Vivamus porttitor turpis ac leo. Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac"
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