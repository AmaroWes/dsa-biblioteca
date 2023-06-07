const clientesRepository = require('../repository/clientes_repository');

function listar (req, res) {
    const listaDeClientes = clientesRepository.listar();
    res.json(listaDeClientes);
}

function listarPorId (req, res) {
    const id = req.params.id;
    try {
        const cliente = clientesRepository.buscarPorId(id);
        res.json(cliente);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function inserir (req, res) {
    const cliente = req.body;
    try {
        const clienteInserido = clientesRepository.inserir(cliente);
        res.status(201).json(clienteInserido);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function atualizar (req, res) {
    const id = req.params.id;
    const cliente = req.body;
    try {
        const clienteAtualizado = clientesRepository.atualizar(id, cliente);
        res.json(clienteAtualizado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function deletar (req, res) {
    const id = req.params.id;
    try {
        const clienteDeletado = clientesRepository.deletar(id);
        res.json(clienteDeletado);
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
