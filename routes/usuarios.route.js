const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuario.controller"); //linka as rotas com o controller
const login = require ("../middleware/usuarios.midware"); //linka as rotas com o middleware


router.post("/login", usuariosController.loginUsuario); //puxa a rota de login do controller

router.post("/cadastro", usuariosController.cadastrarUsuario); //puxa a rota de cadastro do controller

router.put("/:id", login.required, usuariosController.atualizarUsuario); //puxa a rota de atualizar do controller

router.delete("/:id", usuariosController.deletarUsuario); //puxa a rota de deletar do controller


module.exports = router;