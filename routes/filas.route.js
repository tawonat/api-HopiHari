const express = require("express");
const router = express.Router();
const login = require("../middleware/usuarios.midware");
const filaController = require("../controllers/filas.controller");

router.post ("/:idRide", 
    login.required, 
    filaController.verificarBrinquedo, 
    filaController.entraFila
);


module.exports = router;
