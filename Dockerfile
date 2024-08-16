# Etapa base común para ambos entornos
FROM node:20.16 as base

# Crear directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todos los archivos del proyecto
COPY . .

# Etapa de desarrollo
FROM base as development

# Instalar dependencias de desarrollo
RUN npm install --only=development

# Exponer el puerto en el que corre la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación en desarrollo
CMD ["npm", "run", "start:dev"]

# Etapa de producción
FROM base as production

# Instalar dependencias de producción
RUN npm install --only=production

# Exponer el puerto en el que corre la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación en producción
CMD ["npm", "run", "start:prod"]
