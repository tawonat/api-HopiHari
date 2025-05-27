const mysql = require('../mysql');

exports.cadastrarBrinquedo = async (req, res) => {
    try{
        const resultados = await mysql.execute(`
            INSERT INTO atracoes (name, tempo_espera, status, area)
            VALUES (?, ?, ?, ?)'
            `,[
                req.body.name,
                req.body.waiting_time,
                req.body.status,
                req.body.area
            ]);
            return res.status(201).send({
                "Mensagem": "Brinquedo cadastrado com sucesso!",
                "resultados": resultados
            });
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.getBrinquedosByAreaName = async (req, res) => {

 try{
    resultados = await mysql.execute(`
        SELECT * FROM atracoes WHERE area_id = (
            SELECT id FROM area WHERE nome = ?
            );
        `, [req.params.areaName]);

        if (resultados.length == 0) {
            return res.status(404).send({"Mensagem": "Área do parque não encontrada!"});
        }
        
        return res.status(200).send({
            "Mensagem": "Brinquedos encontrados com sucesso!",
            "resultados": resultados
        });

 } catch(error) {
    return res.status(500).send(error);
 }

};