const sharp = require('sharp');

async function convertToGreyscale(inputPath, filename) {
  const outputPath = `./data/processedImages/greyScaledImage/${filename}`;
  console.log('Input Path:', inputPath);
  console.log('Output Path:', outputPath);
  try {
    await sharp(inputPath)
      .greyscale()
      .toFile(outputPath);

    console.log(`Greyscale image saved at ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('Error in convertToGreyscale:', error.message);
    throw error;
  }
}

module.exports = convertToGreyscale;
