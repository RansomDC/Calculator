const inputButtons = document.querySelectorAll('#input');
const clearButton = document.querySelector('.clear');
const display = document.querySelector('.display');
let dispValue;


// Add the buttons' class name (e.g. "1") to the display when clicked (Does not work for 
//  "C" or "calculate")
inputButtons.forEach((button) => {
    button.addEventListener(('click'), () => {
        if(!dispValue) {
            dispValue = button.className;
            display.textContent = dispValue;
        } else {
            dispValue += button.className;
            display.textContent = dispValue;
        }
    })
});


// Some test strings
let testString1 = "2+3+4+5="; //14
let testString2 = "23+45+67="; //135
let testString3 = "234+567+8910=" //9711

const testArray1 = arrayString(testString3);




// A function that uses .reduce() (array.reduce(rfunc, [])) to check if each
//  element is a number, and if it is add it to a variable. Then, when if eventually
//  finds an operator, add that variable to an array. Creating an array of full numbers e.g. 23, 45 instead of 2, 3, 4, 5
function getDigitArr(dispArr) {
    let combiner = "";
    const digits = dispArr.reduce((first, second) => {
        if (second === "+" || second === "-" || second === "*" || second === "/"|| second === "=") {
            first.push(combiner);
            combiner = "";
            return first;
        } else {
            combiner += second;
            return first;
        }
    }, [])
    return digits;
}

// A function to search an array for +, -, *, or / and then put them in an array.
function getOperatorArr(dispArr) {
    const operators = dispArr.reduce((first, second) => {
        if (second === "+" || second === "-" || second === "*" || second === "/") {
            first.push(second);
            return first;
        } else {
            return first;
        }
    }, [])
    return operators;
}





function arrayString(string) {
    return string.split('');
}



clearButton.addEventListener('click', () => {
    dispValue = "";
    display.textContent = dispValue;
});

function add(number1, number2) {
    return (number1 + number2);
}

function subtract(number1, number2) {
    return (number1 - number2);
}

function multiply(number1, number2) {
    return (number1 * number2);
}

function divide(number1, number2) {
    return (number1 / number2);
}

function operate(number1, number2, operator) {
    switch(operator) {
        case '+':
            return add(number1, number2);
            break;
        case '-':
            return subtract(number1, number2);
            break;
        case '*':
            return multiply(number1, number2);
            break;
        case '/':
            return divide(number1, number2);
            break;
    }
}