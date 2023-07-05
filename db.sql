CREATE TABLE autores (
    id_autor serial primary key,
    nome varchar(30) not null,
    pais varchar(30) not null
);

CREATE TABLE clientes (
    id_cliente serial primary key,
    nome varchar(30) not null,
    telefone varchar(30),
    email varchar(30) not null,
    senha varchar(30) not null
);

CREATE TABLE livros (
    id_livro serial primary key,
    nome varchar(30) not null,
	isbn varchar(30) not null,
    id_autor int not null,
    editora varchar(30) not null,
    ano varchar(30) not null,
    liberado boolean,
    FOREIGN KEY (id_autor) REFERENCES autores (id_autor)
);

CREATE TABLE locados (
    id_locado serial primary key,
    id_livro int not null,
    id_cliente int not null,
    data_prevista varchar(30) not null,
    data_entrada varchar(30) not null,
    FOREIGN KEY (id_livro) REFERENCES livros (id_livro),
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);