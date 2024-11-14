// Retrieve user data from localStorage
const userName = localStorage.getItem("userName");
const userCompany = localStorage.getItem("userCompany");

let randomNumber;
let attempts = 0;

function startGame() {
    randomNumber = String(Math.floor(Math.random() * 9000) + 1000); // Generates a 4-digit number
    attempts = 0;

    // Display personalized greeting
    document.getElementById('greeting').textContent = `Hello, ${userName || "Player"} from ${userCompany || "your company"}!`;

    // Reset game elements
    document.getElementById('result').textContent = '';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessHistory').innerHTML = '';
}

const guessButton = document.getElementById('guessButton');
const guessInput = document.getElementById('guessInput');
const resultDisplay = document.getElementById('result');
const guessHistory = document.getElementById('guessHistory');
const restartButton = document.getElementById('restartButton');

function processGuess() {
    const userGuess = String(guessInput.value);
    attempts++;

    if (userGuess.length !== 4) {
        resultDisplay.textContent = 'Please enter a 4-digit number.';
        return;
    }

    let resultArray = Array(4).fill('❌');
    let correctPositions = 0;

    // Check for correct positions
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === randomNumber[i]) {
            resultArray[i] = '✅';
            correctPositions++;
        }
    }

    // Check for correct digits in wrong positions
    for (let i = 0; i < 4; i++) {
        if (resultArray[i] === '❌' && randomNumber.includes(userGuess[i])) {
            resultArray[i] = '🟡';
        }
    }

    guessHistory.innerHTML += `<p>Attempt ${attempts}: ${userGuess} - ${resultArray.join('')}</p>`;

    if (correctPositions === 4) {
        resultDisplay.textContent = `Congratulations, ${userName || "Player"}! You guessed it in ${attempts} attempts!`;
        guessButton.disabled = true;
        restartButton.style.display = 'block';
    }

    guessInput.value = '';
}

guessButton.addEventListener('click', processGuess);
guessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processGuess();
    }
});
restartButton.addEventListener('click', startGame);

startGame();  // Start the game when the page loads
