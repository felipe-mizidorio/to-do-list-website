document.getElementById('exit').addEventListener('click', function(event) {
    localStorage.setItem('keepLogged', 'false');
    window.location.replace('login.html');
    localStorage.removeItem('userLogged');
});

document.getElementById('form1').addEventListener('submit', adicionarTarefa);
const userData = JSON.parse(localStorage.getItem(localStorage.getItem('userLogged')));
const tarefas = []
const tabela = document.getElementById('table1');
const tarefasSalvas = userData.tarefas;
if(tarefasSalvas){
    tarefasSalvas.map(linhaTarefa => {
        renderizarListas(linhaTarefa);
        tarefas.push(linhaTarefa);
    });
}

function adicionarTarefa(e) {
    e.preventDefault();
    let nomeLista = e.target.elements.nameList.value;
    let dataCriacao = new Date();
    let dataFormated = dataCriacao.toLocaleDateString('pt-BR');
    let uuid = self.crypto.randomUUID();

    const tarefa = {
        nomeLista: nomeLista,
        dataCriacao: dataFormated,
        uuid: uuid
    }
    tarefas.push(tarefa);
    userData.tarefas = tarefas;
    console.log(userData.tarefas);
    console.log(userData);
    saveData();
    renderizarListas(tarefa);
}

function renderizarListas(tarefa){
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.innerHTML = tarefa.uuid;
    td2.innerHTML = tarefa.nomeLista;
    td3.innerHTML = tarefa.dataCriacao;

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