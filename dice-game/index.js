function rollDice(){
    const numberOfDice = document.getElementById("numberOfDice").value;
    const diceImg = document.getElementById("diceImg");
    let images = [];

    for(let i = 0; i < numberOfDice; ++i){
        const value = Math.floor(Math.random() * 6 + 1);
        images.push(`<img src="imgs/${value}.jpg" alt="dice ${value}">`);
    }

    diceImg.innerHTML = images.join("");
}