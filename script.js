window.addEventListener("DOMContentLoaded", function () {
  const URL = "./model/";
  let model, webcam, useFrontCamera = true;
  const labelContainer = document.getElementById("label");
  const resultContainer = document.getElementById("result");
  const previewContainer = document.getElementById("preview");
  const fileInput = document.getElementById("uploadInput");
  const switchBtn = document.getElementById("switchBtn");

  async function loadModel() {
    if (!model) {
      model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    }
  }

  async function startCamera() {
    await loadModel();
    const flip = useFrontCamera;
    webcam = new tmImage.Webcam(224, 224, flip);

    try {
      await webcam.setup({ facingMode: flip ? "user" : "environment" });
      await webcam.play();

      previewContainer.innerHTML = '';
      previewContainer.appendChild(webcam.canvas);
      switchBtn.style.display = "inline-block";

      window.requestAnimationFrame(loop);
    } catch (error) {
      alert("Gagal mengakses kamera. Pastikan Anda mengizinkan akses kamera.");
    }
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

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await loadModel();

    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 224, 224);
      previewContainer.innerHTML = '';
      previewContainer.appendChild(canvas);

      await predict(canvas);
    };
    img.src = URL.createObjectURL(file);
  });

  window.startCamera = startCamera;
  window.switchCamera = function () {
    useFrontCamera = !useFrontCamera;
    if (webcam) webcam.stop();
    startCamera();
  };

  function getExplanation(label) {
    if (label.toLowerCase().includes("organik")) {
      return `
        <p><strong>Jenis:</strong> Sampah Organik</p>
        <p><strong>Alasan:</strong> Berasal dari tumbuhan/hewan, mudah membusuk.</p>
        <p><strong>Manfaat:</strong> Bisa dijadikan kompos atau pupuk alami.</p>
        <p><strong>Pengolahan:</strong> Pengomposan rumah atau alat komposter.</p>
        <p><strong>Dampak Positif:</strong> Ramah lingkungan, menyuburkan tanah.</p>
      `;
    } else {
      return `
        <p><strong>Jenis:</strong> Sampah Nonorganik</p>
        <p><strong>Alasan:</strong> Bahan buatan manusia (plastik, logam, kaca).</p>
        <p><strong>Manfaat:</strong> Bisa didaur ulang atau dijual ke bank sampah.</p>
        <p><strong>Pengolahan:</strong> Daur ulang, pemrosesan industri.</p>
        <p><strong>Dampak Negatif:</strong> Sulit terurai, mencemari tanah/air.</p>
      `;
    }
  }
});