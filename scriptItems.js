import { user } from './user.js';
import { note } from './note.js';
import { item } from './item.js';

document.getElementById('exit').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('keepLogged', 'false');
    window.location.replace('login.html');
    localStorage.removeItem('userLogged');
});

document.getElementById('form1').addEventListener('submit', adicionarTarefa);
const userData = JSON.parse(localStorage.getItem(localStorage.getItem('userLogged')));
let itemsList = []
const tabela = document.getElementById('table1');

const urlParams = new URLSearchParams(window.location.search);
const listId = urlParams.get('listId');
let index = 0;
// Iterar sobre a lista de notes
for (let i = 0; i < userData.notes.length; i++) {
    const note = userData.notes[i];
    
    // Verificar se o uuid da nota atual corresponde ao listId
    if (note.uuid === listId) {
        // Se corresponder, faça algo aqui, como imprimir uma mensagem
        index = i;

        // Se quiser parar de iterar após encontrar uma correspondência, você pode usar break
        // break;
    }
}

const form1 = document.getElementById('form1');
const h2Title = document.createElement('h2');
h2Title.textContent = `LISTA ${userData.notes[index].titulo}`;
form1.insertAdjacentElement('beforebegin', h2Title);

const tarefasSalvas = userData.notes[index].items;
if(tarefasSalvas){
    tarefasSalvas.map(linhaTarefa => {
        renderizarListas(linhaTarefa);
        itemsList.push(linhaTarefa);
    });
}

document.getElementById('btn-return').addEventListener('click', function(event) {
    console.log(userData);
});

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

    let newNote = new item(nomeLista, uuid); 

    itemsList.push(newNote);
    userData.notes[index].items = itemsList;
    saveData();
    renderizarListas(newNote);
    const botoesEdit = document.querySelectorAll('.btn-edit');
    botoesEdit.forEach(botaoEdit => {
    botaoEdit.addEventListener('click', editarTarefa);
    });
    const botoesDelete = document.querySelectorAll('.btn-delete');
    botoesDelete.forEach(botaoDelete => {
    botaoDelete.addEventListener('click', excluirTarefa);
    });
}

function editarTarefa(event) {
    // Adicione um evento de clique a cada botão de edição
    const trPai = event.target.closest('tr');
    const primeiroFilho = trPai.firstElementChild;
    const segundaColuna = trPai.children[1];
    const input = document.createElement('input');
    input.value = segundaColuna.textContent;
    segundaColuna.textContent = '';
    segundaColuna.appendChild(input);
    // ao clicar enter, salvar a edição
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            segundaColuna.textContent = input.value;
            itemsList = itemsList.map(item => {
                if(item.uuid === primeiroFilho.textContent){
                    item.titulo = input.value;
                }
                return item;
            }
            );
            userData.notes[index].items = itemsList;
            saveData();
        }
    });
    // ao clicar fora, salvar a edição
    input.addEventListener('blur', function() {
        segundaColuna.textContent = input.value;
        itemsList = itemsList.map(item => {
            if(item.uuid === primeiroFilho.textContent){
                item.titulo = input.value;
            }
            return item;
        });
        userData.notes[index].items = itemsList;
        saveData();
    });
}

function excluirTarefa(event) {
    // Adicione um evento de clique a cada botão de exclusão
    const trPai = event.target.closest('tr');
    const primeiroFilho = trPai.firstElementChild;
    itemsList = itemsList.filter(item => item.uuid !== primeiroFilho.textContent);
    userData.notes[index].items = itemsList;
    saveData();
    // Remova o elemento pai (o <td>)
    trPai.remove();
}

function renderizarListas(itemsList){
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    td1.textContent = itemsList.uuid;
    td2.textContent = itemsList.titulo;
    td3.textContent = itemsList.dataCriacao;
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