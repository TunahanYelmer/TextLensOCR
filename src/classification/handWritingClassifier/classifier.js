const tf = require('@tensorflow/tfjs-node');
const csv = require('csv-parser');
const fs = require('fs');
const sharp = require('sharp');
const model = require('./neuralNetwork.js');
const path = require('path');

const labels = new Map();

fs.createReadStream('./data/images/inputImages/handwriting/written_name_train_v2.csv')
  .pipe(csv())
  .on('data', (data) => {
    const filename = data.FILENAME.trim();
    const identity = data.IDENTITY.trim();
    labels.set(filename, identity);
  })
  .on('end', async () => {
    console.log('CSV file successfully processed');
    try {
      await trainModel();
      const absoluteSavePath = path.join(__dirname, '..', '..', '..', 'models', 'handwritingModel');
      await model.save(`file://${absoluteSavePath}`)
        .then(info => console.log('Model saved successfully:', info))
        .catch(err => console.error('Error saving model:', err));
    } catch (error) {
      console.error('Error during model training:', error);
    }
  });

async function trainModel() {
  try {
    const imagesPath = path.join(__dirname, '..', '..', '..', 'data', 'processedImages', 'greyScaledImage');
    const images = fs.readdirSync(imagesPath);

    for (let imageName of images) {
      try {
        const label = labels.get(imageName);
        console.log('Processing image:', imageName);
        console.log('Label for', imageName, ':', label);

        const imagePath = path.join(imagesPath, imageName);

        if (fs.existsSync(imagePath)) {
          const { data, info } = await sharp(imagePath).resize(100, 100).raw().toBuffer({ resolveWithObject: true });
          const channels = info.channels || 3;
          const img = tf.tensor3d(new Uint8Array(data), [info.height, info.width, channels]);

          // Resize the image to match the expected input shape of the model
          const resizedImg = tf.image.resizeBilinear(img, [100, 100]);

          // Convert the image to grayscale
          const grayscaleImg = resizedImg.mean(2).expandDims(2);

          const identities = Array.from(labels.values());
          const uniqueIdentities = [...new Set(identities)];
          const identityMap = new Map(uniqueIdentities.map((identity, i) => [identity, i]));

          const encodedIdentity = identityMap.get(label);

          console.log('Training the model...');
          // Modify the target tensor creation to have the correct shape
          const target = tf.oneHot(tf.tensor1d([encodedIdentity], 'int32'), 70);

          const response = await model.fit(grayscaleImg.expandDims(0), target.expandDims(0), { epochs: 2 });
          console.log('Training history:', response.history);
        } else {
          console.error(`Error: The file ${imagePath} does not exist.`);
        }
      } catch (error) {
        console.error('Error processing image', imageName, ':', error);
      }
    }

    console.log('Model training completed');
  } catch (error) {
    console.error('Error during model training:', error);
  }
}
