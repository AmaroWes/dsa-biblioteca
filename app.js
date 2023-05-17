const express = require('express')
const app = express()
const PORT = 3000


app.get('/', (req, res) => {
    res.send("Hello world");
})

app.get('/biblioteca', (req, res) => {
    res.send("Listagem de livros");
})

app.get('/biblioteca/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Buscar pelo id: ${id}`);
})

app.post('/biblioteca', (req, res) => {
    res.send('Cadastramento completo');
})

app.put('/biblioteca/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Atualizando o produto com o id: ${id}`);
})

app.delete('/biblioteca/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Deletando o produto com o id: ${id}`);
})

app.listen(PORT, () => {
    console.log('Servidor iniciado com sucesso...');
})