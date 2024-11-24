let randomNumber;
let attempts = 0;
let playerName;

function startGame() {
    playerName = localStorage.getItem("userName");
    let userCompany = localStorage.getItem("userCompany");

    if (playerName && userCompany) {
        document.getElementById('greeting').textContent = `Time for a little break.`;
    } else {
        document.getElementById('greeting').textContent = 'Time for a little break.';
    }

    randomNumber = String(Math.floor(Math.random() * 9000) + 1000);
    attempts = 0;
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

    // First pass: Check for correct digits in the correct positions
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === randomNumber[i]) {
            resultArray[i] = '✅';
            correctPositions++;
            checkedIndices.push(i);  // Mark this index as checked
        }
    }

    // Second pass: Check for correct digits in wrong positions, without repeating counts for same digit
    for (let i = 0; i < 4; i++) {
        if (resultArray[i] === '❌' && randomNumber.includes(userGuess[i])) {
            let wrongPosIndex = randomNumber.indexOf(userGuess[i]);

            // Find an available matching digit not already marked
            while (checkedIndices.includes(wrongPosIndex) && wrongPosIndex !== -1) {
                wrongPosIndex = randomNumber.indexOf(userGuess[i], wrongPosIndex + 1);
            }

            // Only mark as correct digit in wrong position if a new position is found
            if (wrongPosIndex !== -1 && !checkedIndices.includes(wrongPosIndex)) {
                resultArray[i] = '🟡';
                checkedIndices.push(wrongPosIndex);
            }
        }
    }

    // Display results
    const resultString = resultArray.join('');
    guessHistory.innerHTML += `<p>Attempt ${attempts}: ${userGuess} - ${resultString}</p>`;

    if (correctPositions === 4) {
        resultDisplay.textContent = `Congratulations, ${playerName}! You guessed it in ${attempts} attempts!`;
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

startGame();
