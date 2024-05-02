export class note{
    constructor(titulo, uuid){
        this.titulo = titulo
        this.dataCriacao = new Date().toLocaleDateString('pt-BR')
        this.uuid = uuid
    }
}