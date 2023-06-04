const dataset = require('./dataset')


class Livros {
    verificarLivro() {
        try {
            let aux = dataset.livros[0]['id'];
            return true;
        } catch {
            return false;
        }
    }

    gerarId() {
        let id = 1
        for (const i of dataset.livros) {
            if (id < i["id"]) {
                id = i["id"];
            }
        }    
        id += 1;
        return id;
    }

    verificarDisponibilidade(id) {
        if (this.verificarLivro()) {
            for (const i of dataset.livros) {
                if (i["id"] === id) {
                    return i["disponibilidade"]
                }
            }
        }
        return false
    }

    cadastrarLivros(nome, autor, isbn, editora, ano) {
        let id = 0;
        if (this.verificarLivro()) {
            id = this.gerarId();
            dataset.livros.push({
                'id': id,
                'nome': nome,
                'autor': autor,
                'isbn': isbn,
                'disponibilidade': true,
                'editora': editora,
                'ano': ano
            })
        } else {
            id = 1;
            dataset.livros.push({'id': id,
                'nome': nome,
                'autor': autor,
                'isbn': isbn,
                'disponibilidade': true,
                'editora': editora,
                'ano': ano
            })
        }
    }

    atualizarLivro(id, df) {
        let count = 0;
        if (this.verificarLivro()) {
            for (const i of dataset.livros) {
                if (i["id"] === id) {
                    dataset.livros[count]['nome'] = df['nome'];
                    dataset.livros[count]['autor'] = df['autor'];
                    dataset.livros[count]['isbn'] = df['isbn'];
                    dataset.livros[count]['editora'] = df['editora'];
                    dataset.livros[count]['ano'] = df['ano'];
                }
                count++;
            }
        } else {
            return false
        }
    }

    deletarLivros(id) {
        let count = 0;
        if (this.verificarLivro()) {
            for (const i of dataset.livros) {
                if (i["id"] === id) {
                    dataset.livros.splice(count, 1);
                    return true;
                }
                count++;
            }
            return false;
        }
    }

    retornarLivro(id) {
        let count = 0;
        if (this.verificarLivro()) {
            for (const i of dataset.livros) {
                if (i["id"] === id) {
                    return dataset.livros[count];
                }
                count++;
            }
        }
        return false;
    }

    retornarLivros() {
        let msg = "";
        let chave = "";
        if (this.verificarLivro()) {
            for (const i of dataset.livros) {
                if (i["disponibilidade"]) {
                    chave = "Sim";
                } else {
                    chave = "Não";
                }
                let text = "ID: " + i["id"] + " Nome: " +
                 i["nome"] + " ISBN: " + i["isbn"] + " Autor: " + 
                 i["autor"] + " Editora: " + i["editora"] + " Ano: " +
                 i["ano"] + " Disponivel: " + chave + "\n";
                msg += text;
            }
        } else {
            msg = "Não tem registro";
        }
        return msg;
    }
}

module.exports = Livros;