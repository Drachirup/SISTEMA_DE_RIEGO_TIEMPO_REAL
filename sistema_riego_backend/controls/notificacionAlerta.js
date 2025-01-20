const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

class NotificacionAlerta {
    constructor() {
        this.espData = {
            humedadSuelo: null,
            temperatura: null,
            humedadRelativa: null,
            nivelAgua: null,
            ph: null,
        };

        this.esp32Ip = "http://192.168.101.10"; // Cambia a la IP del ESP32
        this.esp32Endpoint = `${this.esp32Ip}/datos`;

        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "sistemaderiegotiemporeal@gmail.com",
                pass: "tboa mqeh nagp qjpn", // Contraseña de aplicación
            },
            logger: true,
            debug: true,
        });
    }

    // Verificar conexión SMTP
    async verifyConnection() {
        try {
            console.log("Verificando conexión con el servidor SMTP...");
            await this.transporter.verify();
            console.log("Conexión SMTP verificada con éxito.");
        } catch (error) {
            console.error("Error al verificar conexión SMTP:", error.message);
        }
    }

    // Enviar correos electrónicos
    async sendEmail(variable, valor, umbral, mensaje) {
        const mailOptions = {
            from: "Sistema de Riego <sistemaderiegotiemporeal@gmail.com>", // Dirección del remitente con un nombre más amigable
            to: "madeleycc15@gmail.com", // Dirección del destinatario
            subject: `⚠️ [ALERTA] ${variable} fuera del rango permitido ⚠️`, // Asunto más descriptivo
            text: `⚠️ ALERTA IMPORTANTE ⚠️
    
    Estimado usuario,
    
    Se ha detectado una anomalía en los parámetros de ${variable}. A continuación, los detalles:
    
    🌡️ Variable: ${variable}
    🚨 Valor actual: ${valor}
    ✅ Umbral permitido: ${umbral}
    
    📌 Mensaje: ${mensaje}
    
    Por favor, revise el sistema y tome las medidas necesarias para solucionar esta situación.
    
    Atentamente,
    🌱 Sistema de Riego en Tiempo Real 🌱
            `,
        };

        try {
            console.log("Enviando correo...");
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Correo enviado con éxito:", info.response);
        } catch (error) {
            console.error("Error al enviar el correo:", error.message);
        }
    }


    // Obtener datos del ESP32
    async fetchEsp32Data(req, res) {
        try {
            console.log("Obteniendo datos del ESP32...");
            const response = await fetch(this.esp32Endpoint);

            if (!response.ok) {
                throw new Error("Error al obtener los datos del ESP32");
            }

            const jsonResponse = await response.json();
            console.log("Datos recibidos del ESP32:", jsonResponse);

            if (!jsonResponse.data) {
                throw new Error("Los datos del ESP32 están vacíos o son inválidos.");
            }

            // Decodificar el contenido Base64
            const decodedData = JSON.parse(Buffer.from(jsonResponse.data, "base64").toString("utf-8"));
            console.log("Datos decodificados del ESP32:", decodedData);

            // Actualizar la información en la variable `espData`
            this.espData = {
                humedadSuelo: decodedData.humedadSuelo,
                temperatura: decodedData.temperatura,
                humedadRelativa: decodedData.humedadRelativa,
                nivelAgua: decodedData.nivelAgua,
                ph: decodedData.ph,
            };

            // Responder con los datos primero
            res.status(200).json({ message: "Datos obtenidos correctamente", data: this.espData });

            // Verificar umbrales y enviar alertas en segundo plano
            if (this.espData.humedadSuelo < 30) {
                this.sendEmail(
                    "Humedad del Suelo",
                    this.espData.humedadSuelo,
                    "30%",
                    "Humedad baja detectada."
                );
            }

            if (this.espData.temperatura > 35 || this.espData.temperatura < 15) {
                this.sendEmail(
                    "Temperatura",
                    this.espData.temperatura,
                    "15-35°C",
                    "Temperatura fuera del rango adecuado."
                );
            }
        } catch (error) {
            console.error("Error al obtener los datos del ESP32:", error.message);
            res.status(500).json({ error: "Error al obtener los datos del ESP32", details: error.message });
        }
    }

    // Obtener datos actuales del ESP32
    getEspData() {
        return this.espData;
    }
}

module.exports = NotificacionAlerta;
