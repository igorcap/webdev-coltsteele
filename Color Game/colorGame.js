var level = 6
var color = generateRandomColor(level)
var message = document.querySelector("#message")
var goal = document.querySelector("#goal")
var squares = document.querySelectorAll(".square");
var newColors = document.querySelector("#newcolors")
var easy = document.querySelector("#easyBtn")
var hard = document.querySelector("#hardBtn")
var h1 = document.querySelector("h1")
var pickedColor = color[genRandom(color.length)]
goal.textContent = pickedColor

init();

function init(){
	startColors()
	newColor()
	setupMode()
}


function startColors(){
	for (var i = 0; i<squares.length; i++) {
		squares[i].style.backgroundColor = color[i]

		squares[i].addEventListener("click", function(){
			var clicked = this.style.backgroundColor;
			if (clicked == pickedColor) {
				acertoMiseravi(clicked)
				message.textContent = "Correct!"
				newColors.textContent = "Play Again?"
			} else {
				message.textContent = "Try Again"
				this.style.backgroundColor = "#232323"
			}
		});
	}
}

function newColor(){
	newColors.addEventListener("click", function(){
		restart()
		newColors.textContent = "New Collors"
	})
}

function restart(){
	color = generateRandomColor(level);
	pickedColor = color[genRandom(color.length)];
	goal.textContent = pickedColor;
	message.textContent = ""
	startColors();
}

function generateRandomColor(num){
	arr = []
	for ( i=0;i<num;i++){
		arr.push("rgb("+genRandom(256)+", "+genRandom(256)+", "+genRandom(256)+")")
	}
	return arr;
}

function acertoMiseravi(color){
	for (var i = 0; i<level; i++) {
		squares[i].style.backgroundColor = color
	}
	h1.style.backgroundColor = color;	
}

function genRandom(x){
	return Math.floor(Math.random() * x);
}

function setupMode(){
	easy.addEventListener("click", function(){
		level = 3
		easy.classList.add("selected")
		hard.classList.remove("selected")
		restart()
		for (var i = level;i<squares.length ; i++) {
			squares[i].style.backgroundColor = "#232323"
		}

	})

	hard.addEventListener("click", function(){
		level = 6
		hard.classList.add("selected")
		easy.classList.remove("selected")
		restart()

	})
	
}