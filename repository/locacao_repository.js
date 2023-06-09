const dt = require('../dataset');
const cmn = require('./communs_repository');

function listar() {
    return dt.locados;
}

function listarPorId(id) {
    for (const i of dt.locados) {
        if (i.id == id) {
            return i;
        } 
    }
    throw ({
        numero: 404,
        msg: "Erro: registro não encontrado."
    })
}

function devolver(locado){
    if (!locado && !locado.id && !locado.livro && !locado.cliente) {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros estão inválidos."
        })
    }
    
    for (let i = 0; i < dt.locados.length; i++) {
        if (dt.locados[i].id == locado.id) {
            for (let j = 0; j < dt.livros.length; j++) {
                if (dt.livros[j].id == locado.livro) {
                    for (let m = 0; m < dt.clientes.length; m++) {
                        if (dt.clientes[m].id == locado.id && dt.clientes[m].livros) {
                            let dataEntrega = Date.now();
                            let dataPrevista = Date.parse(dt.locado[i].previsao);
                            
                            for (let n = 0; 0 < dt.clientes[m].livros.length; n++) {
                                if (dt.clientes[m].livros[n].id == locado.id) {
                                    dt.clientes[m].livros.splice(n, 1);
                                }
                            }
                            dt.livros[j].status = true;
                            dt.locados.splice(i, 1);
                            if (dataEntrega > dataPrevista) {
                                locado.atraso = true;
                            } else {
                                locado.atraso = false;
                            }
                            return locado;
                        }
                    }
                    throw({
                        numero: 404,
                        msg: "Erro: Cliente inválido."
                    })
                }
            }
            throw ({
                numero: 404,
                msg: "Erro: Livro inválido."
            })
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Registro para devolução não encontrado."
    })
}

function alugar(locado){
    if (locado && locado.cliente && locado.livor && locado.dataLocacao && locado.previsao) {
        for (let i=0; i < dt.livros.length; i++) {
            if (dt.livros[i].id == locado.livro && dt.livros[i].status == true) {
                for (let j = 0; j < dt.clientes; j++) {
                    if (dt.clientes[j].id == locado.cliente){
                        if (!dt.cliente[j].livros) {
                            let data1 = new Date(locado.dataLocacao);
                            let data2 = new Date(locado.previsao);
                            let d1 = Date.parse(locado.dataLocacao);
                            let d2 = Date.parse(locado.previsao);
                            if (!isNaN(data1) && !isNaN(data2) &&  d1 >= d2) {
                                let id = cmn.gerarId(dt.locados);
                                locado.id = id;
                                dt.clientes[j].livros = {
                                    "id": dt.livro[i].id,
                                    "Nome": dt.livro[i].nome,
                                    "Emprestado": locado.dataLocacao,
                                    "Devolver": locado.previsao
                                }
                                dt.livros[i].status = false;
                                dt.locados.push(locado);
                                return locado;
                            } else {
                                throw ({
                                    numero: 405,
                                    msg: "Erro: Data inválida."
                                })
                            }
                        } else {
                            if (dt.cliente[j].livros.length >= 3) {
                                throw ({
                                    numero: 405,
                                    msg: "Erro: Cliente excedeu o limite de livros."
                                })
                            }
                            let data1 = new Date(locado.dataLocacao);
                            let data2 = new Date(locado.previsao);
                            let d1 = Date.parse(locado.dataLocacao);
                            let d2 = Date.parse(locado.previsao);
                            if (!isNaN(data1) && !isNaN(data2) &&  d1 >= d2) {
                                let id = cmn.gerarId(dt.locados);
                                locado.id = id;
                                dt.clientes[j].livros.push({
                                    "id": dt.livro[i].id,
                                    "Nome": dt.livro[i].nome,
                                    "Emprestado": locado.dataLocacao,
                                    "Devolver": locado.previsao
                                });
                                dt.livros[i].status = false;
                                dt.locados.push(locado);
                                return locado;
                            } else {
                                throw ({
                                    numero: 405,
                                    msg: "Erro: Data inválida."
                                })
                            }
                        }
                        
                    }
                }
                throw ({
                    numro: 404,
                    msg: "Erro: Cliente indisponível."
                })
            }
        }
        throw ({
            numero: 404,
            msg: "Erro: Livro indisponível."
        })
    } else {
        throw({
            numero: 400,
            msg: "Erro: Os paramentros estão incorretos."
        })
    }

}

module.exports = {
    alugar,
    devolver,
    listar,
    listarPorId
}