const dt = require('../dataset');
const cmn = require('./communs_repository');
const livro = require('./livros_repository');
const autor = require('./autores_repository');


function devolver(locado){}

function alugar(locado){
    if (locado && locado.cliente && locado.livor && locado.dataLocacao && locado.previsao) {
        for (let i=0; i < dt.livros.length; i++) {
            if (dt.livros[i] == locado.livro && dt.livros[i].status == true) {
                for (let j = 0; j < dt.clientes; j++) {
                    if (dt.clientes[j] == locado.cliente){
                        if (!dt.cliente[j].livros) {
                            let data1 = new Date(locado.dataLocacao);
                            let data2 = new Date(locado.previsao);
                            let d1 = Date.parse(locado.dataLocacao);
                            let d2 = Date.parse(locado.previsao);
                            if (!isNaN(data1) && !isNaN(data2) &&  d1 >= d2) {
                                console.log("here")
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
    devolver
}