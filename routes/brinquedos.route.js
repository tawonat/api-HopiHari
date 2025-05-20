const express = require("express");
const router = express.Router();
const login = require("../middleware/usuarios.midware");
const brinquedosController = require("../controllers/brinquedos.controller");

router.post('/', 
    login.required, 
    login.userRequired, 
    brinquedosController.cadastrarBrinquedo
);

module.exports = router;
