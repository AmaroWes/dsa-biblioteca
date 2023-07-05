const autores = require('./autores_repository')
const { Client } = require('pg')

const conection = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca'
}

function validarIdAutor(id) {
    const listaAutores = autores.listarPorId(id)
    if (!listaAutores) {
        return false;
    }
    return true;
}

async function inserir(livro){
    if (livro && livro.nome && livro.autor && livro.isbn && livro.editora && livro.ano) {
        if (livro.ano) {
            let novaData = new Date(livro.ano);
            if (!isNaN(novaData)) {
                if (validarIdAutor()) {
                    const client = new Client(conection);
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
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM livros');
    const listaLivros = res.rows;
    await client.end();
    return listaLivros;
}

async function listarPorId(id) {
    const client = new Client(conection);
    await client.connect();
    const res = await client.query('SELECT * FROM livros WHERE id_livro = $1', [id]);
    const listaLivros = res.rows[0];
    await client.end();
    return listaLivros;
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

            const livros = listarPorId(livro.id);
            if (!livros) {
                throw ({
                    numero: 404,
                    msg: "Erro: Livro nao encontrado."
                })
            }
            
            const client = new Client(conection);
            let text = 'UPDATE livros SET nome = $1, autor = $2, isbn = $3 editoa = $4, ano = $5 WHERE id_livro = $6 RETURNING *';
            let values = [livro.nome, livro.autor, livro.isbn, livro.editora, livro.ano, id];
            await client.connect();
            const res = await client.query(text, values);
            const listaLivros = res.rows;
            await client.end();
            return listaLivros;
                
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
        const livros = listarPorId(id);
        if (!livros) {
            throw ({
                numero: 404,
                msg: "Erro: Livro não encontrado."
            })
        }

        if (livro.status === true || livro.status === false) {
            const client = new Client(conection);
            let text = 'UPDATE livros SET status = $1 WHERE id_livro = $2';
            let values = [livro.status, id];
            await client.connect();
            const res = await client.query(text, values);
            const listaLivros = res.rows;
            await client.end();
            return listaLivros;
        }

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

    const livros = listarPorId(id);
    if (!livros) {
        throw ({
            numero: 404,
            msg: "Erro: Livro não encontrado."
        })
    }

    const client = new Client(conection);
    let text = "DELETE FROM livros WHERE id_livro = $1 RETURNING *";
    let values = [id];
    await client.connect();
    const res = await client.query(text, values);
    const listaLivros = res.rows;
    await client.end();
    return listaLivros;

}

module.exports = {
    inserir,
    listar,
    listarPorId,
    atualizar,
    atualizarStatus,
    deletar
}