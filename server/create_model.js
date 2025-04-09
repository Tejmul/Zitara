const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs');

async function createAndSaveModel() {
  // Create a simple model that takes a 224x224x3 image and outputs a 512-dimensional feature vector
  const model = tf.sequential();
  
  // Add layers
  model.add(tf.layers.conv2d({
    inputShape: [224, 224, 3],
    filters: 32,
    kernelSize: 3,
    activation: 'relu'
  }));
  
  model.add(tf.layers.maxPooling2d({poolSize: 2}));
  
  model.add(tf.layers.conv2d({
    filters: 64,
    kernelSize: 3,
    activation: 'relu'
  }));
  
  model.add(tf.layers.maxPooling2d({poolSize: 2}));
  
  model.add(tf.layers.flatten());
  
  model.add(tf.layers.dense({
    units: 512,
    activation: 'relu'
  }));
  
  // Compile the model
  model.compile({
    optimizer: 'adam',
    loss: 'meanSquaredError'
  });

  // Create model directory if it doesn't exist
  const modelDir = path.join(__dirname, 'model');
  if (fs.existsSync(modelDir)) {
    fs.rmSync(modelDir, { recursive: true });
  }
  fs.mkdirSync(modelDir);

  // Save the model
  const modelPath = `file://${modelDir}`;
  await model.save(modelPath);
  console.log('Model created and saved successfully at:', modelDir);

  // Verify the files exist
  const files = fs.readdirSync(modelDir);
  console.log('Created files:', files);
}

createAndSaveModel().catch(console.error); 