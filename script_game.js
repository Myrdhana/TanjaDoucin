document.addEventListener('DOMContentLoaded', () => {
    let randomNumber;
    let attempts = 0;

    // Function to start/restart the game
    function startGame() {
        randomNumber = String(Math.floor(Math.random() * 9000) + 1000); // Generate random number
        attempts = 0; // Reset attempts
        document.getElementById('result').textContent = ''; // Clear any result message
        document.getElementById('guessButton').disabled = false; // Enable guess button
        document.getElementById('restartButton').style.display = 'none'; // Hide restart button
        document.getElementById('guessInput').value = ''; // Clear input field
        document.getElementById('guessHistory').innerHTML = ''; // Clear guess history
    }

    // Get elements
    const guessButton = document.getElementById('guessButton');
    const guessInput = document.getElementById('guessInput');
    const resultDisplay = document.getElementById('result');
    const guessHistory = document.getElementById('guessHistory');
    const restartButton = document.getElementById('restartButton');

    // Function to process the guess
    function processGuess() {
        const userGuess = guessInput.value.trim(); // Get trimmed input value

        // Check if the input is exactly 4 digits and numeric
        if (userGuess.length !== 4 || isNaN(userGuess) || /[^0-9]/.test(userGuess)) {
            resultDisplay.textContent = 'Please enter a valid 4-digit number.'; // Show error
            return; // Prevent counting invalid guess
        }

        // Increment attempt count only for valid input
        attempts++;

        let resultArray = Array(4).fill('❌');
        let correctPositions = 0;
        let checkedIndices = [];

        // Check for correct digits in the correct positions
        for (let i = 0; i < 4; i++) {
            if (userGuess[i] === randomNumber[i]) {
                resultArray[i] = '✅';
                correctPositions++;
                checkedIndices.push(i); // Mark as checked
            }
        }

        // Check for correct digits in the wrong positions
        for (let i = 0; i < 4; i++) {
            if (resultArray[i] === '❌' && randomNumber.includes(userGuess[i])) {
                let wrongPosIndex = randomNumber.indexOf(userGuess[i]);

                // Avoid double counting the same digit
                while (checkedIndices.includes(wrongPosIndex) && wrongPosIndex !== -1) {
                    wrongPosIndex = randomNumber.indexOf(userGuess[i], wrongPosIndex + 1);
                }

                if (wrongPosIndex !== -1 && !checkedIndices.includes(wrongPosIndex)) {
                    resultArray[i] = '🟡';
                    checkedIndices.push(wrongPosIndex);
                }
            }
        }

        // Display the result for the current guess
        const resultString = resultArray.join('');
        guessHistory.innerHTML += `<p>Attempt ${attempts}: ${userGuess} - ${resultString}</p>`;

        // If the player guesses correctly, disable the guess button and show the restart button
        if (correctPositions === 4) {
            resultDisplay.textContent = `Congratulations! You guessed it in ${attempts} attempts!`;
            guessButton.disabled = true;
            restartButton.style.display = 'block';
        }

        // Clear the input after processing the guess
        guessInput.value = '';
    }

    // Event listener for input to clear the error message when valid input is entered
    guessInput.addEventListener('input', () => {
        const userGuess = guessInput.value.trim();

        // Clear the error message if input is exactly 4 digits and valid
        if (userGuess.length === 4 && !isNaN(userGuess) && /^[0-9]{4}$/.test(userGuess)) {
            resultDisplay.textContent = ''; // Clear the error message
        }
    });

    // Attach event listeners to buttons
    guessButton.addEventListener('click', processGuess); // Process guess on button click
    restartButton.addEventListener('click', startGame); // Restart game on button click

    // Listen for "Enter" key to trigger guess button click
    guessInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission (if inside a form)
            processGuess(); // Trigger the guess processing
        }
    });

    startGame(); // Start the game when the page loads
});
