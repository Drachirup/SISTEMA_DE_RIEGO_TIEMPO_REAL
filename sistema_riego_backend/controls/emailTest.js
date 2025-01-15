const EmailService = require("./EmailService"); // Asegúrate de que la ruta sea correcta

// Crear una instancia de EmailService
const emailService = new EmailService();

// Ejecutar pruebas manuales
(async () => {
  console.log("== Iniciando pruebas del servicio de correo ==");

  // Verificar la conexión al servidor SMTP
  await emailService.verifyConnection();

  // Enviar un correo de prueba
  await emailService.testEmail();

  console.log("== Pruebas finalizadas ==");
})();
