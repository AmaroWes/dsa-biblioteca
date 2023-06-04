const dataset = require('./dataset')

class Clientes {
    verificarCliente() {
        try {
            let aux = dataset.clientes[0]['id'];
            return true;
        } catch {
            return false;
        }
    }

    gerarId() {
        let id = 1
        for (const i of dataset.clientes) {
            if (id < i["id"]) {
                id = i["id"];
            }
        }    
        id += 1;
        return id;
    }

    cadastrarCliente(matricula, nome, telefone, login, senha) {
        let id = 0;
        if (this.verificarCliente()) {
            id = this.gerarId();
            dataset.clientes.push({
                'id': id,
                'matricula': matricula,
                'nome': nome,
                'telefone': telefone,
                'login': login,
                'senha': senha
            })
        } else {
            id = 1;
            dataset.clientes.push({
                'id': id,
                'matricula': matricula,
                'nome': nome,
                'telefone': telefone,
                'login': login,
                'senha': senha
            })
        }
    }

    atualizarCliente(id, df) {
        let count = 0;
        if (this.verificarCliente()) {
            for (const i of dataset.clientes) {
                if (i["id"] === id) {
                    dataset.clientes[count]["matricula"] = df["matricula"];
                    dataset.clientes[count]["nome"] = df["nome"];
                    dataset.clientes[count]["telefone"] = df["telefone"];
                    dataset.clientes[count]["login"] = df["login"];
                    dataset.clientes[count]["senha"] = df["senha"];
                }
                count++;
            }
        } else {
            return false
        }
    }

    deletarCliente(id) {
        let count = 0;
        if (this.verificarCliente()) {
            for (const i of dataset.clientes) {
                if (i["id"] === id) {
                    dataset.clientes.splice(count, 1);
                    return true;
                }
                count++;
            }
            return false;
        }
    }

    retornarCliente(id) {
        let count = 0;
        if (this.verificarCliente()) {
            for (const i of dataset.clientes) {
                if (i["id"] === id) {
                    return dataset.clientes[count];
                }
                count++;
            }
        }
        return false;
    }

    retornarClientes() {
        let msg = "";
        if (this.verificarCliente()) {
            for (const i of dataset.clientes) {
                let txt = "ID: " + i["id"] + " Matricula: " + 
                 i["matricula"] + " Nome: " + i["nome"] + " Login: " + 
                 i["login"] + " Senha: " + i["senha"] + "\n";
                msg += txt
            }
        } else {
            msg = "Não tem registro"
        }
        return msg
    }
}

module.exports = Clientes