const min = 1;
const max = 100;
const ans = Math.floor(Math.random() * (max - min + 1) + min);

let attemps = 0;
let guess;

let run = true;
while(run){
    guess = Number(window.prompt(`Guess a number between ${min} and ${max}:`));
    attemps++;
    
    if (isNaN(guess)) {
        window.alert("Type a valid input");
        continue;
    }
    else if (guess < min || guess > max) {
        window.alert(`Type a number between ${min} and ${max}`);
        continue;
    }
    else if (guess < ans) {
        window.alert(`${guess} is too low!`);
        continue;
    }
    else if (guess > ans) {
        window.alert(`${guess} is too high!`);
        continue;
    }

    window.alert(`You are right! attemps: ${attemps}`);
    run = false;
}