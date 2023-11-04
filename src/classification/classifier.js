const tf = require('@tensorflow/tfjs-node');
const canvas = require('canvas');
const { Image, createCanvas } = canvas;
const model = require('./neuralNetwork/model');

async function predict(images) {
  // Initialize an array to hold the predictions
  const predictions = [];

  // Process each image
  for (let imagePath of images) {
    // Load the image
    const img = new Image();
    img.src = imagePath;
    await new Promise((resolve) => img.onload = resolve);

    // Convert the image to a tensor
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let image = tf.browser.fromPixels(canvas);

    // Preprocess the image as necessary...

    // Define the size of the sliding window
    const windowSize = [50, 50];

    // Slide the window across the image
    for (let y = 0; y <= image.shape[0] - windowSize[0]; y++) {
      for (let x = 0; x <= image.shape[1] - windowSize[1]; x++) {
        // Extract the part of the image inside the window
        const window = image.slice([y, x, 0], windowSize.concat([1]));

        // Use the model to make a prediction
        const prediction = model.predict(window.expandDims(0));

        // Add the prediction to the array
        predictions.push(prediction);
      }
    }
  }

  // Return the predictions
  return predictions;
}

module.exports = predict;