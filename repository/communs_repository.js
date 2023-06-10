const dt = require('../dataset.json');

function gerarId(arr) {
    let id = 1;
    if (arr[0] == undefined) {
        return id;
    }
    for (const i of arr) {
        if (id < i["id"]) {
            id = i["id"];
        }
    }
    id += 1;
    return id;
}

function limpar(indice) {
    dt.indice = {}
}

module.exports = {
    gerarId,
    limpar
}