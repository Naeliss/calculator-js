let total = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value){
    if (isNaN(value)){
        processSymbol(value);
    }
    else{
        processNumber(value);
    }
    screen.innerText = buffer;
}

function processNumber(num){
    if (buffer === "0"){
        buffer = num;
    }
    else if (buffer.length < 10){
        buffer += num;
    }
    else{
        return;
    }
}

function processSymbol(symbol){
    switch(symbol){
        case "R":
            if (buffer.length === 1){
                buffer = "0";
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "C":
            buffer = "0";
            break;
        case "=":
            if (previousOperator === null){
                return;
            }
            mathOperation(parseInt(buffer));
            previousOperator = null;
            if (total.toString().length > 10){
                buffer = total.toString().substring(0, 10);
                alert("The result is truncated, it may not be accurate. Sorry for the inconvenience!");
            }
            else{
                buffer = total;
                total = 0;
            }
            break;
        case "+":
        case "-":
        case "x":
        case "/":
            processMath(symbol);
            break;
    }
}

function processMath(symbol){
    if(buffer === "0"){
        return;
    }
    const bufferInt = parseInt(buffer);
    if (total === 0){
        total = bufferInt;
    }
    else{
        mathOperation(bufferInt);
    }
    previousOperator = symbol;
    buffer = "0";
}

function mathOperation(bufferInt){
    switch(previousOperator){
        case "+":
            total += bufferInt;
            break;
        case "-":
            total -= bufferInt;
            break;
        case "x":
            total *= bufferInt;
            break;
        case "/":
            total /= bufferInt;
            break;
    }
}

function _init(){
    document.querySelector(".buttons").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    });
}

_init();