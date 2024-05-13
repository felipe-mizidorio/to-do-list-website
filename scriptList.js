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
let notesList = []
const tabela = document.getElementById('table1');
const tarefasSalvas = userData.notes;
if(tarefasSalvas){
    tarefasSalvas.map(linhaTarefa => {
        renderizarListas(linhaTarefa);
        notesList.push(linhaTarefa);
    });
}

const botoesEdit = document.querySelectorAll('.btn-edit');
botoesEdit.forEach(botaoEdit => {
    botaoEdit.addEventListener('click', editarTarefa);
    });

const botoesDelete = document.querySelectorAll('.btn-delete');
botoesDelete.forEach(botaoDelete => {
    botaoDelete.addEventListener('click', excluirTarefa);
    });

function adicionarTarefa(e) {
    e.preventDefault();
    let nomeLista = e.target.elements.nameList.value;
    let uuid = self.crypto.randomUUID();

    let newNote = new note(nomeLista, uuid); 

    notesList.push(newNote);
    userData.notes = notesList;
    saveData();
    renderizarListas(newNote);
    const botoesDelete = document.querySelectorAll('.btn-delete');
    botoesDelete.forEach(botaoDelete => {
    botaoDelete.addEventListener('click', excluirTarefa);
    });
}

function editarTarefa(event) {
    // Adicione um evento de clique a cada botão de edição
    const trPai = event.target.closest('tr');
    const segundaColuna = trPai.children[1];
    const input = document.createElement('input');
    input.value = segundaColuna.textContent;
    segundaColuna.textContent = '';
    segundaColuna.appendChild(input);
    // ao clicar enter, salvar a edição
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            segundaColuna.textContent = input.value;
            notesList = notesList.map(item => {
                if(item.uuid === primeiroFilho.textContent){
                    item.titulo = input.value;
                }
                return item;
            });
            userData.notes = notesList;
            saveData();
        }
    });
    // ao clicar fora, salvar a edição
    input.addEventListener('blur', function() {
        segundaColuna.textContent = input.value;
        notesList = notesList.map(item => {
            if(item.uuid === primeiroFilho.textContent){
                item.titulo = input.value;
            }
            return item;
        });
        userData.notes = notesList;
        saveData();
    });
}

function excluirTarefa(event) {
    // Adicione um evento de clique a cada botão de exclusão
    const trPai = event.target.closest('tr');
    const primeiroFilho = trPai.firstElementChild;
    notesList = notesList.filter(item => item.uuid !== primeiroFilho.textContent);
    userData.notes = notesList;
    saveData();
    // Remova o elemento pai (o <td>)
    trPai.remove();
}

function renderizarListas(notesList){
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    td1.textContent = notesList.uuid;
    td2.textContent = notesList.titulo;
    td3.textContent = notesList.dataCriacao;
    td4.innerHTML = `<button class="btn-delete"> 
                        <img src="material-symbols_delete.png">
                    </button>`;
    td5.innerHTML = `<button class="btn-edit"> 
                        <img src="tabler_edit.png">
                    </button>`;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tabela.appendChild(tr);
}

function saveData(){
    localStorage.removeItem(localStorage.getItem('userLogged'));
    localStorage.setItem(localStorage.getItem('userLogged'), JSON.stringify(userData));
}