const HangmanImage = document.querySelector(".Hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModel = document.querySelector(".Game-model");
const PlayAgainBtn = gameModel.querySelector(".play-again");



let currentWord,correctLetters=[], wrongGuessCount;
const maxGuesses =  6;
const resetGame = () =>{
  //Reseting all game variables  and UI elements
  correctLetters = [];
  wrongGuessCount=0;
  HangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  gameModel.classList.remove("show");

}
const getRandomWord = () => {
    //Selecting a random word and hint from the wordlist
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
  wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
    
};



const gameOver = (isVictory) => {
  //After 600ms of agme complete...shwoing modal with relevant deatils
setTimeout(() => {
  const modalText = isVictory ? `You found the word: ` : `The correct word was: `;
  gameModel.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
  gameModel.querySelector("h4").innerHTML = `${ isVictory ? "Congrates Brudda!!" : "Game Over!"}`;
  gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
  gameModel.classList.add("show");
}, 300);
};

const initGame = (button, clickedLetter) => {
  // Checking if clickedLetter is exist on the currentWord
  if (currentWord.includes(clickedLetter)) {
    // Showing all correct letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);

        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    //If clicked letter doesn't exsit then update the wrongGuessCount and hangman image
    wrongGuessCount++;
    HangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  //  Calling gameOver function if any of these condition meets
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

//Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerHTML = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}




getRandomWord();

PlayAgainBtn.addEventListener("click", getRandomWord);