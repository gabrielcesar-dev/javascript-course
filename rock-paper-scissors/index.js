const playerOption = document.querySelector(".player-option");
const computerOption = document.querySelector(".computer-option");
const playerResult = document.querySelector(".player-score");
const computerResult = document.querySelector(".computer-score");
const resultDisplay = document.querySelector(".result-display");
const buttons = document.querySelectorAll("button");

const actions = ["rock", "paper", "scissors"];

let player = 0;
let computer = 0;

const results = ["You Win!", "You Lose!", "It's a Draw!"];

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const playerChoice = event.target.getAttribute("title");
        const computerChoice = actions[Math.floor(Math.random() * actions.length)];

        resultDisplay.classList.remove("win", "lose");
        playerResult.classList.remove("win", "lose");
        computerResult.classList.remove("win", "lose");
        playerOption.classList.remove("win", "lose");
        computerOption.classList.remove("win", "lose");
        
        if(playerChoice === computerChoice) resultDisplay.textContent = results[2];

        else if ((playerChoice === actions[0] && computerChoice === actions[2]) || 
                 (playerChoice === actions[1] && computerChoice === actions[0]) ||
                 (playerChoice === actions[2] && computerChoice === actions[1])) {
                player++;
                playerResult.textContent = player;
                resultDisplay.textContent = results[0];
                resultDisplay.classList.add("win");
                playerResult.classList.add("win");
                computerResult.classList.add("lose");
                playerOption.classList.add("win");
                computerOption.classList.add("lose");
            }

        else {
            computer++;
            computerResult.textContent = computer;
            resultDisplay.textContent = results[1];
            resultDisplay.classList.add("lose");
            computerResult.classList.add("win");
            playerResult.classList.add("lose");
            playerOption.classList.add("lose");
            computerOption.classList.add("win");
        }
        
        playerOption.textContent = playerChoice;
        computerOption.textContent = computerChoice;
    });
});

