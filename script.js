const keys = document.querySelectorAll('.key');
const displayLower = document.querySelector('.display .lower');
const displayUpper = document.querySelector('.display .upper');
const clearBtn = document.querySelector('#clear');
const CEBtn = document.querySelector('#ce');
const deleteBtn = document.querySelector('#delete');
const equalBtn = document.querySelector('#equal');

keys.forEach((key) => {
    key.addEventListener('click', () => {
        if (key.classList.contains('light-red')){
            clearBtn.addEventListener('click', clear);
            deleteBtn.addEventListener('click', deleteLast);
            CEBtn.addEventListener('click', CE);
        }
        else if (key.id == 'equal') {
            const firstInput = parseInt(displayUpper.textContent.slice(0, -1));
            const secondInput = parseInt(displayLower.textContent);

            if (displayUpper.textContent.includes('+')) {
                displayLower.textContent = addition(firstInput, secondInput);
                displayUpper.textContent = '';
            }
            else if (displayUpper.textContent.includes('-')) {
                displayLower.textContent = subtraction(firstInput, secondInput);
                displayUpper.textContent = '';
            }
            else if (displayUpper.textContent.includes('*')) {
                displayLower.textContent = multiplication(firstInput, secondInput);
                displayUpper.textContent = '';
            }
            else if (displayUpper.textContent.includes('÷')) {
                displayLower.textContent = division(firstInput, secondInput);
                displayUpper.textContent = '';
            }

        }
        else{
            displayLower.textContent += key.textContent;
            if (key.classList.contains('operation')) {
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
    return a / b;
}