// noiseRemoval.js
const sharp = require('sharp');


async function removeNoise(inputPath, filename) {
    const outputPath = `./data/processedImages/noiseRemovedImage/${filename}`;
  await sharp(inputPath)
    .median()
    .toFile(outputPath);
    return outputPath;

  console.log(`Noise removed and image saved at ${outputPath}`);
}

module.exports = removeNoise;