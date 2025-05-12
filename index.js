const express = require("express");
const app = express();
const cors = require("cors");   
const helmet = require("helmet");
const bodyParser = require("body-parser");

const usuariosRoute = require("./routes/usuarios.route");
const filasRoute = require("./routes/filas.route");

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({extended: false})); //aqui define como o bodyparser vai codificar, colocamos false pra não codificar
app.use(bodyParser.json()); //bodyParser transforma o body em json

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    }
    next();
});

app.use('/usuarios', usuariosRoute); //define a url utilizada
app.use('/filas', filasRoute); //define a url utilizada


module.exports = app;