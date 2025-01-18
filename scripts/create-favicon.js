const sharp = require('sharp');
const fs = require('fs');

const svgBuffer = fs.readFileSync('./public/dog-favicon.svg');

sharp(svgBuffer)
  .resize(32, 32)
  .toFile('./public/favicon.ico')
  .then(() => console.log('Favicon created successfully!'))
  .catch(err => console.error('Error creating favicon:', err)); 