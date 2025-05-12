const mysql = require('../mysql');

exports.entraFila = async (req, res, next) => {
    try{
        const resultados = await mysql.execute(`
            INSERT INTO filas (id_user, id_ride) VALUES (?, ?)
            `,[res.locals.idUsuario, req.params.id_ride]);
            return res.status(201).send({"Mensagem": resultados});
    } catch (error){
        return res.status(500).send(error);
    }
}