FROM node:20.x-alpine AS base

WORKDIR /app

# --- Backend ---
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --legacy-peer-deps
COPY server ./

# --- Frontend ---
WORKDIR /app
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client ./
RUN npm run build

# --- Servir la aplicación ---
FROM alpine/git AS final

COPY --from=base /app/server /app/server
COPY --from=base /app/client/dist /app/public

RUN apk add --no-cache nodejs npm
RUN npm install -g serve

# Exponer solo el puerto del frontend
EXPOSE 3000

# Comando para iniciar ambos procesos
CMD sh -c "cd /app/server && npm start --port=8080 & cd /app/public && serve -s . -l 3000"