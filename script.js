const numberButtons = document.querySelectorAll('#number');
const operatorButtons = document.querySelectorAll('#operator');
const decimalButton = document.querySelector('#decimal');
const clearButton = document.querySelector('.clear');
const display = document.querySelector('.display');
const calculateButton = document.querySelector('.calculate');
const historyContainer = document.querySelector('.solutions');
let dispValue;

// The next 5 event listeners add functions for when each of the different types of buttons are pressed.
numberButtons.forEach((button) => {
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

numberButtons.forEach((button) => {
    window.addEventListener(('keyup'), (e) => {
        if(e.key === button.className) {
            if(!dispValue) {
                dispValue = button.className;
                display.textContent = dispValue;
            } else {
                dispValue += button.className;
                display.textContent = dispValue;
            }
        }
    })
});

operatorButtons.forEach((button) => {
    button.addEventListener(('click'), () => {
        if(!dispValue) {
            dispValue = display.textContent;
            dispValue += button.className;
            display.textContent = dispValue;
        } else {
            dispValue += button.className;
            display.textContent = dispValue;
        }
    })
});

operatorButtons.forEach((button) => {
    window.addEventListener(('keyup'), (e) => {
        if(e.key === button.className) {
            if(!dispValue) {
                dispValue = display.textContent;
                dispValue += button.className;
                display.textContent = dispValue;
            } else {
                dispValue += button.className;
                display.textContent = dispValue;
            }
        }
    })
});

decimalButton.addEventListener(('click'), () => {
    if((dispValue.search(/[.]/g) === -1)) {
        if(!dispValue) {
            dispValue = display.textContent;
            dispValue += '.';
            display.textContent = dispValue;
        } else {
            dispValue += '.';
            display.textContent = dispValue;
        } 
    }
});

clearButton.addEventListener('click', () => {
    dispValue = "";
    display.textContent = dispValue;
});

window.addEventListener('keyup', (e) => {
    if (e.key === "c") {
        dispValue = "";
        display.textContent = dispValue;
    }
});

calculateButton.addEventListener('click', () => {
    dispValue += "=";
    const numbers = getDigitArr(arrayString(dispValue));
    const operators = getOperatorArr(arrayString(dispValue));
    display.textContent = calcTime(numbers, operators);
    const history = document.createElement('p');
    history.textContent = (dispValue + " " + display.textContent)
    historyContainer.appendChild(history);
    dispValue = "";
})

window.addEventListener('keyup', (e) => {
    if(e.key === "Enter") {
        dispValue += "=";
        const numbers = getDigitArr(arrayString(dispValue));
        const operators = getOperatorArr(arrayString(dispValue));
        display.textContent = calcTime(numbers, operators);
        const history = document.createElement('p');
        history.textContent = (dispValue + " " + display.textContent)
        historyContainer.appendChild(history);
        dispValue = "";
    }
})

// A function that takes an array of numbers, and an array of operators, and combines them. Using reduce() again to combine number array 
//  element 0 with element 1 using operator array element 0. etc
function calcTime(numberArr, operatorArr) {
    let i = 0;
    let calcResult = numberArr.reduce((first, second) => {
        let retVal = operate(first, second, operatorArr[i]);
        i++
        return retVal;
    });
    return calcResult;
}

// A function that uses .reduce() (array.reduce(rfunc, [])) to check if each
//  element is a number, and if it is add it to a variable. Then, when if eventually
//  finds an operator, add that variable to an array. Creating an array of full numbers e.g. 23, 45 (from [2,3,+,4,5]) instead of 2, 3, 4, 5
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

// split up a string into an array
function arrayString(string) {
    return string.split('');
}

function add(number1, number2) {
    return (+number1 + +number2);
}

function subtract(number1, number2) {
    return (number1 - number2);
}

function multiply(number1, number2) {
    return (number1 * number2);
}

function divide(number1, number2) {
    if(number2 === "0"){
        return "IMPOSSIBLE!"
    } else {
        return (number1 / number2);
    }
}

// This function takes two numbers and does an operation on them based on the operator provided
function operate(number1, number2, operator) {
    let answer;
    let check;
    switch(operator) {
        case '+':
            answer = add(number1, number2);
            check = answer.toString();
            if (check.length >= 10) {
                return answer.toFixed(8);
            } else {
                return answer;
            }
            break;
        case '-':
            answer = subtract(number1, number2);
            check = answer.toString();
            if (check.length >= 10) {
                return answer.toFixed(8);
            } else {
                return answer;
            }
            break;
        case '*':
            answer = multiply(number1, number2);
            check = answer.toString();
            if (check.length >= 10) {
                return answer.toFixed(8);
            } else {
                return answer;
            }
            break;
        case '/':
            answer = divide(number1, number2);
            check = answer.toString();
            if (check.length >= 10) {
                return answer.toFixed(8);
            } else {
                return answer;
            }
            break;
    }
}