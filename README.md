# 🗑️ Sampah Detektor

Aplikasi web berbasis AI untuk mendeteksi dan mengklasifikasikan sampah organik dan nonorganik secara real-time menggunakan kamera atau upload gambar.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-3.21.0-orange.svg)
![Teachable Machine](https://img.shields.io/badge/Teachable%20Machine-0.8-green.svg)

## 📋 Deskripsi

Sampah Detektor adalah aplikasi web yang memanfaatkan teknologi Machine Learning untuk membantu mengidentifikasi jenis sampah secara otomatis. Aplikasi ini menggunakan model yang dilatih dengan Google Teachable Machine dan dijalankan di browser menggunakan TensorFlow.js, sehingga tidak memerlukan server backend.

### ✨ Fitur Utama

- 📸 **Deteksi Real-time**: Gunakan kamera perangkat untuk deteksi langsung
- 🖼️ **Upload Gambar**: Unggah foto sampah untuk dianalisis
- 🔄 **Ganti Kamera**: Beralih antara kamera depan dan belakang
- 📊 **Tingkat Akurasi**: Menampilkan persentase kepercayaan prediksi
- 📖 **Informasi Edukatif**: Penjelasan lengkap tentang jenis sampah dan cara pengolahannya
- 🌐 **Offline-capable**: Berjalan sepenuhnya di browser tanpa koneksi server

## 🚀 Demo

Kunjungi: [https://irfanriyanto.github.io/sampah-detektor](https://irfanriyanto.github.io/sampah-detektor)

## 🛠️ Teknologi

- **TensorFlow.js** v3.21.0 - Framework machine learning untuk JavaScript
- **Teachable Machine** v0.8 - Platform Google untuk melatih model ML
- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dan responsif design
- **Vanilla JavaScript** - Logika aplikasi tanpa framework

## 📦 Instalasi

### Prasyarat

- Web browser modern (Chrome, Firefox, Safari, Edge)
- Web server lokal (opsional untuk development)

### Cara Menjalankan

1. Clone repository ini:
```bash
git clone https://github.com/irfanriyanto/sampah-detektor.git
cd sampah-detektor
```

2. Jalankan dengan web server lokal:

**Menggunakan Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Menggunakan Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Menggunakan PHP:**
```bash
php -S localhost:8000
```

3. Buka browser dan akses:
```
http://localhost:8000
```

## 📖 Cara Penggunaan

### Menggunakan Kamera

1. Klik tombol **"Gunakan Kamera"**
2. Izinkan akses kamera saat diminta browser
3. Arahkan kamera ke sampah yang ingin dideteksi
4. Hasil prediksi akan muncul secara real-time
5. Gunakan tombol **"Ganti Kamera"** untuk beralih antara kamera depan/belakang

### Upload Gambar

1. Klik tombol **"Unggah Gambar"**
2. Pilih foto sampah dari perangkat Anda
3. Tunggu beberapa detik untuk proses analisis
4. Hasil prediksi akan ditampilkan beserta informasi detail

## 🧠 Model Machine Learning

Model ini dilatih menggunakan Google Teachable Machine dengan dua kategori:

- **Sampah Organik**: Sisa makanan, daun, ranting, kulit buah, dll.
- **Sampah Nonorganik**: Plastik, logam, kaca, kertas, karet, dll.

### Spesifikasi Model

- **Input Size**: 224x224 pixels
- **Architecture**: MobileNet (transfer learning)
- **Classes**: 2 (Organik, Nonorganik)
- **Format**: TensorFlow.js
- **Training Date**: 17 Juni 2025

## 📁 Struktur Project

```
sampah-detektor/
├── index.html          # Halaman utama aplikasi
├── script.js           # Logika deteksi dan prediksi
├── style.css           # Styling tambahan (opsional)
├── model/              # Folder model ML
│   ├── model.json      # Arsitektur model TensorFlow.js
│   ├── weights.bin     # Bobot model terlatih
│   └── metadata.json   # Metadata model (labels, ukuran input)
└── README.md           # Dokumentasi project
```

## 🎯 Informasi yang Ditampilkan

Setiap hasil deteksi menampilkan:

### Sampah Organik
- ✅ Jenis sampah
- 📝 Alasan klasifikasi
- ♻️ Manfaat dan cara pengolahan
- 🌱 Dampak positif bagi lingkungan

### Sampah Nonorganik
- ✅ Jenis sampah
- 📝 Alasan klasifikasi
- ♻️ Potensi daur ulang
- ⚠️ Dampak negatif jika tidak dikelola

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

### Ide Pengembangan

- [ ] Menambah kategori sampah (B3, elektronik, dll)
- [ ] Fitur history deteksi
- [ ] Export hasil ke PDF
- [ ] Integrasi dengan maps untuk lokasi bank sampah terdekat
- [ ] Mode offline dengan Service Worker
- [ ] Statistik penggunaan aplikasi
- [ ] Multi-bahasa (English, dll)

## 🐛 Troubleshooting

### Kamera tidak berfungsi
- Pastikan browser memiliki izin akses kamera
- Gunakan HTTPS atau localhost (required untuk WebRTC)
- Coba browser lain jika masalah berlanjut

### Model tidak load
- Periksa koneksi internet (untuk CDN TensorFlow.js)
- Pastikan file model ada di folder `/model`
- Cek console browser untuk error detail

### Prediksi tidak akurat
- Pastikan pencahayaan cukup
- Dekatkan objek ke kamera
- Gunakan gambar yang jelas dan fokus

## 📄 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

## 👨‍💻 Author

**Irfan Riyanto**

- GitHub: [@irfanriyanto](https://github.com/irfanriyanto)
- Repository: [sampah-detektor](https://github.com/irfanriyanto/sampah-detektor)

## 🙏 Acknowledgments

- [Google Teachable Machine](https://teachablemachine.withgoogle.com/) - Platform pelatihan model
- [TensorFlow.js](https://www.tensorflow.org/js) - Framework ML untuk browser
- Komunitas open source yang telah berkontribusi

## 📞 Kontak & Support

Jika Anda memiliki pertanyaan atau saran, silakan:
- Buat [Issue](https://github.com/irfanriyanto/sampah-detektor/issues) di GitHub
- Kirim Pull Request untuk perbaikan
- Hubungi melalui GitHub profile

---

⭐ Jika project ini bermanfaat, jangan lupa berikan star di GitHub!

**#MachineLearning #TensorFlowJS #WasteManagement #AI #JavaScript**
