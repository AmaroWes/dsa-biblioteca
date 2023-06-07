function gerarId(arr) {
    let id = 1;
    if (!arr[0]["id"]) {
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

module.exports = {gerarId}