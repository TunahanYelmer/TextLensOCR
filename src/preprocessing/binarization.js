const sharp = require('sharp');

async function binarizeImage(inputPath,filename) {
  const outputPath = `./data/processedImages/binarizedImage/${filename}`;

  try {
    await sharp(inputPath)
      .threshold()
      .toFile(outputPath);

    console.log(`Binarized image saved at ${outputPath}`);
    console.log(outputPath);
    return outputPath;
  } catch (error) {
    console.error('Error in binarizeImage:', error.message);
    throw error;
  }
}

module.exports = binarizeImage;