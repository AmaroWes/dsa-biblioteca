const loginRepository = require('../repository/login_repository');

function login (req, res) {
    const usr = req.body;
    try {
        const acesso = loginRepository.login(usr);
        res.json(acesso);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

module.exports = {login};