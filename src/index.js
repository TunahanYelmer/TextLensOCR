const predict = require('./classification/classifier.js');
const dataprep = require('./dataPreperation/dataPreperation.js');
const redis = require('./redisClient/redisClient.js');
const featureExtraction = require('./featureExtraction/featureExtraction.js');
const binarization = require('./preproccesing/binarization.js');
const grayscale = require('./preproccesing/grayscale.js');
const noiseRemoval = require('./preproccessing/noiseRemoval.js');
const postprocessing = require('./postprocessing/errorCorrection.js');
const fs = require('fs');
const sharp = require('sharp');

const dateTime = Date.now();

const outputPath=dataprep.dataUrlToImage(data.InputImageData[0].imageDataUrl,
    `../data/images/inputImages/inputImage${dateTime}.png`,dateTime)
    .catch(console.error);
// prepering the image for classification
const preprocessedImagePath=noiseRemoval.removeNoise(grayscale.convertToGreyscale(binarization.binarizeImage(outputPath,dateTime),dateTime),dateTime);

const features = featureExtraction.predict(preprocessedImagePath,dateTime);
predict.predict(features,dateTime);