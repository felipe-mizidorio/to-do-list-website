export class note{
    constructor(titulo, uuid, items){
        this.titulo = titulo
        this.dataCriacao = new Date().toLocaleDateString('pt-BR')
        this.uuid = uuid
        this.items = items
    }
}