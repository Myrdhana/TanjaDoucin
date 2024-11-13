let randomNumber;
let attempts = 0;
let playerName;

function startGame() {
    playerName = prompt("Welcome! What is your name?");
    randomNumber = String(Math.floor(Math.random() * 9000) + 1000); // Generates a 4-digit number
    attempts = 0;
    document.getElementById('greeting').textContent = `Hello, ${playerName}!`;
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

    let result = '';
    let correctPositions = 0;
    const checkedRandomIndices = new Array(4).fill(false);

    // First pass: Check for correct digits in the correct positions
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === randomNumber[i]) {
            result += '✅'; // Green checkmark for correct position
            correctPositions++;
            checkedRandomIndices[i] = true;
        } else {
            result += '❌'; // Red cross for incorrect position, initially set
        }
    }

    // Second pass: Check for correct digits in the wrong positions
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] !== randomNumber[i]) { // Ignore already matched positions
            for (let j = 0; j < 4; j++) {
                if (!checkedRandomIndices[j] && userGuess[i] === randomNumber[j]) {
                    result = result.substr(0, i) + '🟡' + result.substr(i + 1); // Orange circle for wrong position
                    checkedRandomIndices[j] = true;
                    break;
                }
            }
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

// Event listeners
guessButton.addEventListener('click', processGuess);
guessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processGuess();
    }
});
restartButton.addEventListener('click', startGame);

startGame(); // Start the game when the page loads
