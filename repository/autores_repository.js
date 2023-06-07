const dt = require('../dataset');
const cmn = require('./communs_repository');

function inserir(autor) {
    if (autor && autor.nome && autor.pais) {
        let id = cmn.gerarId();
        autor.id = id;
        dt.autores.push({autor});
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
    for (let i in dt.autores) {
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
            let autor = dt.autores.splice(i, 1);
            return autor;
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