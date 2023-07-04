const liros = require('./livros_repository')
const { Client } = require('pg')

const conection = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca'
}

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

    const listaAutores = listarPorId(id);
    
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
    const listaLivros = livros.listar()
    for (let i = 0; i < listaLivros.length; i++) {
        if (listaLivros.autor == id) {
            throw ({
                numero: 405,
                msg: "Erro: autor está vinculado a um livro"
            })
        }
    }

    const listaAutores = listarPorId(id);
    if (!listaAutores) {
        throw ({
            numero: 404,
            msg: "Erro: Autor não encontrado."
        })
    }
    
    const client = new Client(conection);
    let text = "DELETE FROM autores WHERE id_autor = $1 RETURNING *";
    let values = [id];
    await client.connect();
    const res = await client.query(text, values);
    const autores = res.rows;
    await client.end();
    return autores;
    
}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    deletar
}