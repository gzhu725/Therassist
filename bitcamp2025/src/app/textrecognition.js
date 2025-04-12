const vision = require('@google-cloud/vision');
const path = require('path');

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, 'vision-key.json'),
});

async function detectText() {
  const [result] = await client.documentTextDetection('../../public/IMG_5051.jpg'); // image path
  const fullText = result.fullTextAnnotation?.text || "No text found.";
  console.log("Detected text:\n", fullText);
}

detectText().catch(console.error);
