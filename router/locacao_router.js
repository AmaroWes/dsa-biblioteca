const express = require('express');

const locacaoController = require('../controller/locacao_controller');

const router = express.Router();

router.get('/', locacaoController.listar);
router.get('/:id', locacaoController.listarPorId);
router.post('/', locacaoController.alugar);
router.delete('/:id', locacaoController.devolver);

module.exports = router;