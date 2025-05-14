# Etapa base
FROM node:20-alpine AS base

WORKDIR /app

# --- Backend ---
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --legacy-peer-deps
COPY server ./

# --- Frontend ---
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client ./
RUN npm run build

# --- Imagen final para producción ---
FROM node:20-alpine AS final

WORKDIR /app

# Instalar PM2 globalmente
RUN npm install -g pm2

# Copiar backend
COPY --from=base /app/server /app/server

# Copiar frontend (dist compilado)
COPY --from=base /app/client/dist /app/public

# Copiar configuración de PM2
COPY ecosystem.config.js .

# Solo expones el puerto del frontend (interno: 3000)
EXPOSE 3000

# Comando para iniciar ambos procesos
CMD ["pm2-runtime", "ecosystem.config.js"]
