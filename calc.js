let listOfInputs = [];
let numberString = '';
addEventToOperators();

for (x = 0; x <= 9; x++) {
    addEventToNumbers(x);
}

function addEventToNumbers(val) {
    const numberBtn = document.getElementById(`btn${val}`);
    numberBtn.addEventListener('click', () => {
        const numberValue = numberBtn.value;
        numberString += numberValue;
        renderScreen(numberValue);
    });
}


function addEventToOperators() {
    const addBtn = document.getElementById('add');
    const subBtn = document.getElementById('minus');
    const divBtn = document.getElementById('division');
    const mulBtn = document.getElementById('multiply');
    const equalBtn = document.getElementById('equal');
    const resetBtn = document.getElementById('reset');

    addBtn.addEventListener('click', () => {
        calcInsights(addBtn);
    });
    subBtn.addEventListener('click', () => {
        calcInsights(subBtn);
    });
    divBtn.addEventListener('click', () => {
        calcInsights(divBtn);
    });
    mulBtn.addEventListener('click', () => {
        calcInsights(mulBtn);
    });
    equalBtn.addEventListener('click', () => {
        calcInsights(equalBtn);
        if (listOfInputs.length > 0) {
            let result = calculate()
            if(!isNaN(result)){
                renderScreen(result);
                renderHistory(`${listOfInputs.join(' ')} ${result}`);
            }
            clearAll();
            setTimeout(renderScreen, 2000);
        }
    });
    resetBtn.addEventListener('click', () => {
        clearAll();
        renderScreen();
    });
}


function clearAll() {
    listOfInputs = [];
    numberString = '';
}

function calcInsights(element) {
    if (numberString != "") {
        addToHistory(Number.parseInt(numberString)); //adds the number
    }

    if (listOfInputs.length > 0) {
        addToHistory(element.value) //adds the operator
        renderScreen(element.value);
    } else {
        alert("Please enter a number first!");
    }
    numberString = '';
}


function addToHistory(val) {
    listOfInputs.push(val);
}



function renderScreen(val = 'erase') {
    let screen = document.getElementById('screen');

    if (isNaN(val)) {
        if (val == 'erase') {
            screen.textContent = '';
        } else {
            screen.textContent += ` ${val} `;
        }
    } else {
        screen.textContent += `${val}`;
    }
}


function renderHistory(operation) {

    const historyList = document.querySelector('#historyList');
    const newEntry = document.createElement('li');
    const deleteAllBtn = document.querySelector('#deleteAll');

    deleteAllBtn.addEventListener('click', () => {
        deleteHistory(historyList.lastElementChild);
        historyList.style = 'display:none';
    });

    historyList.style = 'display:block';

    newEntry.innerHTML = `<li class = 'history-li'>
    ${operation}
    <span class= 'closeBtn'>
    <button class='close'>x</button></span>
    </li>`;

    const closeBtnOfEntry = newEntry.querySelector('.close');
    closeBtnOfEntry.addEventListener('click', deleteEntry.bind(null, newEntry));
    historyList.lastElementChild.appendChild(newEntry)
}


function deleteHistory(listOfEntries) {
    while (listOfEntries.lastElementChild) {
        listOfEntries.removeChild(listOfEntries.lastElementChild);
    }
}


function deleteEntry(entry) {
    const historyList = document.getElementById('historyList');
    historyList.lastElementChild.removeChild(entry);

    //historyList = div -- lastElementChild = ul -- lastElementChild = li
    if (!(historyList.lastElementChild.lastElementChild)) {
        historyList.style = 'display:none';
    }
}



function calculate() {
    let result = 0;
    const pattern = /^\d{1,}\s{1}[+-/X]\s[+-/X]/;
    if (pattern.test(listOfInputs.join(' ').toString())) {
        result = 'error';
        clearAll();
        renderScreen();
        alert(`That's not a valid format!!`);
    } else {
        for (let i = 0; i < listOfInputs.length; i++) {
            if (i <= 1) {
                if (isNaN(listOfInputs[i])) {
                    let operator = listOfInputs[i];
                    switch (operator) {
                        case '+':
                            result += listOfInputs[i - 1] + listOfInputs[i + 1];
                            break;
                        case '-':
                            result += listOfInputs[i - 1] - listOfInputs[i + 1];
                            break;
                        case '/':
                            result += listOfInputs[i - 1] / listOfInputs[i + 1];
                            break;
                        case 'X':
                            result += listOfInputs[i - 1] * listOfInputs[i + 1]
                            break;
                        default:
                            break;
                    }
                }
            } else {
                if (isNaN(listOfInputs[i])) {
                    let operator = listOfInputs[i];
                    switch (operator) {
                        case '+':
                            result += listOfInputs[i + 1];
                            break;
                        case '-':
                            result -= listOfInputs[i + 1];
                            break;
                        case '/':
                            result = result / listOfInputs[i + 1];
                            break;
                        case 'X':
                            result *= listOfInputs[i + 1]
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        if (result.toString().includes('.')) {
            result = result.toFixed(2);
        }
    }

    return result;
}
