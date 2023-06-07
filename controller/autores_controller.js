const autoresRepository = require('../repository/autores_repository');

function listar (req, res) {
    const listaDeAutores = autoresRepository.listar();
    res.json(listaDeAutores);
}

function listarPorId (req, res) {
    const id = req.params.id;
    try {
        const autor = autoresRepository.buscarPorId(id);
        res.json(autor);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function inserir (req, res) {
    const autor = req.body;
    try {
        const autorInserido = autoresRepository.inserir(autor);
        res.status(201).json(autorInserido);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function atualizar (req, res) {
    const id = req.params.id;
    const autor = req.body;
    try {
        const autorAtualizado = autoresRepository.atualizar(id, autor);
        res.json(autorAtualizado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function deletar (req, res) {
    const id = req.params.id;
    try {
        const autorDeletado = autoresRepository.deletar(id);
        res.json(autorDeletado);
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
