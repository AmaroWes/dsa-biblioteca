const autores = require('./autor');
const livros = require('./livro');
const clientes = require('./cliente');

const autor = new autores;
const livro = new livros; 
const cliente = new clientes;

let dfAutor = {"nome": "A66", "pais": "Z"}
let dfLivro = {"nome": "Rosa", "autor": 1, "isbn": 10, "editora": "Montreal", "ano": "2020-08-08"}
let dfCliente = {"matricula": 29, "nome": "Juninho Bacana", "telefone": "000-0000", "login": "juninho69@gmail.com", "senha": "nao"}

autor.cadastrarAutor("A1D", "B");
autor.cadastrarAutor("A2D", "B");
autor.cadastrarAutor("A3D", "B");
autor.cadastrarAutor("A4D", "B");
autor.cadastrarAutor("A5D", "B");
console.log(autor.retornarAutores());
console.log(autor.retornarAutor(1));
autor.deletarAutor(3);
console.log(autor.retornarAutores());
autor.atualizarAutor(1, dfAutor);
console.log(autor.retornarAutores());

console.log("\nFinal dos testes CRUD Autor\n");

livro.cadastrarLivros("Azul", 1, 10, "Montreal", "2020-08-08");
livro.cadastrarLivros("Cinza", 1, 30, "Montreal", "2020-08-08");
livro.cadastrarLivros("Preto", 1, 20, "Montreal", "2020-08-08");
livro.cadastrarLivros("Branco", 1, 40, "Montreal", "2020-08-08");
livro.cadastrarLivros("Vermelho", 1, 50, "Montreal", "2020-08-08");
console.log(livro.retornarLivros());
console.log(livro.retornarLivro(1));
livro.deletarLivros(4);
console.log(livro.retornarLivros());
livro.atualizarLivro(1, dfLivro);
console.log(livro.retornarLivros());

console.log("\nFinal dos testes CRUD Livro\n");

cliente.cadastrarCliente("01", "Ricardoson", "000-0000", "rickricoso@gmail.com", "sim");
cliente.cadastrarCliente("02", "Jonathan", "000-0000", "jonathandelas@gmail.com", "sim");
cliente.cadastrarCliente("03", "Roberto Carlos", "000-0000", "carlinhosdevedor@gmail.com", "sim");
cliente.cadastrarCliente("04", "Latrell", "000-0000", "makingmywaydowntown@gmail.com", "sim");
cliente.cadastrarCliente("05", "Sergio Borgas", "000-0000", "borgasbogo@gmail.com", "sim");
console.log(cliente.retornarClientes());
console.log(cliente.retornarCliente(1));
cliente.deletarCliente(2);
console.log(cliente.retornarClientes());
cliente.atualizarCliente(1, dfCliente);
console.log(cliente.retornarClientes())

console.log("\nFinal dos testes CRUD Cliente\n");