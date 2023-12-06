const binarizeImage = require('./preprocessing/binarization.js');
const convertToGreyscale = require('./preprocessing/greycale.js');
const noiseRemoval = require('./preprocessing/noiseRemoval.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function findFileName(filepath) {
  const filePath = filepath.split('\\');
  return filePath[filePath.length - 1];
}

function isPicture(filename) {
  // Add your logic to determine if the file is a picture (e.g., based on file extension)
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(filename).toLowerCase();
  return allowedExtensions.includes(ext);
}
async function processDirectory(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);

    // Loop through each file in the directory
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const filenameWithoutPath=findFileName(filePath);
      // Check if the file is a picture
      if (isPicture(file)) {
        const dateTime = new Date().getTime();
        const binarizedImagePath = await binarizeImage(filePath, filenameWithoutPath);
        const greyscaledImagePath = await convertToGreyscale(binarizedImagePath, filenameWithoutPath);
        const preprocessedImagePath = await noiseRemoval(greyscaledImagePath,filenameWithoutPath);

        console.log('Processing picture:', filePath);
        console.log('Preprocessed Image Path:', preprocessedImagePath);
        // Call your recognition function here
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error.message);
  }
}






processDirectory('./data/images/inputImages/handwriting/train_v2/train');