const livroRepository = require('./repository/livros_repository');
const autorRepository = require('./repository/autores_repository');
const clienteRepository = require('./repository/clientes_repository');
const locacaoRepository = require('./repository/locacao_repository');
const communRepository = require('./repository/communs_repository');

//Listas do livro
let listaLivroCadastradaEsperada = [
    {
        "id": 1,
        "nome": "Livro 1",
        "autor": 1,
        "isbn": 1,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    },
    {
        "id": 2,
        "nome": "Livro 2",
        "autor": 1,
        "isbn": 2,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    },
    {
        "id": 3,
        "nome": "Livro 3",
        "autor": 1,
        "isbn": 3,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    }
];

let listaLivroAtualizadaEsperada = [
    {
        "id": 1,
        "nome": "Livro 4",
        "autor": 1,
        "isbn": 1,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    },
    {
        "id": 2,
        "nome": "Livro 2",
        "autor": 1,
        "isbn": 2,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    },
    {
        "id": 3,
        "nome": "Livro 3",
        "autor": 1,
        "isbn": 3,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    }
];

let listaLivroDeletadoEsperada = [
    {
        "id": 2,
        "nome": "Livro 2",
        "autor": 1,
        "isbn": 2,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    },
    {
        "id": 3,
        "nome": "Livro 3",
        "autor": 1,
        "isbn": 3,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
    }
];

let listaLivroListadoPorIdEsperada = {
    "id": 1,
    "nome": "Livro 1",
    "autor": 1,
    "isbn": 1,
    "editora": "editora",
    "ano": "2020-08-08",
    "status": true
};

//Lista do autor
let listaAutorCadastradaEsperada = [
    {
        "id": 1,
        "nome": "Autor 1",
        "pais": "Brasil"
    },
    {
        "id": 2,
        "nome": "Autor 2",
        "pais": "Brasil"
    },
    {
        "id": 3,
        "nome": "Autor 3",
        "pais": "Brasil"
    }
];

let listaAutorAtualizadaEsperada = [
    {
        "id": 1,
        "nome": "Autor 4",
        "pais": "Chile"
    },
    {
        "id": 2,
        "nome": "Autor 2",
        "pais": "Brasil"
    },
    {
        "id": 3,
        "nome": "Autor 3",
        "pais": "Brasil"
    }
];

let listaAutorDeletadoEsperada = [
    {
        "id": 2,
        "nome": "Autor 2",
        "pais": "Brasil"
    },
    {
        "id": 3,
        "nome": "Autor 3",
        "pais": "Brasil"
    }
];

let listaAutorListadoPorIdEsperada = {
    "id": 1,
    "nome": "Autor 1",
    "pais": "Brasil"
};

//Lista do cliente
let listaClienteCadastradaEsperada = [
    {
        "id": 1,
        "matricula": "000", 
        "nome": "Cliente 1", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    },
    {
        "id": 2,
        "matricula": "000", 
        "nome": "Cliente 2", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    },
    {
        "id": 3,
        "matricula": "000", 
        "nome": "Cliente 3", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    }
];

let listaClienteAtualizadaEsperada = [
    {
        "id": 1,
        "matricula": "444", 
        "nome": "Cliente 4", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    },
    {
        "id": 2,
        "matricula": "000", 
        "nome": "Cliente 2", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    },
    {
        "id": 3,
        "matricula": "000", 
        "nome": "Cliente 3", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    }
];

let listaClienteDeletadoEsperada = [
    {
        "id": 2,
        "matricula": "000", 
        "nome": "Cliente 2", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    },
    {
        "id": 3,
        "matricula": "000", 
        "nome": "Cliente 3", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    }
];

let listaClienteListadoPorIdEsperada = {
    "id": 1,
    "matricula": "000", 
    "nome": "Cliente 1", 
    "telefone": "000-0000",
    "login": "login",
    "senha": "senha",
    "livros": []
};

//locacao
let listaLocadoListadoPorIdEsperado = {
    "id": 1,
    "livro": 1,
    "cliente": 1,
    "locado": "2020-08-08",
    "previsto": "2020-10-08"
}

beforeEach(() => {
    communRepository.limpar("livros");
    communRepository.limpar("autores");
    communRepository.limpar("clientes");
    communRepository.limpar("locados");
});

//Cenário de sucesso - listar livro
test('Listar livros sem cadastrar deve retornar vazio', () => {
    expect(livroRepository.listar()).toEqual([]);
});
//Cenário de sucesso - listar autores
test('Listar autores sem cadastrar deve retornar vazio', () => {
    expect(autorRepository.listar()).toEqual([]);
});
//Cenário de sucesso - listar cliente
test('Listar clientes sem cadastrar deve retornar vazio', () => {
    expect(clienteRepository.listar()).toEqual([]);
});
//Cenário de sucesso - listar locação
test('Listar locação sem cadastrar deve retornar vazio', () => {
    expect(locacaoRepository.listar()).toEqual([]);
});

