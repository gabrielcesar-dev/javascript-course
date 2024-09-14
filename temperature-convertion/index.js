const textBox = document.getElementById("textBox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const result = document.getElementById("result"); 

function convert(){
    if (toCelsius.checked) {
        result.textContent = ((+textBox.value - 32) * (5/9)).toFixed(1) + "℃";
        return;
    }
    else if (toFahrenheit.checked) {
        result.textContent = (+textBox.value * 9 / 5 + 32).toFixed(1) + "℉";
        return;
    }

    result.textContent = "Select a Unit";
}