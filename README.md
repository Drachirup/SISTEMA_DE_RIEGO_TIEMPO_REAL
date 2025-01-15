# Sistema de Riego en Tiempo Real

Este proyecto muestra un sistema interactivo para monitorear y visualizar en tiempo real parámetros ambientales relacionados con el riego, como:

- **Humedad del suelo**
- **Temperatura**
- **Humedad relativa**
- **Nivel de agua**
- **pH del agua**

El sistema incluye un backend y un frontend organizados en subdirectorios claros. Además, utiliza **Docker Compose** para facilitar su despliegue y gestión.

---

## 📂 Archivos y Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

- **`sistema_riego/`**: Contiene el código del frontend desarrollado con React.
- **`sistema_riego_backend/`**: Contiene el código del backend.
- **`docker-compose.yml`**: Archivo de configuración para Docker Compose, que define los servicios necesarios para ejecutar el proyecto.

---

## 🚀 Inicio Rápido

En el directorio del proyecto, puedes utilizar Docker Compose para configurar y ejecutar el sistema completo (frontend y backend):

### 1️⃣ **Construir y Ejecutar Servicios**

Ejecuta el siguiente comando para iniciar todos los servicios definidos:

```bash
 docker-compose up --build
```

Esto:
- Construirá las imágenes necesarias del frontend y backend.
- Creará y ejecutará los contenedores.

### 2️⃣ **Modo Desacoplado**

Para ejecutar los servicios en segundo plano:

```bash
 docker-compose up -d
```

---

## 🛠️ Comandos Útiles

### 📝 **Listar Servicios en Ejecución**

Verifica qué servicios están activos:

```bash
 docker-compose ps
```

### 🔄 **Reiniciar Servicios**

Reinicia un servicio específico:

```bash
 docker-compose restart <nombre-del-servicio>
```

### 🛑 **Detener Servicios**

Detiene todos los contenedores sin eliminarlos:

```bash
 docker-compose stop
```

### 🗑️ **Eliminar Contenedores y Volúmenes**

Detén y elimina todos los servicios y volúmenes creados:

```bash
 docker-compose down -v
```

---

## 🌐 Acceso a la Aplicación

Una vez iniciados los servicios, puedes acceder a los siguientes endpoints:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: Dependiendo de la configuración en el archivo `docker-compose.yml`.

---

## 📖 Aprender Más

Para más información sobre las tecnologías utilizadas:
- [Documentación de React](https://reactjs.org/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

¡Este proyecto está listo para facilitar el monitoreo de riego en tiempo real! 🌱
