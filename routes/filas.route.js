const express = require("express");
const router = express.Router();
const login = require("../middleware/usuarios.midware");

router.post ("/", login.required, () => {console.log("Rota de Fila")});

module.exports = router;
