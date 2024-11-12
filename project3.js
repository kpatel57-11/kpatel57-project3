// project3.js (Main Game Logic)
let game = new BaseballGame();  // Create an instance of BaseballGame class
let currentGuess = [];

// Function to update the displayed secret key and clear previous guesses
function startNewGame() {
    game.resetGame();
    // Add commas between the digits of the secret key
    document.getElementById("key").textContent = `Secret Key: ${game.getSecretKey().split('').join(', ')}`;
    document.getElementById("guess").textContent = '';
    document.getElementById("tbody-stat").innerHTML = '';
    currentGuess = [];

    // Re-enable all digit buttons for the new game
    document.querySelectorAll('.digit').forEach(button => {
        button.disabled = false;  // Enable the button
    });
}

// Function to disable all digit buttons
function disableAllButtons() {
    document.querySelectorAll('.digit').forEach(button => {
        button.disabled = true;  // Disable each digit button
    });
}

// Event listeners for digit buttons
document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', () => {
        if (currentGuess.length < 3) {
            currentGuess.push(Number(button.textContent));
            // Disable the button after it is pressed to prevent re-selection
            button.disabled = true;

            // Display the guess with spaces between digits
            document.getElementById("guess").textContent = currentGuess.join(' ');  // Add space between digits

            // Evaluate the guess when it reaches 3 digits
            if (currentGuess.length === 3) {
                const result = game.evaluateGuess(currentGuess);
                const tbody = document.getElementById("tbody-stat");
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${currentGuess.join(' ')}</td>  <!-- Add space here as well -->
                    <td>${result.balls}</td>
                    <td>${result.strikes}</td>
                `;
                tbody.appendChild(row);

                // Check if the guess matches the secret key (3 strikes and 0 balls)
                if (result.balls === 0 && result.strikes === 3) {
                    // Disable all digit buttons when strikeout condition is met
                    disableAllButtons();
                    // First update the table and then show the alert
                    alert(`Strike Out! The key was: ${game.getSecretKey().split('').join(', ')}. Click 'New' to play again.`);
                } else {
                    // If not correct, clear the guess and wait for the next input
                    currentGuess = [];
                    document.getElementById("guess").textContent = '';
                    // Re-enable all digit buttons after guess evaluation
                    document.querySelectorAll('.digit').forEach(button => {
                        button.disabled = false;  // Enable all buttons again
                    });
                }
            }
        }
    });
});

// Event listener for "New" button to start a new game
document.getElementById('new').addEventListener('click', startNewGame);

// Start the game on load
startNewGame();
