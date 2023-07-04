const locados = require('./locacao_repository')

const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca',
})

async function inserir(cliente) {
    if (cliente && cliente.nome && cliente.telefone && cliente.login && cliente.senha) {
        let text = 'INSERT INTO clientes (nome, telefone, login, senha) VALUES ($1, $2, $3, $4) RETURNING *';
        let values = [cliente.nome, cliente.telefone, cliente.login, cliente.senha];
        await client.connect();
        const res = await client.query(text, values);
        const listaClientes = res.rows;
        await client.end();
        return listaClientes;
    }
    throw ({
        numero: 400,
        msg: "Erro: Os parametros de clientes estão inválidos."
    })
}

async function listar(){
    await client.connect();
    const res = await client.query('SELECT * FROM clientes');
    const listaClientes = res.rows;
    await client.end();
    return listaClientes;
}

function listarPorId(id){
    const clientes = listar()
    for (let i of clientes) {
        if (i["id"] == id) {
            return i;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado"
    })
}

async function atualizar(id, cliente) {
    if (!cliente && !cliente.nome && !cliente.telefone && !cliente.login && !cliente.senha) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametro de cliente estão inválidos."
        })
    }

    const clientes = listar()

    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id == id) {
            let text = 'UPDATE clientes SET nome = ($1), telefone = ($2), login = ($3), senha = ($4) WHERE clientes.id = ($5) RETURNING *';
            let values = [cliente.nome, cliente.telefone, cliente.login, cliente.senha, id];
            await client.connect();
            const res = await client.query(text, values);
            const listaClientes = res.rows;
            await client.end();
            return listaClientes;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    })
}

async function deletar(id) {
    const listaLocados = locados.listar();
    for (let i = 0; listaLocados.length; i++) {
        if (listaLocados[i].cliente == id) {
            throw ({
                numero: 405,
                msg: "Erro: O cliente está em uso em uma locação"
            })
        }
    }

    const clientes = listar();
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id == id){
            let text = "DELETE FROM clientes WHERE clientes.id = ($1) RETURNING *";
            let values = [id];
            await client.connect();
            const res = await client.query(text, values);
            const listaClientes = res.rows;
            await client.end();
            return listaClientes;
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