var express = require('express');
var router = express.Router();

const NotificacionAlertaController = require('../controls/notificacionAlerta');
let notificacionAlertaController = new NotificacionAlertaController();
const EmailController = require('../controls/EmailService');
let emailController = new EmailController();

/* GET datos actuales del ESP32. */
router.get('/datos', function (req, res, next) {
    notificacionAlertaController.getEspData(req, res);
});

/* POST para forzar obtención de datos del ESP32 y procesarlos. */
router.post('/fetch-datos', function (req, res, next) {
    notificacionAlertaController.fetchEsp32Data(req, res);
});

/* POST para generar una alerta por correo. */
router.post('/generar/alerta', function (req, res, next) {
    notificacionAlertaController.sendEmail(req, res);
});

/* POST para generar una alerta por correo. */
router.post('/generar/alerta2', function (req, res, next) {
  emailController.testEmail(req, res);
});

module.exports = router;
