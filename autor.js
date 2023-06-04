const { text } = require('express');
const dataset = require('./dataset');


class Autores {

    verificarAutor() {
        try {
            let aux = dataset.autores[0]['id'];
            return true;
        } catch {
            return false;
        }
    }

    gerarId() {
        let id = 1
        for (const i of dataset.autores) {
            if (id < i["id"]) {
                id = i["id"];
            }
        }    
        id += 1;
        return id;
    }

    cadastrarAutor(nome, pais) {
        let id = 0;
        if (this.verificarAutor()) {
            id = this.gerarId();
            dataset.autores.push({'id': id, 'nome': nome, 'pais': pais});
        } else {
            id = 1;
            dataset.autores.push({'id': id, 'nome': nome, 'pais': pais})
        }

    }

    atualizarAutor(id, df) {
        let count = 0;
        if (this.verificarAutor()) {
            for (const i of dataset.autores) {
                if (i["id"] === id) {
                    dataset.autores[count]['nome'] = df['nome'];
                    dataset.autores[count]['pais'] = df['pais'];
                }
                count++;
            }
        } else {
            return false
        }
    }

    retornarAutor(id) {
        let count = 0;
        if (this.verificarAutor()) {
            for (const i of dataset.autores) {
                if (i["id"] === id) {
                    return dataset.autores[count];
                }
                count++;
            }
            return false;
        }
    }

    retornarAutores() {
        let msg = ""
        if (this.verificarAutor()) {
            for (const i of dataset.autores) {
                let text = "ID: " + i["id"] + " Nome:" + i["nome"] + " Pais: " + i["pais"] + "\n";
                msg += text;
            }
            return msg;
        }
    }

    deletarAutor(id) {
        let count = 0;
        if (this.verificarAutor()) {
            for (const i of dataset.autores) {
                if (i["id"] === id) {
                    dataset.autores.splice(count, 1);
                    return true;
                }
                count++;
            }
            return false;
        }
    }

}

module.exports = Autores;