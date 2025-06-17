const URL = "./model/";
let model, webcamStream, labelContainer;
let useFrontCamera = true;

async function init() {
  try {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);

    labelContainer = document.getElementById("label");

    await setupCamera();
    window.requestAnimationFrame(loop);
  } catch (error) {
    console.error("Gagal memulai aplikasi:", error);
    document.getElementById("label").innerText = "Gagal memuat model atau kamera.";
  }
}

async function setupCamera() {
  const constraints = {
    audio: false,
    video: {
      facingMode: useFrontCamera ? "user" : "environment",
      width: 224,
      height: 224
    }
  };

  const video = document.getElementById("webcam");

  if (webcamStream) {
    webcamStream.getTracks().forEach(track => track.stop());
  }

  webcamStream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = webcamStream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      video.play();
      resolve();
    };
  });
}

async function loop() {
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const video = document.getElementById("webcam");
  if (video.readyState === 4) {
    const prediction = await model.predict(video);
    const result = prediction.sort((a, b) => b.probability - a.probability)[0];
    labelContainer.innerText = `${result.className} (${(result.probability * 100).toFixed(1)}%)`;
  }
}

async function switchCamera() {
  useFrontCamera = !useFrontCamera;
  await setupCamera();
}

async function handleImageUpload(event) {
  const imgElement = document.getElementById("uploadedImage");
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    imgElement.src = e.target.result;
    imgElement.style.display = "block";

    imgElement.onload = async () => {
      const prediction = await model.predict(imgElement);
      const result = prediction.sort((a, b) => b.probability - a.probability)[0];
      labelContainer.innerText = `Hasil Gambar: ${result.className} (${(result.probability * 100).toFixed(1)}%)`;
    };
  };

  reader.readAsDataURL(file);
}

init();