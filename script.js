//addEventListner permite disparar varios eventos de click num mesmo botão 
// ex: click, mouseover, mouseout, etc
// addEventListner('click', function(event) { ... });
// preventDefault() previne o comportamento padrão do botão
// ex: submit de um formulário
// event.preventDefault();
// QuerySelector seleciona um elemento do DOM usando um seletor CSS
// ex: document.querySelector('#send');
// QuerySelectorAll seleciona todos os elementos do DOM que correspondem ao seletor CSS
// ex: document.querySelectorAll('.form-control');
// localStorage é um objeto que permite armazenar dados no navegador do usuário
// ex: localStorage.setItem('username', 'john');
// getElementById seleciona um elemento do DOM usando o ID
// ex: document.getElementById('send');
// getElementByName seleciona um elemento do DOM usando o name
// ex: document.getElementsByName('username');
// poderia colocar o evento no form ou no botão
// document.getElementById('form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     sendForm();
// });
// funcoes anonimas são funcoes sem nome que são passadas como argumento para outra função
// ex: function(event) { ... }
// other way to go to another page
// window.location.href = 'index.html'; navegação
// window.location.assign('index.html'); navegação (consegue voltar e avancar no browser)
// window.location.replace('index.html'); substitui a página atual pela nova (não consegue voltar no browser)
// para login é melhor replace

document.getElementById('send').addEventListener('click', function(event) {
    event.preventDefault();
    sendForm();
});
localStorage.setItem('username', 'john');
localStorage.setItem('password', '1234');
value = localStorage.getItem('keepLogged');

if(value === 'true'){
    window.location.replace('index.html');
}

function sendForm() {

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let keepLogged = document.getElementById('connected').checked;

    if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
        if(keepLogged){
            localStorage.setItem('keepLogged', 'true');
        }
        alert('Login successful');
        // Redirect to another page
        window.location.replace('index.html');
    }
    else {
        alert('Login failed');
    }

}       