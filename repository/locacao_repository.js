const { Client } = require('pg')
const livrosRepository = require('./livros_repository.js')
const clienteRepository = require('./clientes_repository.js')
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
    const res = await client.query('SELECT * FROM locados WHERE id_locado = $1', [id]);
    const listaLocados = res.rows[0];
    await client.end();
    return listaLocados;
}

async function devolver(id){
    
    const locados = await listarPorId(id);
    console.log("here")
    if (!locados) {
        throw ({
            numero: 404,
            msg: "Erro: Registro para devolução não encontrado."
        })
    }

    
    const client = new Client(conection);
    await client.connect();
    let text = 'DELETE FROM locados WHERE id_locado = $1 RETURNING *';
    let values = [id];
    const res = await client.query(text, values);
    const listaLocados = res.rows;
    await client.end();

    await livrosRepository.atualizarStatus(listaLocados[0].id_livro, {"status": true});

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

        if (clientes === undefined) {
            throw ({
                numero: 404,
                msg: "Erro: Cliente indisponível."
            })
        } 

        if (true === true) {
            const client = new Client(conection);
            let text = "SELECT id_cliente, count(id_cliente) as qtd FROM locados GROUP BY id_cliente";
            await client.connect();
            const res = await client.query(text);
            const listaClientes = res.rows;
            await client.end();

            for (let i in listaClientes) {
                if (listaClientes[i].id_cliente == locado.cliente && listaClientes[i].qtd >= 3) {
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

        await livrosRepository.atualizarStatus(locado.livro, {"status": false});

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