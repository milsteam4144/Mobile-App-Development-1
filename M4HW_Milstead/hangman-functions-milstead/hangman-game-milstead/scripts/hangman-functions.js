// Mallory Milstead
//6/24/2018


/////////////FUNCTIONS/////////////////////////////////////////////

//This function chooses a word from the list
var pickWord = function(){
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
    return word;
  };
  
  var setupAnswerArray = function(word){
    //Create an array to hold the underscores representing the length of 'word'
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
      answerArray[i] = "_";}
    return answerArray;
  };
  
  var showPlayerProgress = function (answerArray){
    //Show the player their current progress.
    /*The join() method joins all elements of an array (or an array-like object)
     into a string and returns a string.*/
    alert(answerArray.join(" "));
  };
  
  var getGuess = function (){
    //Get a guess from the player and ensure it is a single character.
    var guess = prompt("Guess a letter, or click Cancel to stop playing.");
    //Ensure that the guess is lower case.
    var guess = guess.toLowerCase();
    return guess;
  };

  var updateGameState = function (guess, word, answerArray){
    //Create a variable to count how many times the guess (letter) occurs in the word(string).
    var count = 0;
    //For however many letters are in the word....
    for (var j = 0; j < word.length; j++){
      //If the guess is equal to one of the letters in the word...
      if (word[j] === guess){
        //fill in the index in the answerArray with the guess.
        answerArray[j] = guess;
        //Add one to the number of times the letter occurs in the word
        count++;
      }
    }
    return count;
  };
  
  var showAnswerAndCongratulatePlayer = function (answerArray, word){
      //If the player is not out of guesses...
    if (numGuess > 0){
      //Show the progress (solution) and alert player
      showPlayerProgress(answerArray);
      alert("Good Job! The answer was " + word);}
      //Alert player
      else{alert("You have ran out of guesses, Goodbye!")}
      };
  
  


//////////////////PROGRAM STARTS HERE///////////////////////////////////////////
//Create an array to hold the letters that have already been quessed.
var guessList = [];
//Create a variable to limit the number of guesses the player has before they lose.
var numGuess = 14;
//Call the function pickWord and assign its return value to the word variable.
var word = pickWord();
//Call the setupAnswerArray function, passing it the word variable as a
//parameter. Assign the return value of the function to the answerArray variable.
var answerArray = setupAnswerArray(word);
//Assign the value of the .length method to the remainingLetters variable.
//This variable keeps track of how many letters are left to be guessed
var remainingLetters = word.length;

//While loop. --> while remainingLetters is greater than 0
while (remainingLetters > 0 && numGuess > 0){
  showPlayerProgress(answerArray);
  //Call the getGuess function and assign it's value to the guess variable.
  var guess = getGuess();
  //If the player clicks cancel, end the loop/game.
  if (guess === null){
    break;
  }
  //If the player enters anything other than a single character, alert them
  else if (guess.length !== 1){
    alert("Please enter a single letter");
  }
  //If the player has already guessed this letter, show them an alert.
  else if(guessList.indexOf(guess) > -1){
		alert("You have already used this letter!");
	}
  else{
    //Decrease the number of remaining guesses by one.
    numGuess--;
     //Add the guess to the array
     guessList.push(guess);
    //Call the updateGameState function and assign its return value to correctGuesses.
     var correctGuesses = updateGameState(guess, word, answerArray);
    //Subtract the number of correctGuesses from the number of remainingLetters
    remainingLetters -= correctGuesses;
  }
}
//Call a function that shows the answer as long as the player is not out of guesses.
showAnswerAndCongratulatePlayer(answerArray, word, numGuess);