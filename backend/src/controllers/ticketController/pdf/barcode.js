const bwipjs = require('bwip-js');
const { ErrorResponse } = require('../../../middleware/errorManager');

// genera un BarCode passata una stringa
function generateBarcode(id) {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: 'code128', // Tipo di codice a barre
        text: id.toString(), // Testo del codice a barre
        scale: 5, // Aumenta la scala per ingrandire l'immagine
        height: 50, // Aumenta l'altezza del codice a barre
        includetext: true, // Include il testo sotto il barcode
        textxalign: 'center', // Allinea il testo al centro
      },
      function (err, png) {
        if (err) {
          return reject(new ErrorResponse('impossibile generare BarCode', 400));
        }
        const dataURI = `data:image/png;base64,${png.toString('base64')}`;
        resolve(dataURI);
      }
    );
  });
}

module.exports = {
  generateBarcode,
};
