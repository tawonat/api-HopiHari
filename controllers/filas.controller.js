const mysql = require('../mysql');

exports.verificarBrinquedo = async (req, res, next) => {
    try {
        console.log('Verificando brinquedo ID:', req.params.idRide);
        
        const resultado = await mysql.execute(`
            SELECT * FROM atracoes WHERE id = ?;
        `, [req.params.idRide]);
        
        console.log('Resultado brinquedo:', resultado);

        if (resultado.length === 0) {
            return res.status(404).send({"Mensagem": "Brinquedo não encontrado!"});
        }
        
        res.locals.rideInfo = resultado[0];
        next();
    } catch(error) {
        console.error('Error em verificarBrinquedo:', error);
        return res.status(500).send({"Mensagem": error.message});
    }
}

exports.entraFila = async (req, res) => {
    try {
        console.log('Entrando na fila - Usuario:', res.locals.idUsuario, 'Brinquedo:', req.params.idRide);
        
        const resultados = await mysql.execute(`
            INSERT INTO hopi_hari_db.lines(id_user, id_ride) 
            VALUES (?, ?);
        `, [res.locals.idUsuario, req.params.idRide]);
        
        console.log('Resultado inserção:', resultados);
        
        return res.status(201).send({
            "Mensagem": "Entrada na fila realizada com sucesso",
            "dados": resultados
        });
    } catch (error) {
        console.error('Error em entraFila:', error);
        return res.status(500).send({"Mensagem": error.message});
    }
}