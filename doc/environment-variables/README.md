# Configuración de Variables de Entorno

Este documento describe las variables de entorno necesarias para la configuración y ejecución de la aplicación. Asegúrate de configurar estas variables correctamente en tu entorno antes de iniciar la aplicación.

## Variables de Entorno

### 1. `SEED_DB`

- **Descripción**: Indica si se debe poblar la base de datos con datos iniciales (seed data) al iniciar la aplicación.
- **Valores posibles**:
  - `True`: Poblar la base de datos con datos iniciales.
  - `False`: No poblar la base de datos con datos iniciales.
- **Ejemplo**: `SEED_DB=False`

### 2. `UPLOAD_PATH`

- **Descripción**: Especifica la ruta en el sistema de archivos donde se almacenarán los archivos cargados por los usuarios.
- **Ejemplo**: `UPLOAD_PATH=./uploads`

### 3. `PORT`

- **Descripción**: Define el puerto en el que el servidor de la aplicación escuchará las solicitudes.
- **Ejemplo**: `PORT=3001`

### 4. `APP_ENVIRONMENT`

- **Descripción**: Indica el entorno en el que se está ejecutando la aplicación. Esto puede afectar cómo se configuran ciertos aspectos de la aplicación (por ejemplo, logging, manejo de errores, etc.).
- **Valores posibles**:
  - `development`: Entorno de desarrollo.
  - `production`: Entorno de producción.
  - `test`: Entorno de pruebas.
- **Ejemplo**: `APP_ENVIRONMENT=development`

### 5. `MONGO_URI_LOCAL`

- **Descripción**: URI de conexión a la base de datos MongoDB en el entorno local.
- **Ejemplo**: `MONGO_URI_LOCAL=mongodb://localhost/learn-horizon-backend-2`

### 6. `MONGO_URI_REMOTE`

- **Descripción**: URI de conexión a la base de datos MongoDB en un entorno remoto. Generalmente se utiliza para conectarse a una base de datos en la nube, como MongoDB Atlas.
- **Formato**: `mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base_de_datos>`
- **Ejemplo**: `MONGO_URI_REMOTE=mongodb+srv://user:password@cluster.mongodb.net/mydatabase`

## Notas Adicionales

- **Seguridad**: Asegúrate de que las variables de entorno que contienen información sensible, como `MONGO_URI_REMOTE`, estén protegidas y no se incluyan en el control de versiones (por ejemplo, en un archivo `.env` que esté en `.gitignore`).
- **Cambio de Entorno**: Puedes cambiar el entorno de la aplicación ajustando el valor de `APP_ENVIRONMENT`. Esto es especialmente útil para realizar pruebas en un entorno diferente sin modificar el código fuente.

## Configuración en `.env`

Puedes crear un archivo `.env` en el directorio raíz de tu proyecto y definir las variables de entorno de la siguiente manera:

```dotenv
SEED_DB=False
UPLOAD_PATH=./uploads
PORT=3001

# JWT
APP_ENVIRONMENT=development
MONGO_URI_LOCAL=mongodb://localhost/learn-horizon-backend-2
MONGO_URI_REMOTE=mongodb+srv://user:password@cluster.mongodb.net/mydatabase
```

Luego, asegúrate de que el archivo `.env` esté en tu `.gitignore` para evitar que se incluya en el control de versiones.
