import * as ui from "./ui";

//  Location of your model trained on https://teachablemachine.withgoogle.com/
//  Copy your unzipped model into the /dist/ folder of your project
const URL = "http://localhost:1234/my_model/";

function play() {
  ui.startPacman();

  // @TODO - listen to speech command model and control the game
}

async function init() {
  ui.init();

  // @TODO - create speech command model
}

document.getElementById("predict").onclick = play;
init();
