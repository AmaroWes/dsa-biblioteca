const express = require('express');

const livrosController = require('../controller/livros_controller');

const router = express.Router();

router.get('/', livrosController.listar);
router.get('/:id', livrosController.listarPorId);
router.post('/', livrosController.inserir);
router.put('/:id', livrosController.atualizar);
router.delete('/:id', livrosController.deletar);

module.exports = router;