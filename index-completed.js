import * as ui from "./ui";

//  Location of your model trained on https://teachablemachine.withgoogle.com/
//  Copy your unzipped model into the /dist/ folder of your project
const URL = "http://localhost:1234/my_model/";

async function createModel() {
  const checkpointURL = URL + "model.json"; // model topology
  const metadataURL = URL + "metadata.json"; // model metadata

  const recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL
  );

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();
  return recognizer;
}

let recognizer;

function play() {
  ui.startPacman();

  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields
  recognizer.listen(
    (result) => {
      const scores = result.scores; // probability of prediction for each class
      const maxIndex = scores.indexOf(Math.max(...scores));
      
      const classLabels = recognizer.wordLabels();
      console.log(maxIndex, classLabels);
      
      const map = {
        0: "_",
        1: "down",
        2: "left",
        3: "right",
        4: "up",
      };
      const command = map[maxIndex];
      
      if (command !== "_") {
        ui.move(command);
      }
    },
    {
      includeSpectrogram: true, // in case listen should return result.spectrogram
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
    }
  );
}

async function init() {
  ui.init();
  recognizer = await createModel();
}

document.getElementById("predict").onclick = play;
init();
