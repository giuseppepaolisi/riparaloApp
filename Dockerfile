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

# Installa le dipendenze necessarie per Puppeteer
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libpangocairo-1.0-0 \
    libxrandr2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libasound2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libnspr4 \
    libxshmfence1 \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libgbm-dev \
    lsb-release \
    xdg-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installa le dipendenze del backend
COPY backend/package*.json ./
RUN npm install && npm cache clean --force

# Copia i file statici del frontend nella directory pubblica
COPY --from=build-stage /app/frontend/dist /app/src/public

# Copia i file del backend direttamente nella cartella /app
COPY backend/ ./

EXPOSE 4000

CMD ["node", "src/server.js"]
