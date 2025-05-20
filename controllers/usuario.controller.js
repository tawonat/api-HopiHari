const mysql = require('../mysql'); //biblioteca pro JS ler mysql 
const bcrypt = require('bcrypt'); //biblioteca pro JS fazer hash da senha
const jwt = require('jsonwebtoken'); //biblioteca pro JS fazer o token de autenticação 

const JWT_SECRET = "SenhaMalucaProJWTvouFazerElaComplexa"; //chave secreta do JWT, aqui só pra teste, depois tem que colocar no .env

//rota pra POST cadastrar o usuário
//aqui não precisa do id, pois o id é auto increment
exports.cadastrarUsuario = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const resultado = await mysql.execute(
            `INSERT INTO users (first_name, last_name, email, password, birth_date, phone) 
             VALUES (?, ?, ?, ?, ?, ?);`,
            [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, req.body.birth_date, req.body.phone]
        );

        // Fix: Add email reference and error checking
        const token = jwt.sign(
            { 
                id: resultado.insertId, 
                email: req.body.email 
            }, 
            JWT_SECRET,
            { expiresIn: '1h' } // tempo pro token expirar
        );
       
        return res.status(201).send({ 
            "Mensagem": "Usuário cadastrado com sucesso!", 
            "token": token,
            "userId": resultado.insertId 
        });
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        return res.status(500).send({
            "Mensagem": "Erro ao cadastrar usuário",
            "error": error.message
        });
    }
}

//rota de login
exports.loginUsuario = async (req, res) => {
    try {
        const resultado = await mysql.execute(
            `SELECT * FROM users WHERE email = ?`,
            [req.body.email]
        );
        if (resultado.length == 0) {
            return res.status(401).send({ "Mensagem": "Email ou senha inválidos!" });
        }

        //função pra fazer alguma coisa do hash, não faço a minima ideia doq eu fiz aqui mas ta funcionando então nem compensa mexer
        const senhacomparada = await bcrypt.compare(req.body.password, resultado[0].password); //compara a senha digitada com a senha do banco de dados
        if (!senhacomparada) {
            return res.status(401).send({ "Mensagem": "Email ou senha inválidos!" });
        }

        //ROTA PRA CRIPTOGRAFIA JWT
        const token = jwt.sign({
            id: resultado[0].id,
            first_name: resultado[0].first_name,
            last_name: resultado[0].last_name,
            email: resultado[0].email,
            birth_date: resultado[0].birth_date,
            phone: resultado[0].phone,
            admin: resultado[0].admin
        }, JWT_SECRET);

        return res.status(200).send({
            "Mensagem": "Usuário logado com sucesso!",
            "token": token,
        });
    } catch (error) {
        return res.status(500).send({"Mensagem": error});
    }
}


//rota pra PUT atualizar o usuário
exports.atualizarUsuario = async (req, res) => {
    try {
        const idUsuario = Number(req.params.id);

        const resultado = await mysql.execute(
            `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, birth_date = ?, phone = ? WHERE id = ?;`,
            [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.birth_date, req.body.phone, idUsuario]
        );
        return res.status(201).send({ "Mensagem": "Usuário atualizado com sucesso!", "Resultado": resultado });
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
            return res.status(404).send({ "Mensagem": "Usuário não encontrado!" });
        }

        return res.status(200).send({ "Mensagem": "Usuário deletado com sucesso!", "Resultado": resultado });
    } catch (error) {
        return res.status(500).send({"Mensagem": error});
    }
};

exports.JWT_SECRET = JWT_SECRET;