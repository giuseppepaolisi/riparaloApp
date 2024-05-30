const pug = require('pug');
const puppeteer = require('puppeteer');
const path = require('path');
const { generateBarcode } = require('./barcode');

async function generatePDF(data) {
  try {
    const barcodeDataURI = await generateBarcode(data._id);
    data.barcode = barcodeDataURI;

    const compiledFunction = pug.compileFile(
      path.join(__dirname, 'template.pug')
    );
    const html = compiledFunction(data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }); // Esegui in modalità headless con opzioni extra
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

    const pdfPath = path.join(__dirname, 'scheda_assistenza.pdf');
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error('Errore durante la generazione del PDF:', error);
  }
}

module.exports = {
  generatePDF,
};
