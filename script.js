const URL = "./model/";
let model, webcam, currentStream, useFrontCamera = true;
let labelContainer = document.getElementById("label");
let resultContainer = document.getElementById("result");
let previewContainer = document.getElementById("preview");

async function loadModel() {
  model = await tmImage.load(URL + "model.json", URL + "metadata.json");
}

async function startCamera() {
  await loadModel();
  const flip = useFrontCamera;
  webcam = new tmImage.Webcam(224, 224, flip);
  await webcam.setup({ facingMode: flip ? "user" : "environment" });
  await webcam.play();

  previewContainer.innerHTML = "";
  previewContainer.appendChild(webcam.canvas);
  document.getElementById("switchBtn").style.display = "inline-block";

  window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update();
  await predict(webcam.canvas);
  window.requestAnimationFrame(loop);
}

async function predict(input) {
  const prediction = await model.predict(input);
  const top = prediction.sort((a, b) => b.probability - a.probability)[0];

  labelContainer.innerText = `${top.className} (${(top.probability * 100).toFixed(1)}%)`;
  resultContainer.innerHTML = getExplanation(top.className);
}

function handleUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 224, 224);
    previewContainer.innerHTML = "";
    previewContainer.appendChild(canvas);

    await loadModel();
    await predict(canvas);
  };
  img.src = URL.createObjectURL(file);
}

function switchCamera() {
  useFrontCamera = !useFrontCamera;
  if (webcam) {
    webcam.stop();
  }
  startCamera();
}

function getExplanation(label) {
  if (label.toLowerCase().includes("organik")) {
    return `
      <p><strong>Jenis:</strong> Sampah Organik</p>
      <p><strong>Alasan:</strong> Berasal dari bahan alami seperti daun, sisa makanan.</p>
      <p><strong>Manfaat:</strong> Bisa diolah jadi kompos.</p>
      <p><strong>Pengolahan:</strong> Komposter, pengomposan manual.</p>
      <p><strong>Dampak Positif:</strong> Mengurangi limbah, menyuburkan tanah.</p>
    `;
  } else {
    return `
      <p><strong>Jenis:</strong> Sampah Nonorganik</p>
      <p><strong>Alasan:</strong> Berasal dari bahan buatan seperti plastik atau logam.</p>
      <p><strong>Manfaat:</strong> Daur ulang menjadi produk lain.</p>
      <p><strong>Pengolahan:</strong> Bank sampah, daur ulang pabrik.</p>
      <p><strong>Dampak Negatif:</strong> Lama terurai, mencemari lingkungan jika tidak dikelola.</p>
    `;
  }
}