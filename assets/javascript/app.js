var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is Rick's favorite exhibit in Anatomy Park?", 
"What does Snuffles want to be called after he abandoned his slave name?",
 "What is Rick's last name?", "What two leaders did Rick combine to create the perfect leader?", 
 "What is the name of Rick's hivemind lover?", "What dimension is Rick and Morty from?"];

var answerArray = [["Pirates of the Pancreas", "The Bone Train", "Spleen Mountain", "Bladder Falls"], 
["Snowbot","Whitefur","Snowball","Puppy Dog"], ["Smith", "Cronenberg", "Gazorpazorp", "Sanchez"],
 ["Abraham Lincoln and Adolf Hitler","Julius Caesar and Future Morty","George Washington and Mao Zedong","Alexander the Great and Genghis Khan"],
 ["Unity", "Hivemind", "Thalia", "Beta Seven"],
 ["Earth Dimension C-137","Earth Dimension D-4","Solar Nebula's 2251","Jupiter YV 13"]];



var answersCorrect = ["Pirates of the Pancreas", "Snowball", "Sanchez", "Abraham Lincoln and Adolf Hitler", "Unity", "Earth Dimension C-137"];


var questionCounter = 0;
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = "click.mp3";


$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, initiateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	clickSound.play();  // added line to test issue on GitHub Viewer
	initiateHTML();
	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === answersCorrect[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		initiateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		initiateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	gameReset();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function initiateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + answersCorrect[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function initiateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + answersCorrect[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function initiateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ answersCorrect[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function initiateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>"
	 + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] +
	  "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	initiateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			initiateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + 
	"</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + 
	"<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset!</a></p>";
	$(".mainArea").html(gameHTML);
}

function gameReset() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	initiateHTML();
	timerWrapper();
}