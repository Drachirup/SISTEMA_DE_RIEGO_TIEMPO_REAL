const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    // Configuración del transporte con logs habilitados
    this.transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "sistemaderiegotiemporeal@gmail.com",
          pass: "tboa mqeh nagp qjpn",
        },
        logger: true,
        debug: true,
        connectionTimeout: 100000, // 10 segundos
        socketTimeout: 100000, // 10 segundos
      });
      
  }

  // Método para probar la conexión con el servidor SMTP
  async verifyConnection() {
    try {
      console.log(`[${new Date().toISOString()}] Verificando conexión con el servidor SMTP...`);
      await this.transporter.verify();
      console.log(`[${new Date().toISOString()}] Conexión con el servidor SMTP verificada con éxito.`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error al verificar conexión:`, error.message);
    }
  }

  // Método para enviar un correo de prueba
  async testEmail() {
    try {
        const mailOptions = {
            from: "Sistema de Riego <sistemaderiegotiemporeal@gmail.com>", // Dirección del remitente con un nombre más amigable
            to: "madeleycc15@gmail.com", // Dirección del destinatario
            subject: `⚠️ [ALERTA] 15 fuera del rango permitido ⚠️`, // Asunto más descriptivo
            text: `⚠️ ALERTA IMPORTANTE ⚠️
    
    Estimado usuario,
    
    Se ha detectado una anomalía en los parámetros de 15. A continuación, los detalles:
    
    🌡️ Variable: 15
    🚨 Valor actual: 15
    ✅ Umbral permitido: 15
    
    📌 Mensaje: holiiii
    
    Por favor, revise el sistema y tome las medidas necesarias para solucionar esta situación.
    
    Atentamente,
    🌱 Sistema de Riego en Tiempo Real 🌱
            `,
        };

      console.log(`[${new Date().toISOString()}] Enviando correo...`);
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[${new Date().toISOString()}] Correo enviado con éxito:`, info.response);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error al enviar el correo de prueba:`, error.message);
    }
  }
}

module.exports = EmailService;
