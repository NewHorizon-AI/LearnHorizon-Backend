# Learn Horizon - Backend

Bienvenido al proyecto **Learn Horizon**, una plataforma diseñada para revolucionar la forma en que se comparten y estudian los modelos 3D. Este repositorio contiene el backend de la aplicación, desarrollado con **NestJS**, **Node.js**, **TypeScript**, y **MongoDB**. Nuestro objetivo es proporcionar una solución robusta y escalable para profesionales y estudiantes que deseen compartir, estudiar y utilizar modelos 3D en sus proyectos.

## Misión

La misión de **Learn Horizon** es ofrecer una plataforma accesible y poderosa donde se puedan compartir modelos 3D, facilitando su estudio y uso profesional. Buscamos conectar a la comunidad de diseñadores, ingenieros y educadores con recursos valiosos que promuevan el aprendizaje y la innovación.

## Tecnologías Utilizadas

- **NestJS**: Un framework para construir aplicaciones escalables y mantenibles en Node.js.
- **Node.js**: Entorno de ejecución para JavaScript en el lado del servidor.
- **TypeScript**: Un superconjunto de JavaScript que añade tipos estáticos y otras funcionalidades avanzadas.
- **MongoDB**: Base de datos NoSQL orientada a documentos, ideal para manejar grandes volúmenes de datos y ofrecer flexibilidad en el manejo de la información.
- **Docker**: Herramienta para crear y manejar contenedores, facilitando la portabilidad y consistencia del entorno de desarrollo y producción.

## Configuración y Ejecución

### Requisitos Previos

- Node.js 20.16 (LTS)
- Docker
- MongoDB (puede ejecutarse como contenedor Docker)

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/learn-horizon-backend.git
   cd learn-horizon-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` basado en el archivo `.env.example`.

### Desarrollo

Para iniciar el entorno de desarrollo:

1. **En PowerShell**:

   Establece la variable de entorno:

   ```powershell
   $env:NODE_ENV="development"
   ```

   Luego, levanta los servicios con Docker:

   ```powershell
   docker-compose up
   ```

2. **En Command Prompt (CMD)**:

   Establece la variable de entorno:

   ```cmd
   set NODE_ENV=development
   ```

   Luego, levanta los servicios con Docker:

   ```cmd
   docker-compose up
   ```

### Producción

Para preparar y ejecutar en producción:

1. **En PowerShell**:

   Establece la variable de entorno:

   ```powershell
   $env:NODE_ENV="production"
   ```

   Luego, levanta los servicios con Docker:

   ```powershell
   docker-compose up
   ```

2. **En Command Prompt (CMD)**:

   Establece la variable de entorno:

   ```cmd
   set NODE_ENV=production
   ```

   Luego, levanta los servicios con Docker:

   ```cmd
   docker-compose up
   ```
