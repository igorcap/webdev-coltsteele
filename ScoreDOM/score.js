var playerOne = document.querySelector("#playerone")
var playerTwo = document.querySelector("#playertwo")
var reset = document.querySelector("#reset")
var max = document.querySelector("#max")
var maxInput = document.querySelector("#maxinput")
var scoreOne = document.querySelector("#score1")
var scoreTwo = document.querySelector("#score2")

var winner = 0


maxInput.addEventListener("change", function(){
	max.textContent = Number(maxInput.value)	
	winner = 0
	resetScore()
});

playerOne.addEventListener("click", function(){
	if((Number(max.textContent)> Number(scoreOne.textContent)) && winner === 0){
		scoreOne.textContent = Number(scoreOne.textContent) + 1
		
		if (Number(max.textContent)<= Number(score1.textContent)) {
			scoreOne.classList.add("winner")
			winner = 1
		}
	}
});

playerTwo.addEventListener("click", function(){
	if((Number(max.textContent)> Number(scoreTwo.textContent)) && winner === 0){
		scoreTwo.textContent = Number(scoreTwo.textContent) + 1
	
		if (Number(max.textContent)<= Number(scoreTwo.textContent)) {
			scoreTwo.classList.add("winner")
			winner = 1
		}
	}
});

reset.addEventListener("click", function(){
	resetScore()
})

function resetScore(){
	winner = 0
	scoreOne.textContent = 0
	scoreTwo.textContent = 0
	scoreOne.classList.remove("winner")
	scoreTwo.classList.remove("winner")
}
