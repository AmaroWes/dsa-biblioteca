const express = require('express');

const livrosRouter = require('./router/livros_router');
const autoresRouter = require('./router/autores_router');
const clientesRouter = require('./router/clientes_router');
const loginRouter = require('./router/login_router');
const locacaoRouter = require('./router/locacao_router');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/login', loginRouter);
app.use('/cliente', clientesRouter);
app.use('/autor', autoresRouter);
app.use('/livro', livrosRouter);
app.use('/locacao', locacaoRouter);

app.listen(PORT, () => {
    console.log("Server init");
})