document.addEventListener("DOMContentLoaded", function () {
    const dailyWord = getDailyWord();
    let guesses = [];
    const maxGuesses = 6;
    const wordLength = 4;

    // Generate the daily word
    function getDailyWord() {
        const words = ["code", "game", "play", "test"]; // Use 4-letter words
        const date = new Date();
        const index = date.getDate() % words.length; // Date-seeded word selection
        return words[index];
    }

    // Check the user's guess against the daily word
    function checkGuess(guess) {
        const feedback = Array(wordLength).fill("incorrect");
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === dailyWord[i]) {
                feedback[i] = "correct";
            } else if (dailyWord.includes(guess[i])) {
                feedback[i] = "partial";
            }
        }
        return feedback;
    }

    // Render the game grid
    function renderGame() {
        const gameContainer = document.getElementById("puddle-game-container");
        gameContainer.innerHTML = guesses
            .map((guess) => {
                const feedback = checkGuess(guess);
                return `
                    <div class="guess-row">
                        ${guess
                            .split("")
                            .map(
                                (char, index) =>
                                    `<span class="letter ${feedback[index]}">${char}</span>`
                            )
                            .join("")}
                    </div>`;
            })
            .join("");
        updateKeyboard();
    }

    // Update the keyboard to reflect guessed letters
    function updateKeyboard() {
        const keys = document.querySelectorAll("#puddle-keyboard .key");
        keys.forEach((keyElement) => {
            const key = keyElement.dataset.key.toLowerCase();
            if (guesses.some((guess) => guess.includes(key))) {
                if (dailyWord.includes(key)) {
                    keyElement.classList.add("correct");
                } else {
                    keyElement.classList.add("incorrect");
                }
            }
        });
    }

    // Handle input from the virtual keyboard
    function setupKeyboard() {
        const keyboardContainer = document.getElementById("puddle-keyboard");
        const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        keyboardContainer.innerHTML = keys
            .map(
                (key) =>
                    `<button class="key" data-key="${key}">${key}</button>`
            )
            .join("");

        // Add the backspace button
        keyboardContainer.innerHTML += `<button class="key" data-key="backspace">Backspace</button>`;
    }

    // Handle keyboard and submit button logic
    let currentGuess = "";

    document.getElementById("guess-submit").addEventListener("click", function () {
        const alertBox = document.getElementById("alert-box");
        const alertMessage = document.getElementById("alert-message");

        if (currentGuess.length !== wordLength) {
            alertBox.style.display = "block";
            alertMessage.textContent = `Word must be ${wordLength} letters long.`;
            setTimeout(() => (alertBox.style.display = "none"), 3000);
            return;
        }

        guesses.push(currentGuess);
        renderGame();

        if (currentGuess === dailyWord) {
            alertBox.style.display = "block";
            alertMessage.textContent = "Congratulations! You guessed the word.";
        } else if (guesses.length >= maxGuesses) {
            alertBox.style.display = "block";
            alertMessage.textContent = `Out of guesses! The word was ${dailyWord.toUpperCase()}.`;
        }

        currentGuess = "";
        updateInputDisplay();
    });

    document.getElementById("puddle-keyboard").addEventListener("click", function (e) {
        if (e.target.classList.contains("key")) {
            const key = e.target.dataset.key.toLowerCase();
            handleKeyInput(key);
        }
    });

    function handleKeyInput(key) {
        if (key === "backspace") {
            currentGuess = currentGuess.slice(0, -1);
        } else if (currentGuess.length < wordLength && /^[a-z]$/i.test(key)) {
            currentGuess += key;
        }
        updateInputDisplay();
    }

    function updateInputDisplay() {
        const inputDisplay = document.getElementById("current-input");
        inputDisplay.textContent = currentGuess.toUpperCase();
    }

    // Initialize game
    setupKeyboard();
    renderGame();
});