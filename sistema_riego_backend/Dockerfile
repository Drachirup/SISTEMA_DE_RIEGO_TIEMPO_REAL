# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install 

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 5006

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
