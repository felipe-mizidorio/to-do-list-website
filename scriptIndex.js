import { user } from './user.js';
import { note } from './note.js';

document.getElementById('exit').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('keepLogged', 'false');
    window.location.replace('login.html');
    localStorage.removeItem('userLogged');
});

document.getElementById('form1').addEventListener('submit', adicionarTarefa);
const userData = JSON.parse(localStorage.getItem(localStorage.getItem('userLogged')));
const notesList = []
const tabela = document.getElementById('table1');
const tarefasSalvas = userData.notes;
if(tarefasSalvas){
    tarefasSalvas.map(linhaTarefa => {
        renderizarListas(linhaTarefa);
        notesList.push(linhaTarefa);
    });
}

function adicionarTarefa(e) {
    e.preventDefault();
    let nomeLista = e.target.elements.nameList.value;
    let uuid = self.crypto.randomUUID();

    let newNote = new note(nomeLista, uuid); 

    notesList.push(newNote);
    userData.notes = notesList;
    saveData();
    renderizarListas(newNote);
}

function renderizarListas(notesList){
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.textContent = notesList.uuid;
    td2.textContent = notesList.titulo;
    td3.textContent = notesList.dataCriacao;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tabela.appendChild(tr);
}

function saveData(){
    localStorage.removeItem(localStorage.getItem('userLogged'));
    localStorage.setItem(localStorage.getItem('userLogged'), JSON.stringify(userData));
}