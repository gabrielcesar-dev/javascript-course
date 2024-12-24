const VALID_OPERATORS = '+-*/.';
const VALID_NUMBERS = '0123456789';
const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display');

let expression = "";   
let dotFlag = true;    

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === "C") {
            clearDisplay();
        } else if (value === "=") {
            evaluateExpression();
        } else if (VALID_OPERATORS.includes(value)) {
            handleOperator(value);
        } else if (VALID_NUMBERS.includes(value)) {
            handleNumber(value);
        }
    });
});

function clearDisplay() {
    expression = "";
    display.value = "";
    dotFlag = true;
}

function evaluateExpression() {
    if (VALID_OPERATORS.includes(expression.slice(-1))) {
        expression = expression.slice(0, -1); 
    }

    try {
        const result = new Function('return ' + expression)();  
        expression = result.toString();
        display.value = expression;
        dotFlag = !expression.includes('.'); 
    } catch (error) {
        display.value = "Error";
        expression = ""; 
    }
}

function handleOperator(operator) {
    if (VALID_OPERATORS.includes(expression.slice(-1))) return;

    if (operator === ".") {
        if (!dotFlag || !expression) return;  
        dotFlag = false;
    } else {
        dotFlag = true;
    }

    expression += operator;
    display.value = expression;
}

function handleNumber(number) {
    expression += number;
    display.value = expression;
}
