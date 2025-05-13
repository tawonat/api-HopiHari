const jwt = require('jsonwebtoken');

exports.required = async (req, res, next) => {
    try {
        res.locals.idUsuario = 0;

        const token = req.headers.authorization.split(" ") [1];
        const decode = jwt.decode(token, "SenhaMalucaProJWTvouFazerElaComplexa");

        if (decode.id){
            res.locals.idUsuario = decode.id;
            next(); 
        } else {
            return res.status(401).send("Mensagem: Usuário não autorizado!");
        }

    } catch(error) {
        return res.status(500).send({"Mensagem": error});
    }

}
