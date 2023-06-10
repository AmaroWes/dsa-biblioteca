const dt = require('../dataset');
const cmn = require('./communs_repository');

function validarIdAutor(id) {
    for (let i in dt.autores) {
        if (i["id"] == id) {
            return true;
        }
    }
    return false;
}

function inserir(livro){
    if (livro && livro.nome && livro.autor && livro.isbn && livro.editora && livro.ano) {
        if (livro.ano) {
            let novaData = new Date(livro.ano);
            if (!isNaN(novaData)) {
                if (validarIdAutor()) {
                    let id = cmn.gerarId(dt.livros);
                    livro.id = id;
                    livro.status = true;
                    dt.livros.push(livro);
                    return dt.livros
                } else {
                    throw ({
                        numero: 405,
                        msg: "Erro: Autor não cadastrado."
                    });
                }
            } else {
                throw ({
                    numero: 400,
                    msg: "Erro: Os parametros do livro estao invalidos."
                });
            }
        } else {
            throw ({
                numero: 400,
                msg: "Erro: Os parametros do livro estao invalidos."
            });
        }
    } else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estao invalidos."
        });
    }
}

function listar() {
    return dt.livros;
}

function listarPorId(id) {
    for(let i of dt.livros){ 
        if(i.id == id){
            return i;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Livro nao encontrado."
    });
}

function atualizar(id, livro) {
    if (!livro && !livro.nome && !livro.autor && !livro.isbn && !livro.editora && !livro.ano && !livro.status) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estao invalidos."
        });
    }
    
    let novaData = new Date(livro.ano);
    if (!isNaN(novaData)) {
        if (validarIdAutor()) {
            for (let i = 0; i < dt.livros.length; i++) {
                if (dt.livros[i].id == id) {
                    dt.livros[i].nome = livro.nome;
                    dt.livros[i].autor = livro.autor;
                    dt.livros[i].isbn = livro.isbn;
                    dt.livros[i].editora = livro.editora;
                    dt.livros[i].status = livro.status;
                    dt.livros[i].ano = livro.ano;
                    return dt.livros;
                }
            }
            throw ({
                numero: 404,
                msg: "Erro: Livro nao encontrado."
            });
        } else {
            throw ({
                numero: 400,
                msg: "Erro: Os parametros do livro estao invalidos."
            });
        }
    } else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estao invalidos."
        });
    }  
}

function atualizarStatus(id, livro) {
    if (livro && livro.status) {
        for (let i = 0; i < dt.livros.length; i++) {
            if (dt.livros[i].id == id) {
                if (livro.status === true || livro.status === false) {
                    dt.livros[i].status = livro.status;
                    return dt.livros[i];
                }
            }
        }
        throw ({
            numero: 404,
            msg: "Erro: Livro não encontrado."
        })
    } else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estao invalidos."
        });
    }
}

function deletar(id) {
    for (let i = 0; i < dt.livros.length; i++) {
        if (dt.livros[i].id == id) {
            dt.livros.splice(i, 1);
            return dt.livros;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Livro não encontrado."
    })
}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    atualizarStatus,
    deletar
}