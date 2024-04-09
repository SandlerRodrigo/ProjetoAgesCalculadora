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

// lambda function that adds an EventListener to every button in the calculator, all of them Listening for clicks
button.forEach(button => {
    button.addEventListener('click', houveClique);
});

// the value displayed in the display's screen is an empty string inicially
let valorDisplay = '';

// the variable 'valor' used for calculations is inicialized with null
let valor = null;

// starts the calculator informing the last operation was button 'C' (part of program's logic)
let ultimoOP = 'C';

// an array that contain the operators (part of program's logic)
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
            valor = (valor * Number(valorDisplay)) / 100;
            break;

        case '^':
            valor **= Number(valorDisplay);
            break;

        case '/':
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

    // iniciates variable 'valorButton' with whatever text is inside the button which triggered the EventListener
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
            if (operators.indexOf(valorDisplay) != -1)
                break;
            if (valorDisplay == '')
                break;
            valorDisplay = Number(valorDisplay) * -1;
            break;

        case '.':
            if (operators.indexOf(valorDisplay) != -1)
                break;
            if (valorDisplay == '')
                break;
            if (valorDisplay == 'Infinity' || valorDisplay == '-Infinity')
                break;
            if (valorDisplay.indexOf('.') != -1)
                break;
            valorDisplay = valorDisplay + '.';
            break;

        case '=':
            parcialResult();
            valorDisplay = String(valor);
            ultimoOP = '=';
            break;

        default:
            if (valorDisplay == 'Infinity' || valorDisplay == '-Infinity')
                break;
            if (valorDisplay == ultimoOP)
                valorDisplay = '';
            valorDisplay += valorButton;
    }

    // updates screen with whatever is suposed to be displayed (content of variable 'valorDisplay')
    atualizaTela();
}