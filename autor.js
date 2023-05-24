const dataset = require('./dataset');


class Autores {

    verificarAutor() {
        try {
            aux = dataset.autores[0]['id'];
            return true;
        } catch {
            return false;
        }
    }

    gerarId() {
        id = 0
        if (this.verificarAutor()) {
            for (const i of dataset.autores) {
                if (id < i[id]) {
                    id = i[id];
                }
            }    
        }
        id += 1;
        return id;
    }

    cadastrarAutor(nome, pais) {
        if (this.verificarAutor()) {
            id = this.gerarId();
            dataset.autores.push({'id': id, 'nome': nome, 'pais': pais});
        }
    }

}

module.exports = Autores