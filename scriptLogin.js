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
// qual a diferença do var e do let no javascript?
// var é global e let é local
// e const?
// const é uma constante, não pode ser alterada

// json.stringify objeto para texto
// json.parse texto para obj

// set cria vetor
// map cria um objeto chave valor

import { user } from './user.js';

document.getElementById('send').addEventListener('click', function(event) {
    event.preventDefault();
    sendForm();
});

let jucinaldo = new user('jucinaldo', '123', []);
let joao = new user('joao', '111222', []);
let maria = new user('maria', '2323', []);

localStorage.getItem('jucinaldo') ? null:
localStorage.setItem('jucinaldo', JSON.stringify(jucinaldo));

localStorage.getItem('joao') ? null:
localStorage.setItem('joao', JSON.stringify(joao));

localStorage.getItem('maria') ? null:
localStorage.setItem('maria', JSON.stringify(maria));

let value = JSON.parse(localStorage.getItem('keepLogged'));

if(value === true){
    window.location.replace('list.html');
}

function sendForm() {

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let keepLogged = document.getElementById('connected').checked;

    let user = localStorage.getItem(username);

    if(user === null){
        alert('Usuário não encontrado');
        return;
    }else if (JSON.parse(user).senha == password){
        localStorage.setItem('keepLogged', JSON.stringify(keepLogged));
        window.location.replace('list.html');
        localStorage.setItem('userLogged', username);
    }else{
        alert('Senha incorreta');
    }
}       