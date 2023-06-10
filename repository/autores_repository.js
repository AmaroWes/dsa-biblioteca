const dt = require('../dataset');
const cmn = require('./communs_repository');

function inserir(autor) {
    if (autor && autor.nome && autor.pais) {
        let id = cmn.gerarId(dt.autores);
        autor.id = id;
        dt.autores.push(autor);
        return dt.autores;
    } else {
        throw ({
            numero: 400,
            msg: "Erro: os parametros do autor estão invalidos."
        })
    }
}

function listar() {
    return dt.autores;
}

function listarPorId(id) {
    console.log("here")
    for (let i of dt.autores) {
        if (i.id == id) {
            return i;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    })
}

function atualizar(id, autor) {
    if (!autor && !autor.nome && !autor.pais) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de autor estão inválidos."
        })
    }

    for (let i = 0; i < dt.autores.length; i++) {
        if (dt.autores[i].id == id) {
            dt.autores[i].nome = autor.nome;
            dt.autores[i].pais = autor.pais;
            return dt.autores;
        }
    }

    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    })
}

function deletar(id) {
    for (let i = 0; i < dt.livros.length; i++) {
        if (dt.livros.autor == id) {
            throw ({
                numero: 405,
                msg: "Erro: autor está vinculado a um livro"
            })
        }
    }

    for (let i = 0; i < dt.autores.length; i++) {
        if (dt.autores[i].id == id) {
            dt.autores.splice(i, 1);
            return dt.autores;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    })
}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    deletar
}