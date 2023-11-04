const fs = require('fs');
const Jimp = require('jimp');

// Read the contents of the images directory
fs.readdir('data/images', (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    // Process each file
    files.forEach(file => {
        // Load the image
        Jimp.read(`data/images/${file}`)
            .then(image => {
                // Version 1: Randomly rotate the image (0 to 360 degrees)
                const rotationAngle = Math.floor(Math.random() * 360);
                image.rotate(rotationAngle);
                image.write(`data/augmentedImages/${file.replace('.png', '')}_rotated.png`);

                // Version 2: Apply Gaussian noise
                const noiseIntensity = Math.random() * 0.2; // Adjust the intensity as needed
                image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                    const pixelValue = image.bitmap.data[idx] + noiseIntensity * Math.random() * 255;
                    image.setPixelColor(Jimp.rgbaToInt(pixelValue, pixelValue, pixelValue, 255), x, y);
                });
                image.write(`data/augmentedImages/${file.replace('.png', '')}_addednoise.png`);

                // Version 3: Random brightness and contrast adjustments
                const brightness = Math.random() * 2 - 1; // Adjust the range (-1 to 1) as needed
                const contrast = Math.random() * 2 - 1; // Adjust the range (-1 to 1) as needed
                image.color([
                    { apply: 'brightness', params: [brightness] },
                    { apply: 'contrast', params: [1 + contrast] },
                ]);
                image.write(`data/augmentedImages/${file.replace('.png', '')}_brightnessadjusted.png`);

                // Save the augmented image with a new filename
               
            })
            .catch(err => {
                console.error(err);
            });
    });
});
