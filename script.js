const URL = "./model/";
let model, webcam, labelContainer;

async function init() {
  try {
    console.log("Memulai inisialisasi...");

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    console.log("Memuat model dari:", modelURL);
    model = await tmImage.load(modelURL, metadataURL);
    console.log("Model berhasil dimuat.");

    webcam = new tmImage.Webcam(224, 224, true);
    console.log("Menyiapkan webcam...");
    await webcam.setup();
    console.log("Webcam siap.");

    await webcam.play();
    console.log("Webcam berjalan.");

    document.getElementById("webcam").appendChild(webcam.canvas);
    console.log("Canvas webcam ditambahkan ke DOM.");

    labelContainer = document.getElementById("label");
    window.requestAnimationFrame(loop);
  } catch (error) {
    console.error("Gagal memulai aplikasi:", error);
    document.getElementById("label").innerText = "Gagal memuat model atau kamera.";
  }
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  try {
    const prediction = await model.predict(webcam.canvas);
    const result = prediction.sort((a, b) => b.probability - a.probability)[0];
    labelContainer.innerText = `${result.className} (${(result.probability * 100).toFixed(1)}%)`;
    console.log("Prediksi:", result);
  } catch (error) {
    console.error("Gagal melakukan prediksi:", error);
  }
}

init();
