const URL = "./model/";
let model, webcam, labelContainer;
let currentCamera = 0;

const explanations = {
  "Sampah Organik": {
    alasan: "Sampah ini berasal dari sisa makhluk hidup seperti daun, buah, atau makanan.",
    manfaat: "Dapat diolah menjadi kompos atau pupuk organik.",
    pengolahan: "Dikomposkan dalam lubang atau wadah tertutup.",
    dampak: "Positif: menyuburkan tanah. Negatif: jika tidak diolah, menyebabkan bau dan lalat."
  },
  "Sampah Nonorganik": {
    alasan: "Berasal dari bahan non-hayati seperti plastik, logam, atau kaca.",
    manfaat: "Dapat didaur ulang menjadi barang baru.",
    pengolahan: "Dikumpulkan dan dikirim ke tempat daur ulang.",
    dampak: "Positif: mengurangi penebangan pohon. Negatif: mencemari tanah jika dibuang sembarangan."
  }
};

async function loadModel() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
}

function startCameraMode() {
  document.getElementById("mode-selection").style.display = "none";
  document.getElementById("cameraMode").style.display = "block";
  initCamera();
}

function startUploadMode() {
  document.getElementById("mode-selection").style.display = "none";
  document.getElementById("uploadMode").style.display = "block";
  loadModel();
}

async function initCamera() {
  await loadModel();
  webcam = new tmImage.Webcam(224, 224, true);
  await webcam.setup({ facingMode: currentCamera === 0 ? "environment" : "user" });
  await webcam.play();
  document.getElementById("preview").appendChild(webcam.canvas);
  window.requestAnimationFrame(loop);
}

function switchCamera() {
  currentCamera = currentCamera === 0 ? 1 : 0;
  if (webcam) {
    webcam.stop();
    document.getElementById("preview").innerHTML = "";
  }
  initCamera();
}

async function loop() {
  webcam.update();
  await predictFromCamera();
  window.requestAnimationFrame(loop);
}

async function predictFromCamera() {
  const prediction = await model.predict(webcam.canvas);
  const result = prediction.sort((a, b) => b.probability - a.probability)[0];
  document.getElementById("cameraLabel").innerText = `${result.className} (${(result.probability * 100).toFixed(1)}%)`;
  displayExplanation(result.className, "cameraExplanation");
}

function handleUpload(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = async function () {
      const canvas = document.createElement("canvas");
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 224, 224);
      document.getElementById("uploadPreview").src = e.target.result;
      const prediction = await model.predict(canvas);
      const result = prediction.sort((a, b) => b.probability - a.probability)[0];
      document.getElementById("uploadLabel").innerText = `${result.className} (${(result.probability * 100).toFixed(1)}%)`;
      displayExplanation(result.className, "uploadExplanation");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function displayExplanation(className, containerId) {
  const data = explanations[className];
  document.getElementById(containerId).innerHTML = `
    <strong>Penjelasan:</strong><br>
    <b>Jenis:</b> ${className}<br>
    <b>Alasan:</b> ${data.alasan}<br>
    <b>Manfaat:</b> ${data.manfaat}<br>
    <b>Pengolahan:</b> ${data.pengolahan}<br>
    <b>Dampak:</b> ${data.dampak}
  `;
}