//Cenário de sucesso - cadastrar autor
test('Cadastrar autor deve retornar os itens cadastrados', () => {
    let result = [{"id": 1, "nome": "Autor 1", "pais": "Brasil"}]
    expect(autorRepository.inserir(listaAutorCadastradaEsperada[0]))
        .toEqual(result);
});
//Cenário de sucesso - cadastrar livro
test('Cadatrar livros deve retornar os itens cadastrados', () => {
    let result = [{
        "ano": "2020-08-08", 
        "autor": 1, 
        "status": true, 
        "editora": "editora", 
        "id": 1, 
        "isbn": 1, 
        "nome": "Livro 1", 
        "status": true
    }];
    expect(livroRepository.inserir(listaLivroCadastradaEsperada[0]))
        .toEqual(result);
});
//Cenário de sucesso - cadastrar cliente
test('Cadatrar clientes deve retornar os itens cadastrados', () => {
    let result = [{
        "id": 1,
        "matricula": "000", 
        "nome": "Cliente 1", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    }];
    expect(clienteRepository.inserir(listaClienteCadastradaEsperada[0]))
        .toEqual(result);
});
//Cenário de sucesso - cadastrar locações
test('Cadastrar locações deve retornar os itens cadastrados', () => {
    let result = [{
        "id": 1,
        "livro": 1,
        "locado": "2020-08-08",
        "previsto": "2020-10-08",
        "cliente": 1 
    }];
    expect(locacaoRepository.alugar(result[0])).toEqual(result);
});
//Cenário sucesso - listar por ID locações
test('Retornar locações por ID deve retornar o item cadastrado', () => {
    expect(locacaoRepository.listarPorId(1)).toEqual(listaLocadoListadoPorIdEsperado)
});
//Cenário sucesso - devolver locações
test('Devolver livro deve retirar o livro da lista de locados', () => {
    let result = {"id": 1, "livro": 1, "cliente": 1}
    expect(locacaoRepository.devolver(result)).toEqual([]);
});

//Cenário de sucesso - retornar por Id livro
test('Retornar livro por ID deve retornar o item cadastrado', () => {
    expect(livroRepository.listarPorId(1)).toEqual(listaLivroListadoPorIdEsperada);
});
//Cenário de sucesso - retornar por Id cliente
test('Retornar cliente por ID deve retornar o item cadastrado', () => {
    expect(clienteRepository.listarPorId(1)).toEqual(listaClienteListadoPorIdEsperada);
});
//Cenário de sucesso - retornar por Id autor
test('Retornar autor por ID deve retornar o item cadastrado', () => {
    expect(autorRepository.listarPorId(1)).toEqual(listaAutorListadoPorIdEsperada);
});

//Cenário de sucesso - Atualizar livro
test('Atualizar livro deve retornar alteração', () => {
    let livros = [{
        "ano": "2020-08-08", 
        "autor": 1, 
        "status": true, 
        "editora": "editora", 
        "isbn": 2, 
        "nome": "Livro 2", 
        "status": true
    },
    {
        "ano": "2020-08-08", 
        "autor": 1, 
        "status": true, 
        "editora": "editora", 
        "isbn": 3, 
        "nome": "Livro 3", 
        "status": true
    }];
    let livro = {
        "id": 1,
        "nome": "Livro 4",
        "autor": 1,
        "isbn": 1,
        "editora": "editora",
        "ano": "2020-08-08",
        "status": true
        
    }
    livroRepository.inserir(livros[0]);
    livroRepository.inserir(livros[1]);
    expect(livroRepository.atualizar(1, livro)).toEqual(listaLivroAtualizadaEsperada)
});
//Cenário de sucesso - Atualizar cliente
test('Atualizar cliente deve retornar alteração', () => {
    let clientes = [{
        "id": 2,
        "matricula": "000", 
        "nome": "Cliente 2", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    },
    {
        "id": 3,
        "matricula": "000", 
        "nome": "Cliente 3", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    }];
    let cliente = {
        "id": 1,
        "matricula": "444", 
        "nome": "Cliente 4", 
        "telefone": "000-0000",
        "login": "login",
        "senha": "senha",
        "livros": []
    };
    clienteRepository.inserir(clientes[0]);
    clienteRepository.inserir(clientes[1]);
    expect(clienteRepository.atualizar(1, cliente)).toEqual(listaClienteAtualizadaEsperada);
});
//Cenário de sucesso - Atualizar autor
test('Atualizar autor deve retornar alteração', () => {
    let autores = [
        {
            "id": 2,
            "nome": "Autor 2",
            "pais": "Brasil"
        },
        {
            "id": 3,
            "nome": "Autor 3",
            "pais": "Brasil"
        }
    ];
    let autor = {
        "id": 1,
        "nome": "Autor 4",
        "pais": "Chile"
    }
    autorRepository.inserir(autores[0]);
    autorRepository.inserir(autores[1]);
    expect(autorRepository.atualizar(1, autor)).toEqual(listaAutorAtualizadaEsperada);
});

//Cenário de sucesso - deletar livro
test('Deletar livro deve retornar alterações realizadas', () => {
    expect(livroRepository.deletar(1)).toEqual(listaLivroDeletadoEsperada);
});
//Cenário de sucesso - deletar cliente
test('Deletar cliente deve retornar alterações realizadas', () => {
    expect(clienteRepository.deletar(1)).toEqual(listaClienteDeletadoEsperada);
});
//Cenário de sucesso - deletar autor
test('Deletar autor deve retornar alterações realizadas', () => {
    expect(autorRepository.deletar(1)).toEqual(listaAutorDeletadoEsperada);
});
