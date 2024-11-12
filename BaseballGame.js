class BaseballGame {
    constructor() {
        this.secretKey = [];
        this.generateSecretKey();
    }

    // Generate a random 3-digit number with unique digits
    generateSecretKey() {
        this.secretKey = [];
        while (this.secretKey.length < 3) {
            const digit = Math.floor(Math.random() * 10);
            if (!this.secretKey.includes(digit)) {
                this.secretKey.push(digit);
            }
        }
    }

    // Evaluate the user's guess and return the number of balls and strikes
    evaluateGuess(guess) {
        let balls = 0;
        let strikes = 0;

        guess.forEach((digit, index) => {
            if (digit === this.secretKey[index]) {
                strikes++;
            } else if (this.secretKey.includes(digit)) {
                balls++;
            }
        });

        return { balls, strikes };
    }

    // Reset the game with a new secret key
    resetGame() {
        this.generateSecretKey();
    }

    // Get the current secret key (for display)
    getSecretKey() {
        return this.secretKey.join('');
    }
}
