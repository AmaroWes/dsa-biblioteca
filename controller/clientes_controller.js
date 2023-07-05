const clientesRepository = require('../repository/clientes_repository');

async function listar (req, res) {
    const listaDeClientes = await clientesRepository.listar();
    res.json(listaDeClientes);
}

async function listarPorId (req, res) {
    const id = req.params.id;
    try {
        const cliente = await clientesRepository.listarPorId(id);
        res.json(cliente);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function inserir (req, res) {
    const cliente = req.body;
    try {
        const clienteInserido = await clientesRepository.inserir(cliente);
        res.status(201).json(clienteInserido);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function atualizar (req, res) {
    const id = req.params.id;
    const cliente = req.body;
    try {
        const clienteAtualizado = await clientesRepository.atualizar(id, cliente);
        res.json(clienteAtualizado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function deletar (req, res) {
    const id = req.params.id;
    try {
        const clienteDeletado = await clientesRepository.deletar(id);
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
