const { Client } = require('pg')
const conector = require('./conector')
const conection = conector.conection



async function inserir(cliente) {
    if (cliente && cliente.nome && cliente.telefone && cliente.login && cliente.senha) {
        const client = new Client(conection);
        let text = 'INSERT INTO clientes (nome, telefone, email, senha) VALUES ($1, $2, $3, $4) RETURNING *';
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

    const clientes = await listarPorId(id);
    if (!clientes) {
        throw ({
            numero: 404,
            msg: "Erro: Cliente não encontrado."
        })
    }

    const client = new Client(conection);
    let text = 'UPDATE clientes SET nome = $1, telefone = $2, email = $3, senha = $4 WHERE id_cliente = $5 RETURNING *';
    let values = [cliente.nome, cliente.telefone, cliente.login, cliente.senha, id];
    await client.connect();
    const res = await client.query(text, values);
    const listaClientes = res.rows;
    await client.end();
    return listaClientes;

}

async function deletar(id) {

    try {
        const clientes = await listarPorId(id);
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
    } catch (error) {
        throw ({
            numero: 405,
            msg: "Erro: O cliente está em uso em uma locação"
        })
    }

}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    deletar
}