// Import TensorFlow.js
const tf = require('@tensorflow/tfjs');

// Define the input layer. The shape should match the shape of your preprocessed images.
const inputs = tf.input({shape: [100 , 100 , 1 ]});

// Add a convolutional layer to extract features from the image. 
// The filters parameter defines the number of output filters in the convolution.
// The kernelSize parameter specifies the height and width of the 2D convolution window.
let x = tf.layers.conv2d({filters: 32, kernelSize: 3, activation: 'relu'}).apply(inputs);

// Add a max pooling layer to down-sample the input along its spatial dimensions (height and width).
x = tf.layers.maxPooling2d({poolSize: [2, 2]}).apply(x);

// Flatten the output from the convolutional layers. This prepares the tensor for input into the dense layers.
x = tf.layers.flatten().apply(x);

// Add a LSTM layer to interpret the sequences of features as text. 
// The units parameter defines the dimensionality of the output space.
// The returnSequences parameter determines whether to return the last output in the output sequence, or the full sequence.
x = tf.layers.lstm({units: 128, returnSequences: true}).apply(x);
x = tf.layers.lstm({units: 128}).apply(x);

// Add two dense layers to output the final predictions. 
// The units parameter should match the number of classes you want to predict.
const plainTextPrediction = tf.layers.dense({units: 70 , activation: 'softmax'}).apply(x);
const handwritingPrediction = tf.layers.dense({units: 70  , activation: 'softmax'}).apply(x);

// Define the model. The inputs parameter is the input tensor, and the outputs parameter is the output tensor.
const model = tf.model({inputs: inputs, outputs: [plainTextPrediction, handwritingPrediction]});

// Compile the model. 
// The optimizer parameter is the string identifier of the optimizer to use.
// The loss parameter is the objective that the model will try to minimize.
// The metrics parameter is the list of metrics to be evaluated by the model during training and testing.
model.compile({optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy']});

// Export the model for use in other files.
module.exports = model;