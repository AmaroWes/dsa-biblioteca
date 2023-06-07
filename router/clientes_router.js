const express = require('express');

const clientesController = require('../controller/clientes_controller');

const router = express.Router();

router.get('/', clientesController.listar);
router.get('/:id', clientesController.listarPorId);
router.post('/', clientesController.inserir);
router.put('/:id', clientesController.atualizar);
router.delete('/:id', clientesController.deletar);

module.exports = router;