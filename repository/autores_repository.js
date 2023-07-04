const liros = require('./livros_repository')
const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca',
})

async function inserir(autor) {
    if (autor && autor.nome && autor.pais) {
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
    await client.connect();
    const res = await client.query('SELECT * FROM autores')
    const listaAutores = res.rows;
    await client.end();
    return listaAutores;
}

async function listarPorId(id) {
    await client.connect();
    const res = await client.query('SELECT * FROM autores')
    const listaAutores = res.rows;
    await client.end();

    for (let i of listaAutores) {
        if (i.id == id) {
            return i;
        }
    }

    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    })
}

async function atualizar(id, autor) {
    if (!autor && !autor.nome && !autor.pais) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de autor estão inválidos."
        })
    }

    const listaAutores = listar();

    for (let i = 0; i < listaAutores.length; i++) {
        if (listaAutores[i].id == id) {
            let text = 'UPDATE autores SET nome = ($1), pais = ($2) WHERE autores.id = ($3) RETURNING *';
            let values = [autor.nome, autor.pais, id];
            await client.connect();
            const res = await client.query(text, values);
            const autores = res.rows;
            await client.end();
            return autores;
        }
    }

    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    })
}

async function deletar(id) {
    const listaLivros = liros.listar()
    for (let i = 0; i < listaLivros.length; i++) {
        if (listaLivros.autor == id) {
            throw ({
                numero: 405,
                msg: "Erro: autor está vinculado a um livro"
            })
        }
    }

    const listaAutores = listar();
    for (let i = 0; i < listaAutores.length; i++) {
        if (listaAutores[i].id == id) {
            let text = "DELETE FROM autores WHERE autores.id = ($1) RETURNING *";
            let values = [id];
            await client.connect();
            const res = await client.query(text, values);
            const autores = res.rows;
            await client.end();
            return autores;
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