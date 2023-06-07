const jwt = require('jsonwebtoken');

const dt = require('../dataset');

const defaultPass = "123456789";

function login (usr) {
    if (usr && usr.nome && usr.senha && usr.nome == dt.adm.nome && usr.senha && dt.adm.senha) {
        let token = jwt.sign({nome: "admin"}, defaultPass, {expiresIn: '1h'});
        return token;
    } else {
        throw ({
            numero: 401,
            msg: "Usuário ou senha inválidos..."
        });
    }
}

module.exports = {login}