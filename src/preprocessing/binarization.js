// binarization.js
const sharp = require('sharp');



async function binarizeImage(inputPath, dateTime) {
  const  outputPath = `../data/images/binarizedImages/binarizedImage${dateTime}.png`;
  await sharp(inputPath)
    .threshold() // this will convert the image to black and white
    .toFile(outputPath);
    
  console.log(`Binarized image saved at ${outputPath}`);
  return outputPath;
}

module.exports = binarizeImage;