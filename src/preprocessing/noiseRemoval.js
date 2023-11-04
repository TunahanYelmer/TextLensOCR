// noiseRemoval.js
const sharp = require('sharp');


async function removeNoise(inputPath, dateTime) {
    const outputPath = `../data/images/processedImages/noiseRemovedImage/inputImage${dateTime}.png`;
  await sharp(inputPath)
    .median()
    .toFile(outputPath);
    

  
  console.log(`Noise removed and image saved at ${outputPath}`);
}

module.exports = removeNoise;