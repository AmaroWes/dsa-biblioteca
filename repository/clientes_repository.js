const dt = require('../dataset');
const cmn = require('./communs_repository');

function inserir(cliente) {
    if (cliente && cliente.nome && cliente.telefone && cliente.login && cliente.senha) {
        let id = cmn.gerarId(dt.clientes);
        cliente.id = id;
        cliente.livros = [];
        dt.clientes.push(cliente);
        return dt.clientes;
    }
    throw ({
        numero: 400,
        msg: "Erro: Os parametros de clientes estão inválidos."
    })
}

function listar(){
    return dt.clientes;
}

function listarPorId(id){
    for (let i of dt.clientes) {
        if (i["id"] == id) {
            return i;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado"
    })
}

function atualizar(id, cliente) {
    if (!cliente && !cliente.nome && !cliente.telefone && !cliente.login && !cliente.senha) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametro de cliente estão inválidos."
        })
    }

    for (let i = 0; i < dt.clientes.length; i++) {
        if (dt.clientes[i].id == id) {
            dt.clientes[i].nome = cliente.nome;
            dt.clientes[i].telefone = cliente.telefone;
            dt.clientes[i].login = cliente.login;
            dt.clientes[i].senha = cliente.senha;
            dt.clientes[i].matricula = cliente.matricula;
            return dt.clientes;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    })
}

function deletar(id) {
    for (let i = 0; dt.locados.length; i++) {
        if (dt.locados.cliente == id) {
            throw ({
                numero: 405,
                msg: "Erro: O cliente está em uso em uma locação"
            })
        }
    }

    for (let i = 0; i < dt.clientes.length; i++) {
        if (dt.clientes[i].id == id){
            dt.clientes.splice(i, 1);
            return dt.clientes;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Cliente não encontrado."
    })
}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    deletar
}