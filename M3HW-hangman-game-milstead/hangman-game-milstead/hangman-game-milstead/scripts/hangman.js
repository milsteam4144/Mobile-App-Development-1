//Create list (array) of words
var words = [
"javascript",
"monkey",
"amazing",
"pancake",
"textbook",
"computer",
"grandmother",
"sunshine",
"millionaire",
"midnight",
"lobster",
"associate",
"keyboard",
"crocodile",
"outfit",
"scholarship"
];
//Randomly assign an item from the 'words' array to the 'word' variable
var word = words[Math.floor(Math.random() * words.length)];

//Create an array to hold the underscores representing the length of 'word'
var answerArray = [];
for (var i = 0; i < word.length; i++) {
	answerArray[i] = "_";}
//This variable keeps track of how many letters are left to be guessed
var remainingLetters = word.length;
//Create a variable to track the number of guesses
var numGuess = 14;
//Create a variable to hold the letters that have been guessed
var guessList = [];

//While remainingLetters is greater than zero and numGuess is greater than 0, the loop continues
while (remainingLetters > 0 && numGuess > 0)  {
	//Show the player their current progress.
	/*The join() method joins all elements of an array (or an array-like object)
	 into a string and returns a string.*/
	alert(answerArray.join(" "));
	//Get a guess from the player and ensure it is a single character.
	var guess = prompt("Guess a letter, or click Cancel to stop playing.");
	//Ensure that the guess is lower case.
	var guess = guess.toLowerCase();
	//If the current guess is in the guessList array, alert the user
	if(guessList.indexOf(guess) > -1){
		alert("You have already used this letter!");
	}
	//Add the guess to the array
	guessList.push(guess);

	//If the player clicks Cancel, the value of guess is null and the loop breaks.
		if (guess === null){
			break;
	}
			//If the value assigned to guess is not one, prompt the player to enter
			//a single character(letter)
		else if (guess.length !== 1){
		alert("Please enter a single letter.");
	}
		//If all of the above specifications are met, update the state of the game is updated
		else{
				//Decrease the number of guesses by one
				numGuess--;
				for (var j = 0; j < word.length; j++){
					//If the guess is equal to one of the letters in the word and that letter has not been guessed yet...
					if (word[j] === guess && answerArray[j]=== "_"){
						//Fill in the index in the answerArray with the guess.
						answerArray[j] = guess;
						//Decrement the remainingLetters variable by one.
						remainingLetters--;}

					
					
   }
  }
 }
//End of the game loop...the game ends when either remainingLetters or numGuess is not greater than zero 

//If the value assigned to numGuess is greater than 0, show the player an alert
if (numGuess > 0){
	alert(answerArray.join(" "));
	alert("Good Job! The answer was " + word);}

//If the value assigned to numGuess is not greater than 0, show the player an alert
else{alert("You have ran out of guesses, Goodbye!")}
	