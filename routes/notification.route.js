const express = require('express');
const router = express.Router();
const login = require('../middleware/usuarios.midware');
const notificationController = require('../controllers/notification.controller');

router.get('/', login.required, notificationController.getNotification );  
router.put('/:idNotification', login.required, notificationController.putNotification );

module.exports = router;