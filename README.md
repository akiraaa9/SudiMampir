# Sudi Mampir (Lik Kasno) - Digital POS System

Aplikasi Kasir Digital untuk UMKM Binaan UMP yang dikembangkan menggunakan stack **React.js** (Frontend) dan **Node.js/Express** (Backend).

## 🚀 Fitur Utama
- **Menu Digital:** List makanan dan minuman interaktif.
- **Manajemen Menu:** Tambah, Edit, dan Hapus menu langsung dari dashboard (mendukung upload file gambar).
- **Sistem Kasir:** Perhitungan total harga otomatis dan input nama pelanggan.
- **Antrian Otomatis:** Tracking status pesanan (Diproses/Selesai) dengan nomor antrian.
- **Laporan Penjualan:** Ringkasan pendapatan harian dengan fitur filter tanggal.
- **Cetak Dokumen:** Fitur cetak Struk Pelanggan dan cetak Laporan Penjualan (siap diprint atau simpan sebagai PDF).

## 🛠️ Prasyarat
Pastikan komputer sudah terinstal:
- [Node.js](https://nodejs.org/) (Versi LTS direkomendasikan)
- Browser (Chrome/Edge/Firefox)

## 💻 Tata Cara Menjalankan Aplikasi via Terminal

Aplikasi ini menggunakan sistem *Fullstack* (Backend dan Frontend yang terpisah). Oleh karena itu, kamu harus membuka **dua terminal secara bersamaan**. Ikuti langkah-langkah di bawah ini:

### ⚙️ Tahap 1: Menyalakan Backend (Server Data)
Langkah ini bertujuan untuk menyalakan mesin penyimpan data menu dan pesanan.
1. Buka folder utama proyek ini di Visual Studio Code.
2. Buka terminal baru (Pilih menu `Terminal` > `New Terminal`).
3. Masuk ke dalam folder backend, instal library pendukung, dan nyalakan server dengan mengetik perintah berikut secara berurutan:
   
   cd backend-sudi-mampir
   npm install
   node server.js

> **PENTING:** Biarkan terminal ini tetap menyala di latar belakang. Jika berhasil, akan muncul tulisan *"Server jalan di http://localhost:5000"*.

### 🖥️ Tahap 2: Menyalakan Frontend (Tampilan Kasir)
Langkah ini bertujuan untuk menampilkan halaman web React ke browser.
1. Buka **Terminal Baru** di VS Code (klik ikon `+` di panel terminal atau gunakan fitur *Split Terminal*). **Jangan tutup terminal pertama!**
2. Di terminal yang baru ini, masuk ke folder frontend, instal library, dan jalankan webnya:
   
   cd frontend-react-app
   npm install
   npm start

> Setelah perintah terakhir dijalankan, browser akan otomatis terbuka dan menampilkan aplikasi di alamat `http://localhost:3000`.

## 📝 Catatan Tambahan
- Pastikan kedua terminal (Backend & Frontend) selalu berjalan bersamaan selama aplikasi digunakan.
- Data menu dan gambar sementara disimpan di memori server. Jika server backend di-restart (dimatikan lalu dinyalakan lagi), data akan kembali ke pengaturan awal.
- Jika sudah selesai digunakan dan ingin mematikan server, klik pada masing-masing terminal lalu tekan tombol `Ctrl + C` di *keyboard*, kemudian ketik `Y` lalu `Enter`.

---

_Aditya Oki Ramadhan_
