const URL = "./model/";
let model, webcam, labelContainer;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  webcam = new tmImage.Webcam(300, 225, true);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);
  document.getElementById("webcam").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label");
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  const result = prediction.sort((a, b) => b.probability - a.probability)[0];
  labelContainer.innerText = `${result.className} (${(result.probability * 100).toFixed(1)}%)`;
}

init();
