const cv = require('opencv4nodejs');

function segmentLines(imagePath) {
  // Load the image
  const image = cv.imread(imagePath);

  // Convert the image to grayscale
  const gray = image.bgrToGray();

  // Apply a binary threshold to the image
  const binary = gray.threshold(127, 255, cv.THRESH_BINARY_INV);

  // Find the contours in the image
  const contours = binary.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  // Filter the contours to only include those with a height greater than a certain threshold
  const lineContours = contours.filter(contour => contour.boundingRect().height > /* your threshold here */);

  // Sort the contours from top to bottom
  lineContours.sort((a, b) => a.boundingRect().y - b.boundingRect().y);

  // Extract the lines from the image
  const lines = lineContours.map(contour => {
    const { x, y, width, height } = contour.boundingRect();
    return image.getRegion(new cv.Rect(x, y, width, height));
  });

  return lines;
}

module.exports = segmentLines;