const keys = document.querySelectorAll('.key');
const displayLower = document.querySelector('.display .lower');
const displayUpper = document.querySelector('.display .upper');
const clearBtn = document.querySelector('#clear');
const CEBtn = document.querySelector('#ce');
const deleteBtn = document.querySelector('#delete');
const equalBtn = document.querySelector('#equal');
let outputBool = false;
let operationBool = false;

// Keyboard support
document.addEventListener('keydown', (e) => {
    keys.forEach((key) => {
        if (key.textContent === e.key || e.key === '*' && key.textContent === 'x' || e.key === '/' && key.textContent === '÷') {
            key.click();
        }
    });
    if (e.key === 'Enter') {
        equalBtn.click();
    } else if (e.key === 'Backspace') {
        deleteBtn.click();
    } else if (e.key === 'Delete') {
        clearBtn.click();
    }
}, false);

clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteLast);
CEBtn.addEventListener('click', CE);

keys.forEach((key) => {
    key.addEventListener('click', () => {
        if (key.classList.contains('light-red')){
            return;
        }
        else if (key.id === 'equal' || (key.classList.contains('operation') && operationBool)) {
            outputBool = true;
            const currentOperation = key.textContent;
            if (displayLower.textContent === '') {
                displayUpper.textContent = displayUpper.textContent.slice(0, -1) + currentOperation;
                return;
            }
            const firstInput = parseFloat(displayUpper.textContent.slice(0, -1));
            const secondInput = parseFloat(displayLower.textContent);

            if (displayLower.textContent.includes('√')) {
                const number = displayLower.textContent.slice(1);
                if (number) {
                    displayLower.textContent = Math.sqrt(parseFloat(number));
                    displayUpper.textContent = '';
                } else {
                    displayLower.textContent = 'Syntax Error';
                }
                return;
            } else if (displayUpper.textContent.includes('+')) {
                displayLower.textContent = addition(firstInput, secondInput);
            }
            else if (displayUpper.textContent.includes('-')) {
                displayLower.textContent = subtraction(firstInput, secondInput);
            }
            else if (displayUpper.textContent.includes('x')) {
                displayLower.textContent = multiplication(firstInput, secondInput);
            }
            else if (displayUpper.textContent.includes('÷')) {
                displayLower.textContent = division(firstInput, secondInput);
            }
            else if (displayUpper.textContent.includes('%')) {
                displayLower.textContent = modulo(firstInput, secondInput);
            }
            displayUpper.textContent = '';
            if (key.textContent === '='){
                operationBool = false
            }
            if (operationBool){
                displayUpper.textContent = displayLower.textContent + key.textContent;
                displayLower.textContent = '';
            }
        }
        else if (key.id === 'negate'){
            if (displayLower.textContent.includes('-')) {
                displayLower.textContent = displayLower.textContent.slice(1);
            }
            else{
                displayLower.textContent = '-' + displayLower.textContent;
            }
        } else if (key.id === 'sqr'){
            outputBool = true;
            displayLower.textContent = Math.pow(parseFloat(displayLower.textContent), 2);
        }
        else {
            if (outputBool && !key.classList.contains('operation')) {
                displayLower.textContent = '';
                outputBool = false;
            }
            if (displayLower.textContent.includes('.')){
                if (key.textContent === '.'){
                    return;
                }
            }
            if (displayLower.textContent !== '' || displayLower.textContent.includes('√')){
                if (key.textContent === '√'){
                    return;
                }
            }
            displayLower.textContent += key.textContent;
            if (key.classList.contains('operation')) {
                operationBool = true;
                displayUpper.textContent = displayLower.textContent;
                displayLower.textContent = '';
            }
        }
    });
});

function clear() {
    displayLower.textContent = '';
    displayUpper.textContent = '';
}

function CE() {
    if (displayLower.textContent === ''){
        displayUpper.textContent = '';
    }
    displayLower.textContent = '';
}

function deleteLast() {
    displayLower.textContent = displayLower.textContent.slice(0, -1);
}

function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0){
        return "I miss her";
    }
    return a / b;
}

function modulo(a, b) {
    return a % b;
}