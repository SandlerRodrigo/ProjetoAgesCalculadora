// gets reference to the darkMode Button
document.querySelector('#dark').addEventListener('click', toDark);
// gets reference to the lightMode Button
document.querySelector('#light').addEventListener('click', toLight);
// screen receives the reference for displayScreen
const screen = document.querySelector('#screen');
// button receives the reference to calculator's buttonsButton
const button = document.querySelectorAll('#buttons button');
// changeStyle wait for the toggleMode to be clicked, then changes style reference in the html
const changeStyle = document.querySelector('#changeStyle');
// an array cointaining the possible operators for this calculator
const operators = ['%', '^', '/', '*', '+', '-'];
// var that appearso on the display, also used to make calculations
let valorDisplay = '';
// var that stores parcialResults
let valor = null;
// last used operator starts with 'c', in order to inicialize the calculator as if the Clear button was clicked
let ultimoOP = 'C';

function toDark() {
    changeStyle.href = 'css/styleDark.css';
}

function toLight() {
    changeStyle.href = 'css/styleLight.css';
}
// adds eventListeners to every button in the calculator
button.forEach(button => {
    button.addEventListener('click', houveClique);
});

function atualizaTela() {
    screen.textContent = valorDisplay;
}

// this function handles every possible click in the calculator
function houveClique(event) {

    const valorButton = event.target.textContent;

    switch (valorButton) {
        case 'C':
            valor = null;
            ultimoOP = 'C';
            valorDisplay = '';
            break;

        case '%':
            parcialResult();
            valorDisplay = event.target.textContent;
            ultimoOP = '%';
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

    // this function do the actual calculation that is omitted in the handling event function (houveClique)
    function parcialResult() {

        if (operators.indexOf(valorDisplay) != -1) // if there is an operator at the screen
            return;

        switch (ultimoOP) {
            case 'C':
            case '=':
                valor = Number(valorDisplay);
                break;

            case '%':
                if (valor == 'Infinity' && valorDisplay == '0' || valor == '-Infinity' && valorDisplay == '0') { // Infinity % 0 = 0
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
                if (valorDisplay == 0) { // 
                    valor = '';
                    break;
                }
                valor /= Number(valorDisplay);
                break;

            case '*':
                if (valor == 'Infinity' || valor == '-Infinity') {
                    valor = 0;
                    break;
                }
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
    atualizaTela();
}