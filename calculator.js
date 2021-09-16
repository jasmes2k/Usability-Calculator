class Calculator {
    constructor(previousDisplay, currentDisplay) {
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
        this.clear();
    }

    clear () {
        this.previousOperand = "";
        this.currentOperand = "";
        this.previousDisplay.innerText = "0";
        this.currentDisplay.innerText = "0";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if ((this.currentOperand === "0" || this.currentOperand === "") && (number === "0")) {
            this.currentOperand = "";
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    appendOperator(operator) {
        if (this.currentOperand === "") {
            this.currentOperand = this.currentDisplay.innerText;
        }
        this.currentOperand = this.currentOperand.toString() + operator.toString();
    }

    compute() {
        if (this.currentOperand === "") {
            this.currentOperand = this.currentDisplay.innerText;
        }
        let escapedString = this.currentOperand.replace("×", "*").replace("÷", "/").replace("−", "-").replace(/[^-\d/*+.]/g, '');
        try {
            this.currentOperand = eval(escapedString);
        } catch(err) {
            this.currentOperand = "undefined";
        }
        this.previousDisplay.innerText = this.currentDisplay.innerText + "=";
        this.currentDisplay.innerText = this.currentOperand;
        this.currentOperand = "";
    }

    updateDisplay() {
        if (!(this.currentOperand === "")) {
            this.currentDisplay.innerText = this.currentOperand;
        } else {
            this.currentDisplay.innerText = "0";
        }
    }

}

const numerals = document.querySelectorAll('[data-numeral]');
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const del = document.querySelector('[data-DEL]');
const ac = document.querySelector('[data-AC]');
const previousDisplay = document.querySelector('[data-previous-display]');
const currentDisplay = document.querySelector('[data-current-display]');

const calculator = new Calculator(previousDisplay, currentDisplay);

numerals.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operators.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendOperator(button.innerText);
        calculator.updateDisplay();
    })
})

ac.addEventListener("click", () => {
    calculator.clear();
})

del.addEventListener("click", () => {
    calculator.delete();
})

equals.addEventListener("click", () => {
    calculator.compute();
})