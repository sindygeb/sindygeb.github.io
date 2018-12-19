//reference all the DOM elements, grab the element IDs from HTML
var $newGameBtn = document.getElementById('start-button');
var $placeholders = document.getElementById('placeholders');
var $wins = document.getElementById('wins');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');

//create array of words (characters)
var characters = [
    "link",
    "mario",
    "pikachu",
    "fox", 
    "samus", 
    "yoshi", 
    "donkey kong",
    "kirby",
    "luigi",
    "jigglypuff",
    "princess zelda",
    "marth",
    "captain falcon",
    "bowser",
    "ness",
    "princess peach"
];

//create variables needed
var wins = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetters = [];
var wrongLetters = [];

//start a new game
function newGame() {
    //to start and stop game
    gameRunning = true;
    guessesLeft = 8;
    guessedLetters = [];
    wrongLetters = [];
    pickedWordPlaceholderArr = [];

    //pick a new word randomly
    pickedWord = characters[Math.floor(Math.random() * characters.length)];

    //for loop to fill word with underscores or spaces
    for(var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }

    //Write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = wrongLetters;
}

//action for when the user guesses a letter
function letterGuess(letter) {
    console.log(letter);

    //if the game is being played, and a letter is guessed, push the letter
    if (gameRunning === true && guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);

        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);
    } 
    else {
        if (!gameRunning) {
            alert("The game isn't running, click on 'Let's A Go' button to a new game!");
        } else {
            alert("You already guessed this letter, try a new one!");
        }
    }
}

//Checking to see when the uswer types an incorrect letter
function checkIncorrect(letter) {
    //check for both upper and lower case in case
    //if the letter is in the array - conditions set to if it is NOT in the array
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && 
    pickedWordPlaceholderArr.indexOf(letter.toUpperCase())=== -1) {
        //minus a guess, push the wrong letter to "guessed Letters" and display the letter on the site
        guessesLeft--;
        wrongLetters.push(letter);
        $guessedLetters.textContent = wrongLetters.join(' ');
        $guessesLeft.textContent = guessesLeft;
    }
    //add a function to see if you've lost the game after the incorrect guess
    checkLoss();
}

//lose condition - if your incorrect loss means your guesses are at 0
function checkLoss() {
   if (guessesLeft === 0) {
       //stop running the current game
       gameRunning = false;
       //alert with final score. When the user says "OK", the wins reset to 0.
       var youLose = confirm('Sorry, you lose!' + ' Score: ' + wins); {
           if (youLose === true) {
               wins = 0;
               $wins.textContent = wins;
           }
       }
   }
   //add a function to see if you've won the game - not sure where to put it, but this worked!
   checkWin();
   bigWinner();
   moreWinner();
}

//win condition - if your correct guess fills up the word
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) {
      //add a + in the integer for wins
      //write the win on the site
      wins++;
      $wins.textContent = wins;
      //run a new game (automatically go to the next word without having to push the button)
      newGame();  
    }
}

//fun alerts when hitting a certain score
function bigWinner() {
    if (wins === 15) {
        alert("Whoa buddy - You got 15 - that's a lotta wins! Way to go!"); {    
        }
    }
}
function moreWinner() {
    if (wins === 25) {
        alert("20 Wins! You're a SMASH wizard!"); {    
        }
    }
}

//action to play audio when button is pushed
function play(){
    var audio = document.getElementById("audio");
    audio.play();
}

//add event when user clicks the button, a new game starts!
$newGameBtn.addEventListener('click', newGame);

//when user presses a key (the action happens when the key is up), the event happens.
document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}