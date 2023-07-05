const locados = require('./locacao_repository')

const { Client } = require('pg')

const conection = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca'
}


async function inserir(cliente) {
    if (cliente && cliente.nome && cliente.telefone && cliente.login && cliente.senha) {
        const client = new Client(conection);
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
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM clientes');
    const listaClientes = res.rows;
    await client.end();
    return listaClientes;
}

async function listarPorId(id){
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM clientes WHERE id_cliente = $1', [id]);
    const listaClientes = res.rows[0];
    await client.end();
    return listaClientes;
}

async function atualizar(id, cliente) {
    if (!cliente && !cliente.nome && !cliente.telefone && !cliente.login && !cliente.senha) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametro de cliente estão inválidos."
        })
    }

    const clientes = listarPorId(id);
    if (!clientes) {
        throw ({
            numero: 404,
            msg: "Erro: Cliente não encontrado."
        })
    }

    const client = new Client(conection);
    let text = 'UPDATE clientes SET nome = $1, telefone = $2, login = $3, senha = $4 WHERE id_cliente = $5 RETURNING *';
    let values = [cliente.nome, cliente.telefone, cliente.login, cliente.senha, id];
    await client.connect();
    const res = await client.query(text, values);
    const listaClientes = res.rows;
    await client.end();
    return listaClientes;

}

async function deletar(id) {

    const listaLocados = locados.listar();
    if (listaLocados) {
        for (let i = 0; listaLocados.length; i++) {
            if (listaLocados[i].cliente == id) {
                throw ({
                    numero: 405,
                    msg: "Erro: O cliente está em uso em uma locação"
                })
            }
        }
    }
    
    const clientes = listarPorId(id);
    if (!clientes) {
        throw ({
            numero: 404,
            msg: "Erro: Cliente não encontrado."
        })
    }
    
    const client = new Client(conection);
    let text = "DELETE FROM clientes WHERE id_cliente = $1 RETURNING *";
    let values = [id];
    await client.connect();
    const res = await client.query(text, values);
    const listaClientes = res.rows;
    await client.end();
    return listaClientes;

}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    deletar
}