const tf = require("@tensorflow/tfjs-node");
const path = require('path');

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

model.add(tf.layers.reshape({ targetShape: [50, 4] }));
model.add(tf.layers.lstm({ units: 128, returnSequences: true }));

model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 70, activation: "softmax" }));

model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});

model.summary();

// Use an absolute path




exports = model;