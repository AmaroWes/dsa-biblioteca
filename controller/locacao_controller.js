const locacaoRepository = require('../repository/locacao_repository');

async function listar(req, res) {
    const listaLocacoes = await locacaoRepository.listar();
    res.json(listaLocacoes);
}

async function listarPorId(req, res) {
    const id = req.body.id;
    try {
        const locacao = await locacaoRepository.listarPorId(id);
        res.json(locacao);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function devolver(req, res) {
    const id = req.body.id;
    const locacao = req.body;
    try {
        const devolucao = await locacaoRepository.devolver(id, locacao);
        res.json(devolucao);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

async function alugar(req, res) {
    const locacao = req.body;
    try {
        const alugado = await locacaoRepository.alugar(locacao);
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