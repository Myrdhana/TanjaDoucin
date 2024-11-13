// Retrieve user information from localStorage
let userName = localStorage.getItem("userName");
let userCompany = localStorage.getItem("userCompany");

// Function to set the greeting based on user info
function setGreeting() {
    if (userName && userCompany) {
        document.getElementById('greeting').textContent = `Hello, ${userName} from ${userCompany}!`;
    } else {
        document.getElementById('greeting').textContent = 'Hello!';
    }
}

function startGame() {
    randomNumber = String(Math.floor(Math.random() * 9000) + 1000); // Generates a 4-digit number
    attempts = 0;
    setGreeting();  // Ensure the greeting is set when the game starts
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
    let checkedIndices = [];

    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === randomNumber[i]) {
            resultArray[i] = '✅';
            correctPositions++;
            checkedIndices.push(i);
        }
    }

    for (let i = 0; i < 4; i++) {
        if (resultArray[i] === '❌') {
            const wrongPositionIndex = randomNumber.indexOf(userGuess[i]);
            if (wrongPositionIndex !== -1 && !checkedIndices.includes(wrongPositionIndex)) {
                resultArray[i] = '🟡';
                checkedIndices.push(wrongPositionIndex);
            }
        }
    }

    const resultString = resultArray.join('');
    guessHistory.innerHTML += `<p>Attempt ${attempts}: ${userGuess} - ${resultString}</p>`;

    if (correctPositions === 4) {
        resultDisplay.textContent = `Congratulations, ${userName}! You guessed it in ${attempts} attempts!`;
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

// Start the game when the page loads
startGame();

