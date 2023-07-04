const autores = require('./autores_repository')
const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca',
})

function validarIdAutor(id) {
    const listaAutores = autores.listar()
    for (let i in listaAutores) {
        if (i["id"] == id) {
            return true;
        }
    }
    return false;
}

async function inserir(livro){
    if (livro && livro.nome && livro.autor && livro.isbn && livro.editora && livro.ano) {
        if (livro.ano) {
            let novaData = new Date(livro.ano);
            if (!isNaN(novaData)) {
                if (validarIdAutor()) {
                    let text = 'INSERT INTO livros (nome, autor, isbn, editora, ano, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
                    let values = [livro.nome, livro.autor, livro.isbn, livro.editora, livro.ano, true];
                    await client.connect();
                    const res = await client.query(text, values);
                    const listaLivros = res.rows;
                    await client.end();
                    return listaLivros;
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

async function listar() {
    await client.connect();
    const res = await client.query('SELECT * FROM livros');
    const listaLivros = res.rows;
    await client.end();
    return listaLivros;
}

function listarPorId(id) {
    const listaLivros = listar()
    for(let i of listaLivros){ 
        if(i.id == id){
            return i;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Livro nao encontrado."
    });
}

async function atualizar(id, livro) {
    if (!livro && !livro.nome && !livro.autor && !livro.isbn && !livro.editora && !livro.ano && !livro.status) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estao invalidos."
        });
    }
    
    let novaData = new Date(livro.ano);
    if (!isNaN(novaData)) {
        if (validarIdAutor()) {
            const livros = listar();
            for (let i = 0; i < livros.length; i++) {
                if (livros[i].id == id) {
                    let text = 'UPDATE livros SET nome = $1, autor = $2, isbn = $3 editoa = $4, ano = $5 WHERE livros.id = $6 RETURNING *';
                    let values = [livro.nome, livro.autor, livro.isbn, livro.editora, livro.ano, id];
                    await client.connect();
                    const res = await client.query(text, values);
                    const listaLivros = res.rows;
                    await client.end();
                    return listaLivros;
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

async function atualizarStatus(id, livro) {
    if (livro && livro.status) {
        const livros = listar()
        for (let i = 0; i < livros.length; i++) {
            if (livros[i].id == id) {
                if (livro.status === true || livro.status === false) {
                    let text = 'UPDATE livros SET status = $1 WHERE livros.id = $2';
                    let values = [livro.status, id];
                    await client.connect();
                    const res = await client.query(text, values);
                    const listaLivros = res.rows;
                    await client.end();
                    return listaLivros;
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

async function deletar(id) {
    const listaLocados = locados.listar();
    for (let i = 0; listaLocados.length; i++) {
        if (listaLocados[i].livro == id) {
            throw ({
                numero: 405,
                msg: "Erro: O livro está em uso em uma locação"
            })
        }
    }

    const livros = listar();
    for (let i = 0; i < livros.length; i++) {
        if (livros[i].id == id) {
            let text = "DELETE FROM livros WHERE livros.id = ($1) RETURNING *";
            let values = [id];
            await client.connect();
            const res = await client.query(text, values);
            const listaLivros = res.rows;
            await client.end();
            return listaLivros;
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