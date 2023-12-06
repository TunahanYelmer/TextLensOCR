const tf = require("@tensorflow/tfjs-node");

const model = tf.sequential();

model.add(
  tf.layers.conv2d({
    filters: 32,
    kernelSize: 3,
    activation: "relu",
    inputShape: [100, 100, 1],
  })
);
model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));

model.add(tf.layers.reshape({ targetShape: [25, 50, 32] }));
model.add(tf.layers.lstm({ units: 128, returnSequences: false }));

model.add(tf.layers.dense({ units: 70, activation: "softmax" }));

model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});
model.summary();
// Corrected the path in the save method
const savePath = "../models/PlainTextModel";
model.save(savePath)
  .then(info => console.log('Model saved successfully:', info))
  .catch(err => console.error('Error saving model:', err));

module.exports = model;