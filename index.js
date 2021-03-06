class Calculator {
    constructor(previousOperandEl, currentOperandEl) {
       this.previousOperandEl = previousOperandEl;
       this.currentOperandEl = currentOperandEl;
       this.clear()
    }

clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
}

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return 
    this.currentOperand = this.currentOperand.toString() + number.toString() 
}

chooseOperation(operation) {
    if (this.currenOperand === "") return
    if (this.previousOperand !== "") {
        this.compute()
    } 
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ""
}

compute() {
    let computation
    const prev = parseFloat(this.previousOperand) 
    const current = parseFloat(this.currentOperand) 
    if (isNaN(prev) || isNaN(current)) return 
    switch (this.operation) {
        case "+" :
                computation = prev + current
                break
        case "-" :
                computation = prev - current
                break
        case "x" :
                computation = prev * current
                break
        case "/" :
                computation = prev / current
                break
            default:
                return 
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";

}

updateDisplay() {
    this.currentOperandEl.innerText = this.currentOperand;
    if (this.operation != null) { 
        this.previousOperandEl.innerText =
        `${this.previousOperand} ${this.operation}`
     } else {
         this.previousOperandEl.innerText = ""
     }
 }

}

const numberBtns = document.querySelectorAll("[data-number]")
const operationBtns = document.querySelectorAll("[data-operation]")
const equalsBtn = document.querySelector("[data-equals]")
const deleteBtn = document.querySelector("[data-delete]")
const allClearBtn = document.querySelector("[data-all-clear]")
const surpriseBtn = document.querySelector("[data-surprise]")
const previousOperandEl = document.querySelector("[data-previous-operand]")
const currentOperandEl = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousOperandEl, currentOperandEl) 

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()      
    })
})

equalsBtn.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBtn.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})

surpriseBtn.addEventListener("click", button => {
    calculator.updateDisplaySurprise();
})

const modal = document.getElementById("surprise");
surpriseBtn.onclick = () => {
    modal.style.display = "block";
}

window.onlick = () => {
    if (event.target ==modal) {
        modal.style.display = "none";
    }
}