import { note } from './note.js'

export class user{
    constructor(name,senha, notes, items){
        this.name = name
        this.senha = senha
        this.notes = notes
        this.items = items
    }
}
