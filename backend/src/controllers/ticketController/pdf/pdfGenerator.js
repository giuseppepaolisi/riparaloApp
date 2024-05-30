const pug = require('pug');
const puppeteer = require('puppeteer');
const path = require('path');
const { generateBarcode } = require('./barcode');
// curl -o document.pdf -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI4MGRjNDIwYmU5M2E4NTUwNTY1NzEiLCJpYXQiOjE3MTcwODUyNDcsImV4cCI6MTcxNzE3MTY0N30.r-nrEGnaXEjblCdvH44PnijgY_p52ZKbTutLax_n0St4NTnQ0jd0LQWuZKQazxhvX3LIvK6qYOKo8Nm-EDPKiJ5xc0zSl7OrgF9J6mTYs1tKHEGk7gD9IVDYzQjDFP0csuY-yVAqUilywc1a8VN1J9EHkDXMUipkTiDz3GaVDWGS5mcxLi6qt2CYgySgexvsc9QY0mPuiqfnlc7bq4-4oDLxNaYq7-uMVV6iJQmqKHBiLzzq-2Tu-HLLDeEgn2tyxafuqy0xRECLWXXFKssA4X6FDhjeAxkOX-85VbOc-z00qAXq-IsnnR8BzBB4gsQBv8wfI4WN7qrEYFWn60cvZA" "http://localhost:4000/api/pdf/663bbab69f4e2dc79bce564e"

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
