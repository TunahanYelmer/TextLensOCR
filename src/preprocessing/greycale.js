// greyscale.js
const sharp = require('sharp');


async function convertToGreyscale(inputPathi, dateTime) {
  const outputPath = `../data/images/greyscaledImage/greyscaleImage${dateTime}.png`;
  await sharp(inputPath)
    .greyscale()
    .toFile(outputPath);
    
  
  console.log(`Greyscale image saved at ${outputPath}`);
  return outputPath;
}

module.exports = convertToGreyscale;