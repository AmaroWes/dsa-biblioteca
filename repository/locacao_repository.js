const { Client } = require('pg')
const livrosRepository = require('./livros_repository')
const clienteRepository = require('./clientes_repository')
const conector = require('./conector')
const conection = conector.conection

async function listar() {
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM locados');
    const listaLocados = res.rows;
    await client.end();
    return listaLocados;
}

async function listarPorId(id) {
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM locados WHERE $1', [id]);
    const listaLocados = res.rows[0];
    await client.end();
    return listaLocados;
}

async function devolver(id, locado){
    if (!locado && !locado.id && !locado.livro && !locado.cliente) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros estão inválidos."
        })
    }
    
    const locados = await listarPorId(id);
    if (!locados) {
        throw ({
            numero: 404,
            msg: "Erro: Registro para devolução não encontrado."
        })
    }

    const livros = await livrosRepository.listarPorId(locado.livro);
    if (!livros) {
        throw ({
            numero: 404,
            msg: "Erro: Livro inválido."
        })
    }

    const clientes = await clienteRepository.listarPorId(locado.cliente);
    if (!clientes) {
        throw({
            numero: 404,
            msg: "Erro: Cliente inválido."
        })
    }

    const client = new Client(conection);
    await client.connect();
    let text = 'DELETE FROM locados WHERE id_locado = $1 RETURNING *';
    let values = [id];
    const res = await client.query(text, values);
    const listaLocados = res.rows;
    await client.end();

    await livrosRepository.atualizarStatus(true);

    return listaLocados;

}

async function alugar(locado){
    if (locado && locado.cliente && locado.livro && locado.locado && locado.previsto) {

        const livros = await livrosRepository.listarPorId(locado.livro);
        if (!livros) {
            throw ({
                numero: 404,
                msg: "Erro: Livro indisponível."
            })
        }

        if (livros.status == false) {
            throw ({
                numero: 404,
                msg: "Erro livro indisponível."
            })
        }

        const clientes = await clienteRepository.listarPorId(locado.cliente);
        if (!clientes) {
            throw ({
                numro: 404,
                msg: "Erro: Cliente indisponível."
            })
        }

        //ERRO daqui para baixo...
        const locados = await listar();
        if (!locados[0]) {
            const client = new Client(conection);
            let text = "INSERT INTO locados (id_livro, id_cliente, data_prevista, data_entrada) VALUES ($1, $2, $3, $4) RETURNING *";
            let values = [locado.livro, locado.cliente, locado.locado, locado.previsto];
            await client.connect();
            const res = await client.query(text, values);
            const listaLocados = res.rows;
            await client.end();
            return listaLocados;

        } else {

            const client = new Client(conection);
            let text = "SELECT id_cliente, count(id_cliente) as qtd FROM locados GROUP BY id_cliente";
            await client.connect();
            const res = await client.query(text);
            const listaClientes = res.rows;
            await client.end();

            for (let i in listaClientes) {
                if (i.id == locado.cliente && i.qtd >= 3) {
                    throw ({
                        numero: 405,
                        msg: "Erro: Cliente excedeu o limite de livros."
                    })
                }
            }
        }

        const client = new Client(conection);
        let text = "INSERT INTO locados (id_livro, id_cliente, data_prevista, data_entrada) VALUES ($1, $2, $3, $4) RETURNING *";
        let values = [locado.livro, locado.cliente, locado.locado, locado.previsto];
        await client.connect();
        const res = await client.query(text, values);
        const listaLocados = res.rows;
        await client.end();
        return listaLocados;

    } else {
        throw({
            numero: 400,
            msg: "Erro: Os paramentros estão incorretos."
        })
    }

}

module.exports = {
    alugar,
    devolver,
    listar,
    listarPorId
}