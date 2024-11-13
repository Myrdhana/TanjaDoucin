// Retrieve the user's name from localStorage, if available
let playerName = localStorage.getItem("userName");
let randomNumber;
let attempts;

// Function to start the game
function startGame() {
    // Prompt for the player's name if it's not already saved
    if (!playerName) {
        playerName = prompt("Welcome! What is your name?");
        // Save the name in localStorage for future visits
        if (playerName) {
            localStorage.setItem("userName", playerName);
        } else {
            playerName = "Player";
        }
    }
    
    // Display a personalized greeting
    document.getElementById('greeting').textContent = `Hello, ${playerName}!`;

    // Generate a 4-digit random number and reset attempts
    randomNumber = String(Math.floor(Math.random() * 9000) + 1000);
    attempts = 0;

    // Reset the game display elements
    document.getElementById('result').textContent = '';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessHistory').innerHTML = '';
}

// Interface elements
const guessButton = document.getElementById('guessButton');
const guessInput = document.getElementById('guessInput');
const resultDisplay = document.getElementById('result');
const guessHistory = document.getElementById('guessHistory');
const restartButton = document.getElementById('restartButton');

// Function to process each guess
function processGuess() {
    const userGuess = String(guessInput.value);
    attempts++;

    // Check if the guess is a 4-digit number
    if (userGuess.length !== 4) {
        resultDisplay.textContent = 'Please enter a 4-digit number.';
        return;
    }

    let result = '';
    let correctPositions = 0;
    let checkedIndices = [];

    // Check for correct digits in the correct positions
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === randomNumber[i]) {
            result += '✅'; // Green checkmark for correct position
            correctPositions++;
            checkedIndices.push(i);
        } else {
            result += '❌'; // Red cross for incorrect digit
        }
    }

    // Check for correct digits in the wrong positions
    for (let i = 0; i < 4; i++) {
        if (!checkedIndices.includes(i) && randomNumber.includes(userGuess[i])) {
            result = result.substr(0, i) + '🟡' + result.substr(i + 1); // Orange circle for correct digit in wrong position
        }
    }

    // Display results
    guessHistory.innerHTML += `<p>Attempt ${attempts}: ${userGuess} - ${result}</p>`;
    if (correctPositions === 4) {
        resultDisplay.textContent = `Congratulations, ${playerName}! You guessed it in ${attempts} attempts!`;
        guessButton.disabled = true;
        restartButton.style.display = 'block';
    }

    guessInput.value = '';
}

// Event listener for button click
guessButton.addEventListener('click', processGuess);

// Event listener for Enter key press
guessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processGuess();
    }
});

// Restart button event listener
restartButton.addEventListener('click', startGame);

// Start the game when the page loads
startGame();

