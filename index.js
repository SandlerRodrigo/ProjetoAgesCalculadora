// once the page is fully loaded, calls this big function which englobes all the solution
document.addEventListener('DOMContentLoaded', function () {

    // iniciates variable 'screen' with the calculator display screen div
    const screen = document.querySelector('#screen');

    /* iniciates variable 'buttons' with every button in the calculator,
    to be able to listen the events (only 'onclick' in this case) */
    const buttons = document.querySelectorAll('#buttons button');

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

        if (ultimoOP == 'C' || ultimoOP == '=') {
            valor = Number(valorDisplay);
            return;
        }

        if (ultimoOP == '%') {
            valor = (valor*Number(valorDisplay))/100;
            return;
        }

        if (ultimoOP == '^') {
            valor **= Number(valorDisplay);
            return;
        }

        if (ultimoOP == '/') {
            valor /= Number(valorDisplay);
            return;
        }

        if (ultimoOP == '*') {
            valor *= Number(valorDisplay);
            return;
        }
        if (ultimoOP == '+') {
            valor += Number(valorDisplay);
            return;
        }
        if (ultimoOP == '-') {
            valor -= Number(valorDisplay);
            return;
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
            
            case '=':
                parcialResult();
                valorDisplay = String(valor);
                ultimoOP = '=';
                break;
            
            default:
                if (valorDisplay == ultimoOP)
                    valorDisplay = '';
                valorDisplay += valorButton;
        }
        
        // updates screen with whatever is suposed to be displayed (content of variable 'valorDisplay')
        atualizaTela();
    }

    // lambda function that adds an EventListener to every button in the calculator, all of Listening for clicksc
    buttons.forEach(button => {
        button.addEventListener('click', houveClique);
    });
});