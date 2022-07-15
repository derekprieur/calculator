class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay
        this.currentOperandDisplay = currentOperandDisplay
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand += number
    }

    operationSelect(operation) {
        if (this.currentOperand == '') return
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand

        this.currentOperand = ''
    }

    compute() {
        if (this.operation == '' || this.previousOperand == '' || this.currentOperand == '') return
        switch (this.operation) {
            case '+':
                this.currentOperand = parseFloat(this.previousOperand) + parseFloat(this.currentOperand)
                break
            case '-':
                this.currentOperand = parseFloat(this.previousOperand) - parseFloat(this.currentOperand)
                break
            case '*':
                this.currentOperand = parseFloat(this.previousOperand) * parseFloat(this.currentOperand)
                break
            case '÷':
                this.currentOperand = parseFloat(this.previousOperand) / parseFloat(this.currentOperand)
                break
            default:
                return
        }
        this.operation = undefined
        this.previousOperand = ''
    }

    formatNumber(number) {
        const stringNumber = number.toString()
        const intDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let display

        if (isNaN(intDigits)) {
            display = ''
        } else {
            display = intDigits.toLocaleString('en')
        }
        if (decimalDigits != null) {
            return `${display}.${decimalDigits}`
        } else {
            return display
        }
    }

    updateDisplay() {
        this.currentOperandDisplay.textContent = this.formatNumber(this.currentOperand)
        this.previousOperandDisplay.textContent = this.formatNumber(this.previousOperand)
        if (this.operation != undefined) {
            this.previousOperandDisplay.textContent += ` ${this.operation}`
        }
    }
}

const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalBtn = document.querySelector('[data-equals]')
const previousOperandDisplay = document.querySelector('[data-prev-operand]')
const currentOperandDisplay = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationSelect(button.textContent)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})