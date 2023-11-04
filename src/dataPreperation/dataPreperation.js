const fetch = require('node-fetch');
const sharp = require('sharp');
const fs = require('fs');
const redis =require(.../redisClient/redisClient.js);

const data = JSON.parse(fs.readFileSync('dataInput.json', 'utf8'));
const dateTime = new Date().getTime();
async function dataUrlToImage(dataUrl, outputPath,dataTime) {
  const response = await fetch(dataUrl);
  const buffer = await response.buffer();
  await sharp(buffer).toFile(outputPath);
  redis.set(dateTime, outputPath);
  return outputPath, dataTime;
}


dataUrlToImage(data.InputImageData[0].imageDataUrl, `../data/images/inputImages/inputImage${dateTime}.png`).catch(console.error);