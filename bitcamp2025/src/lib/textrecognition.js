const vision = require("@google-cloud/vision");
const path = require("path");
console.log(path)

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(process.cwd(), "/src/lib/vision-key.json"),
});

async function detectText(base64String) {

  console.log("Received base64 string:", base64String);

  if (!base64String) {
    throw new Error("No base64 string provided.");
  }

  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, "base64");
  const [result] = await client.documentTextDetection({
    image: { content: imageBuffer },
  });
  const fullText = result.fullTextAnnotation?.text || "No text found.";
  return fullText;
}

module.exports = { detectText };
