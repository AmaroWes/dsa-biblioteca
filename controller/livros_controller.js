const livrosRepository = require('../repository/livros_repository');

async function listar (req, res) {
    const listaDeLivros = await livrosRepository.listar();
    res.json(listaDeLivros);
}

async function listarPorId (req, res) {
    const id = req.params.id;
    console.log(id);
    try {
        const livro = await livrosRepository.listarPorId(id);
        res.json(livro);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function inserir (req, res) {
    const livro = req.body;
    try {
        const livroInserido = await livrosRepository.inserir(livro);
        res.status(201).json(livroInserido);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function atualizar (req, res) {
    const id = req.params.id;
    const livro = req.body;
    try {
        const livroAtualizado = await livrosRepository.atualizar(id, livro);
        res.json(livroAtualizado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function deletar (req, res) {
    const id = req.params.id;
    try {
        const livroDeletado = await livrosRepository.deletar(id);
        res.json(livroDeletado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

module.exports = {
    listar,
    listarPorId,
    inserir,
    atualizar,
    deletar
}
