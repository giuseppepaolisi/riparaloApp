const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(data) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Leggi il file template HTML
  let htmlContent = fs.readFileSync(
    path.join(__dirname, 'template.html'),
    'utf8'
  );

  // Sostituisci i placeholder con i dati reali
  Object.keys(data).forEach((key) => {
    htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
  });

  await page.setContent(htmlContent);
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
  });

  await browser.close();
  console.log('PDF generato con successo!');
}
const data = {
  ragioneSociale: 'Elettrodomestici Rossi S.r.l.',
  cellulare: '+39 123 456 7890',
  indirizzo: 'Via Roma, 101, 00100 Roma, Italia',
  modello: 'EcoMax 500',
  marca: 'TechLine',
  prezzo: '€350,00',
  problema: 'Non si avvia il ciclo di lavaggio.',
  barcodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
};

generatePDF(data);
