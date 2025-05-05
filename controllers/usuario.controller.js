const mysql = require('../mysql'); //biblioteca pro JS ler mysql 
const bcrypt = require('bcrypt'); //biblioteca pro JS fazer hash da senha

//rota pra POST cadastrar o usuário
//aqui não precisa do id, pois o id é auto increment
exports.cadastrarUsuario = async (req, res) => {
    try{

const hashedPassword = await bcrypt.hash(req.body.password, 10); //faz o hash da senha

        const resultado = await mysql.execute(
            `INSERT INTO users (first_name, last_name, email, password, birth_date) VALUES (?, ?, ?, ?, ?);`,
            [req.body.first_name,req.body.last_name,req.body.email,hashedPassword,req.body.birth_date] //aqui já coloca a senha com hash
        );
        return res.status(201).send({"Mensagem": "Usuário cadastrado com sucesso!", "Resultado": resultado});
    } catch (error) {
        return res.status(500).send({"Mensagem": error});
    }
}

//rota de login
exports.loginUsuario = async (req, res) => {
    try{
        const resultado = await mysql.execute(
            `SELECT * FROM users WHERE email = ?`,
            [req.body.email]
        );
        if (resultado.length == 0){
            return res.status(401).send({"Mensagem": "Email ou senha inválidos!"});
        }
        
//função pra fazer alguma coisa do hash, não faço a minima ideia doq eu fiz aqui mas ta funcionando então nem compensa mexer
        const senhacomparada = await bcrypt.compare(req.body.password, resultado[0].password); //compara a senha digitada com a senha do banco de dados
        if (!senhacomparada){
            return res.status(401).send({"Mensagem": "Email ou senha inválidos!"});
        }

        return res.status(201).send({"Mensagem": "Usuário logado com sucesso!", "Resultado": resultado});
    } catch (error) {
        return res.status(500).send({"Mensagem": error});
    }
}

//rota pra PUT atualizar o usuário
exports.atualizarUsuario = async (req, res) => {
    try{
        const idUsuario = Number(req.params.id);

        const resultado = await mysql.execute(
            `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, birth_date = ? WHERE id = ?;`,
            [req.body.first_name,req.body.last_name,req.body.email,req.body.password,req.body.birth_date,idUsuario]
        );
        return res.status(201).send({"Mensagem": "Usuário atualizado com sucesso!", "Resultado": resultado});
    } catch (error) {
        return res.status(500).send({"Mensagem": error});
    }
}

//rota DELETE deletar o usuário
exports.deletarUsuario = async (req, res) => {
    const idUsuario = Number(req.params.id);
    try {
        const resultado = await mysql.execute(
            `DELETE FROM users WHERE id = ?;`,
            [idUsuario]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).send({"Mensagem": "Usuário não encontrado!"});
        }

        return res.status(200).send({"Mensagem": "Usuário deletado com sucesso!", "Resultado": resultado});
    } catch (error) {
        return res.status(500).send({"Mensagem": error});
    }
};