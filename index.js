const dark = document.querySelector('#dark');

const light = document.querySelector('#light');

const body = document.querySelector('#bodyLight');

const calculator = document.querySelector('#calculatorLight');

const display = document.querySelector('#displayLight');

const screen = document.querySelector('#screenLight');

const buttons = document.querySelector('#buttonsLight');

const button = document.querySelectorAll('#buttonsLight button');

dark.addEventListener('click', toDark)

light.addEventListener('click', toLight)

function toDark() {
    body.id = 'bodyDark'
    calculator.id = 'calculatorDark'
    display.id = 'displayDark'
    screen.id = 'screenDark'
    buttons.id = 'buttonsDark'
}

function toLight() {
    body.id = 'bodyLight'
    calculator.id = 'calculatorLight'
    display.id = 'displayLight'
    screen.id = 'screenLight'
    buttons.id = 'buttonsLight'
}

button.forEach(button => {
    button.addEventListener('click', houveClique);
});

let valorDisplay = '';

let valor = null;

let ultimoOP = 'C';

const operators = ['%', '^', '/', '*', '+', '-'];

// this function do the actual calculation that is omitted in the handling event function (houveClique)
function parcialResult() {

    if (operators.indexOf(valorDisplay) != -1)
        return;

    switch (ultimoOP) {
        case 'C':
        case '=':
            valor = Number(valorDisplay);
            break;

        case '%':
            if (valor == 'Infinity' && valorDisplay == '0'|| valor == '-Infinity' && valorDisplay == '0') { // Infinity % 0 = 0
                valor = Number(valorDisplay);
                break;
            }
            valor = (valor * Number(valorDisplay)) / 100;
            break;

        case '^': // any Infinity to the power of negative fractions are resulting 0
            if ((valor < 0) && ((Number(valorDisplay) % 1) != 0)) { // Fixes Math.pow's flaw, negative number to the power of fractional number
                valor = -Math.pow(-valor, valorDisplay);
                break;
            }
            valor = Math.pow(valor, valorDisplay);
            break;

        case '/':
            if (valor == 0 && valorDisplay == '0') { // 
                valor = 'Hello, World!';
                break;
            }
            valor /= Number(valorDisplay);
            break;

        case '*':
            valor *= Number(valorDisplay);
            break;

        case '+':
            valor += Number(valorDisplay);
            break;

        case '-':
            valor -= Number(valorDisplay);
            break;
    }

    return;
}

// when called, this function writes to the display's screen whatever is inside variable 'valordisplay'
function atualizaTela() {
    screen.textContent = valorDisplay;
}

// this function handles every possible click in the calculator
function houveClique(event) {

    // iniciates variable 'valorButton' with clicked button's content
    const valorButton = event.target.textContent;

    // a switch case receiving what button was clicked as a parameter
    switch (valorButton) {
        case 'C':
            valor = null;
            ultimoOP = 'C';
            valorDisplay = '';
            break;

        case '%':
            parcialResult();
            valorDisplay = event.target.textContent;
            ultimoOP = '%'
            break;

        case '^':
            parcialResult();
            valorDisplay = event.target.textContent;
            ultimoOP = '^'
            break;

        case '/':
            parcialResult();
            valorDisplay = event.target.textContent;
            ultimoOP = '/';
            break;

        case '*':
            parcialResult();
            valorDisplay = event.target.textContent;
            ultimoOP = '*';
            break;

        case '+':
            parcialResult();
            valorDisplay = event.target.textContent;
            ultimoOP = '+';
            break;

        case '-':
            parcialResult();
            valorDisplay = event.target.textContent;
            ultimoOP = '-';
            break;

        case '+/-':
            if (operators.indexOf(valorDisplay) != -1) // if there is an operator at the screen
                break;
            if (valorDisplay == '') // if the screen is empty
                break;
            valorDisplay = -Number(valorDisplay); 
            break;

        case '.':
            if (operators.indexOf(valorDisplay) != -1) // if there is an operator at the screen
                break;
            if (valorDisplay == '') // if the screen is empty
                break;
            if (valorDisplay == 'Infinity' || valorDisplay == '-Infinity') // if the screen is presenting any Infinity
                break;
            if (valorDisplay.indexOf('.') != -1) // if there is already a '.' at the screen
                break;
            valorDisplay = valorDisplay + '.';
            break;

        case '=':
            parcialResult();
            valorDisplay = String(valor);
            ultimoOP = '=';
            break;

        default:
            if (valorDisplay == 'Infinity' || valorDisplay == '-Infinity') // Doesn't let user type past Infinity
                break;
            if (valorDisplay == ultimoOP)
                valorDisplay = '';
            valorDisplay += valorButton;
    }

    // updates screen with whatever is suposed to be displayed (content of variable 'valorDisplay')
    atualizaTela();
}