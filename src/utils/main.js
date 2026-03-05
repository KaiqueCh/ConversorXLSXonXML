const path = require('path');
const { convertXlsxToXml } = require('./index');

const inputPath = path.join(__dirname, 'xlsx', 'entrada.xlsx'); // ./src/utils/xlsx/entrada.xlsx
const outputDir = path.join(__dirname, 'xmls');                // ./src/utils/xmls

convertXlsxToXml(inputPath, outputDir);