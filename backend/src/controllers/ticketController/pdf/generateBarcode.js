const bwipjs = require('bwip-js');
const { ErrorResponse } = require('../../../middleware/errorManager');

// genera un BarCode passata una stringa
function generateBarcode(id) {
  bwipjs.toBuffer(
    {
      bcid: 'code128',
      text: id,
      scale: 3,
      height: 10,
      includetext: false,
    },
    function (err, png) {
      if (err) {
        return new ErrorResponse('impossibile generare BarCode', 400);
      }
      return (dataURI = `data:image/png;base64,${png.toString('base64')}`);
    }
  );
}

module.exports = {
  generateBarcode,
};
