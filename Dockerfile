# Etapa base: Se utiliza para instalar dependencias y preparar el entorno
FROM node:20.16-alpine as base

# Crear el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de npm
COPY package*.json ./

# Instalar todas las dependencias (producción + desarrollo)
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Etapa de construcción: Se compila TypeScript a JavaScript
FROM base as build

# Ejecutar la compilación de TypeScript a JavaScript
RUN npm run build

# Etapa de producción: Se prepara la imagen final para producción
FROM node:20.16-alpine as production

# Crear el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Exponer el puerto en el que corre la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación en producción
CMD ["npm", "run", "start:prod"]
