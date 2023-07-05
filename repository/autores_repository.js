const { Client } = require('pg')

const livros = require('./livros_repository')
const conector = require('./conector')
const conection = conector.conection

async function inserir(autor) {
    if (autor && autor.nome && autor.pais) {
        const client = new Client(conection);
        let text = 'INSERT INTO autores (nome, pais) VALUES ($1, $2) RETURNING *';
        let values = [autor.nome, autor.pais];
        await client.connect();
        const res = await client.query(text, values);
        const listaAutores = res.rows;
        await client.end();
        return listaAutores;
    } else {
        throw ({
            numero: 400,
            msg: "Erro: os parametros do autor estão invalidos."
        })
    }
}

async function listar() {
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM autores')
    const listaAutores = res.rows;
    await client.end();
    return listaAutores;
}

async function listarPorId(id) {
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM autores WHERE id_autor = $1', [id]);
    const listaAutores = res.rows[0];
    await client.end();

    return listaAutores;
}

async function atualizar(id, autor) {
    if (!autor && !autor.nome && !autor.pais) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de autor estão inválidos."
        })
    }

    const listaAutores = await listarPorId(id);
    
    if (!listaAutores) {
        throw ({
            numero: 404,
            msg: "Erro: Autor não encontrado."
        })
    }
    
    const client = new Client(conection);
    let text = 'UPDATE autores SET nome = $1, pais = $2 WHERE id_autor = $3 RETURNING *';
    let values = [autor.nome, autor.pais, id];
    await client.connect();
    const res = await client.query(text, values);
    const autores = res.rows;
    await client.end();
    return autores;

}

async function deletar(id) {

    try {
        const listaAutores = await listarPorId(id);

        if (!listaAutores) {
            throw ({
                numero: 404,
                msg: "Erro: Autor não encontrado."
            })
        }
        
        const client = new Client(conection);
        let text = "DELETE FROM autores WHERE id_autor = $1";
        let values = [id];
        await client.connect();
        await client.query(text, values);
        await client.end();
        
        return { numero: 200, msg: "Deletado."};

    } catch (err) {
        throw (err)
    }
    
    
}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    deletar
}