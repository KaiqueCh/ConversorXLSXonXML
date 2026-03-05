const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * Lê a coluna A de um arquivo xlsx e gera um arquivo XML para cada linha.
 * @param {string} inputPath - Caminho do arquivo xlsx de entrada.
 * @param {string} outputDir - Diretório onde os arquivos XML serão salvos.
 */
function convertXlsxToXml(inputPath, outputDir) {
  // Lê o arquivo xlsx
  const workbook = XLSX.readFile(inputPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Converte para JSON (array de arrays)
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Garante que o diretório de saída existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Se a primeira linha for cabeçalho, pule-a
  const startIdx = isNaN(data[0][0]) && typeof data[0][0] === 'string' ? 1 : 0;

  // Percorre as linhas de dados
  data.slice(startIdx).forEach((row, idx) => {
    const value = row[0]; // Coluna A
    if (value !== undefined && value !== null && value !== '') {
      // Salva o conteúdo exatamente como está na célula
      const xmlContent = value;
      const fileName = `linha_${idx + 1}.xml`;
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(filePath, xmlContent, 'utf8');
      console.log(`Arquivo criado: ${filePath}`);
    }
  });
}

module.exports = { convertXlsxToXml };