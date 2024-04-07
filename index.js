document.addEventListener('DOMContentLoaded', function () {

    const screen = document.querySelector('#screen');
    const buttons = document.querySelectorAll('#buttons button');

    let valorDisplay = '';

    function atualizaTela() {
        screen.textContent = valorDisplay;
    }

    function houveClique(event) {
        const valorButton = event.target.textContent;

        switch (valorButton) {
            case 'C':
                valorDisplay = '';
                break;
            default:
                valorDisplay += valorButton;
        }

        atualizaTela();
    }

    buttons.forEach(button => {
        button.addEventListener('click', houveClique);
    });
});