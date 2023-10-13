const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");



let currentWord, wrongGuessCount = 0;
const maxGuesses =  6;
const getRandomWord = () => {
    //Selecting a random word and hint from the wordlist
    const { word,  hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord=word;
    console.log(word)
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map (() => `<li class="letter"></li>`).join("")

}


const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
       wrongGuessCount++;
        
    }
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
}

//Creating keyboard buttons and adding event listeners
for (let i = 97; i <=122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)))
    
}

getRandomWord(); 