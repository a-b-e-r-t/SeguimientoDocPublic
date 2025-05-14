# Etapa 1: Construcción del frontend
FROM node:16 AS build

WORKDIR /app

# Copiar los archivos de cliente
COPY ./client/package.json ./client/package-lock.json ./client/
RUN npm install --prefix client
COPY ./client ./client

# Construir el frontend
RUN npm run build --prefix client

# Etapa 2: Construcción del backend
FROM node:16

WORKDIR /app

# Copiar los archivos de backend
COPY ./server/package.json ./server/package-lock.json ./server/
RUN npm install --prefix server
COPY ./server ./server

# Copiar los archivos del frontend ya construidos
COPY --from=build /app/client/dist /app/client/dist

# Exponer el puerto para el backend
EXPOSE 3000

# Iniciar el servidor backend
CMD ["npm", "--prefix", "server", "run", "start"]
