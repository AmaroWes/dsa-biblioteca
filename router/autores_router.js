const express = require('express');

const autoresController = require('../controller/autores_controller');

const router = express.Router();

router.get('/', autoresController.listar);
router.get('/:id', autoresController.listarPorId);
router.post('/', autoresController.inserir);
router.put('/:id', autoresController.atualizar);
router.delete('/:id', autoresController.deletar);

module.exports = router;