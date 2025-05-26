const mysql = require('mysql2');
const connection = mysql.createConnection({ //criando a conexão com o banco de dados
    host: "localhost",
    user: "root",
    password: "root",
    database: "hopi_hari_db",
    port: 3306
})

exports.execute = (query, params = [], pool = connection) => {
    return new Promise ((resolve, reject) => {
        pool.query(query,params, (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};