import * as tmImage from "@teachablemachine/image";
import * as ui from "./ui";

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "http://localhost:1234/my_model/";

let model, webcam, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  ui.init();

  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
}

async function play() {
  ui.startPacman();
  loop();
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  const probs = prediction.map((pred) => pred.probability);
  const maxProbability = Math.max(...probs);
  const maxIndex = probs.indexOf(maxProbability);

  const map = {
    0: "up",
    1: "down",
    2: "left",
    3: "right",
  };
  const command = map[maxIndex];
  if (maxProbability > 0.5) {
    ui.move(command);
  }
}

document.getElementById("predict").onclick = play;
init();
