const autoresRepository = require('../repository/autores_repository');

async function listar (req, res) {
    const listaDeAutores = await autoresRepository.listar();
    res.json(listaDeAutores);
}

async function listarPorId (req, res) {
    const id = req.params.id;
    try {
        const autor = await autoresRepository.listarPorId(id);
        res.json(autor);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function inserir (req, res) {
    const autor = req.body;
    try {
        const autorInserido = await autoresRepository.inserir(autor);
        res.status(201).json(autorInserido);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function atualizar (req, res) {
    const id = req.params.id;
    const autor = req.body;
    try {
        const autorAtualizado = await autoresRepository.atualizar(id, autor);
        res.json(autorAtualizado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function deletar (req, res) {
    const id = req.params.id;
    try {
        const autorDeletado = await autoresRepository.deletar(id);
        res.json(autorDeletado);
    } catch (err) {
        console.log(err);
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
