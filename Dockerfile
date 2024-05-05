# Costruzione del frontend
FROM node:20-slim as build-stage
WORKDIR /app/frontend

# Copia e installazione delle dipendenze del frontend
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build && npm prune --production

# Costruzione del backend e configurazione del server di produzione
FROM node:20-slim
WORKDIR /app

# Installa le dipendenze del backend
COPY backend/package*.json ./
RUN npm install && npm cache clean --force

# Copia i file statici del frontend nella directory pubblica
COPY --from=build-stage /app/frontend/dist /app/src/public

# Copia i file del backend direttamente nella cartella /app
COPY backend/ ./

EXPOSE 4000

CMD ["node", "src/server.js"]
