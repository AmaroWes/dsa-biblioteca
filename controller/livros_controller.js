const livrosRepository = require('../repository/livros_repository');

function listar (req, res) {
    const listaDeLivros = livrosRepository.listar();
    res.json(listaDeLivros);
}

function listarPorId (req, res) {
    const id = req.params.id;
    console.log(id);
    try {
        const livro = livrosRepository.listarPorId(id);
        res.json(livro);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function inserir (req, res) {
    const livro = req.body;
    try {
        const livroInserido = livrosRepository.inserir(livro);
        res.status(201).json(livroInserido);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function atualizar (req, res) {
    const id = req.params.id;
    const livro = req.body;
    try {
        const livroAtualizado = livrosRepository.atualizar(id, livro);
        res.json(livroAtualizado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function deletar (req, res) {
    const id = req.params.id;
    try {
        const livroDeletado = livrosRepository.deletar(id);
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
