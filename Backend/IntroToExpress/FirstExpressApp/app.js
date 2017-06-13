var express = require("express");
var app = express();


// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

app.get("/speak/pig", function(req,res){
	res.send("Oink")
});

app.get("/speak/cow", function(req,res){
	res.send("Moo")
});

app.get("/speak/dog", function(req,res){
	res.send("Woof")
});

app.get("/repeat/:message/:id", function(req, res){
	var id = Number(req.params.id);
	console.log(req.params);
	var message = "";
	for( i=0 ; i < id ; i++){
		message = message+" "+req.params.message
	}
	console
	res.send(message);
});
/*
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
  res.send("Goodbye!!"); 
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    console.log("SOMEONE MADE A REQUEST TO /DOG!!!")
   res.send("MEOW!"); 
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
   res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!"); 
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("WELCOME TO THE COMMENTS PAGE!"); 
});

app.get("*", function(req, res){
  res.send("YOU ARE A STAR!!!"); 
});
*/

// Tell Express to listen for requests (start server)

app.listen(4000, process.env.IP, function(){
    console.log("Server has started!!!");
});
