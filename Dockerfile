# Costruzione del frontend
FROM node:20 as build-stage
WORKDIR /app

# Copia e installazione delle dipendenze del frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Costruzione del backend e configurazione del server di produzione
FROM node:20
WORKDIR /app

# Copia delle dipendenze e dei file del backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install && npm rebuild bcrypt --build-from-source
COPY backend/ ./backend/

# Copia dei file statici del frontend nel backend per la distribuzione
COPY --from=build-stage /app/frontend/dist /app/backend/src/public

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "src/server.js"]
