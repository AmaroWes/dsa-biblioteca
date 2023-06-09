const locacaoRepository = require('../repository/locacao_repository');

function listar(req, res) {
    const listaLocacoes = locacaoRepository.listar();
    res.json(listaLocacoes);
}

function listarPorId(req, res) {
    const id = req.body.id;
    try {
        const locacao = locacaoRepository.listarPorId(id);
        res.json(locacao);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function devolver(req, res) {
    const locacao = req.body;
    try {
        const devolucao = locacaoRepository.devolver(locacao);
        res.json(devolucao);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function alugar(req, res) {
    const locacao = req.body;
    try {
        const alugado = locacaoRepository.alugar(locacao);
        res.json(alugado);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

module.exports = {
    listar,
    listarPorId,
    devolver,
    alugar
}