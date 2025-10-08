# 🤖 AI Virtual Try-On

*Sebuah proyek untuk AWS Back-End Academy 2025 Online Hackathon: AI for Creative Economy.*

Coba baju favoritmu tanpa harus ke fitting room! Aplikasi web inovatif ini memungkinkan pengguna untuk mencoba pakaian secara virtual menggunakan kekuatan AI generatif dari Amazon Web Services.

**Link Aplikasi yang Sudah di-Deploy: https://bukanboboiboy-vto.vercel.app/**

---

### 🚀 Fitur Utama

-   **Upload & Drag-and-Drop:** Unggah foto dari perangkat atau seret langsung ke jendela browser.
-   **Model Sampel:** Tidak punya foto? Coba fitur ini dengan model yang sudah kami sediakan.
-   **Galeri Produk Dinamis:** Jelajahi berbagai koleksi pakaian, termasuk yang terinspirasi dari kekayaan kriya Indonesia seperti Batik dan Tenun.
-   **Virtual Try-On Berbasis AI:** Didukung oleh **Amazon Bedrock (model Amazon Nova Canvas)**, yang secara cerdas mengganti pakaian pada foto pengguna dengan tetap mempertahankan wajah, pose, dan latar belakang asli.
-   **Tampilan Perbandingan:** Lihat hasil "Before" dan "After" secara berdampingan.
-   **Download & Share:** Simpan hasil VTO favoritmu atau bagikan ke media sosial.
-   **Desain Responsif:** Tampilan yang optimal di perangkat desktop maupun mobile.

---

### 🏛️ Arsitektur Teknologi

Solusi ini dibangun di atas arsitektur **100% serverless** di AWS, memastikan skalabilitas, efisiensi biaya, dan kecepatan pengembangan.

```
Pengguna (Browser)
      |
      |-- Unggah Gambar (user + pakaian) --> [ Amazon API Gateway ]
      |                                           | (Endpoint RESTful)
      |                                           |
      '-- Terima Hasil Gambar <-- [ AWS Lambda (Node.js) ] <--'
                                                  |
                                                  |-- 1. Panggil Amazon Rekognition (Validasi Wajah)
                                                  |
                                                  '-- 2. Panggil Amazon Bedrock (Model Nova Canvas)
```

#### Layanan AWS yang Digunakan:
-   **Amazon Bedrock:** Sebagai mesin AI utama, menggunakan model `amazon.nova-canvas-v1:0` untuk melakukan Virtual Try-On dengan fitur deteksi pakaian otomatis (`maskType: "GARMENT"`).
-   **AWS Lambda:** Menjadi otak back-end yang menjalankan logika bisnis dalam Node.js. Fungsi ini memproses gambar, membuat payload, memanggil API Bedrock, dan mengembalikan hasilnya.
-   **Amazon API Gateway:** Menyediakan endpoint HTTP yang aman dan terkelola untuk menghubungkan aplikasi front-end dengan fungsi Lambda.
-   **IAM (Identity and Access Management):** Mengatur izin akses yang aman antara layanan AWS, memastikan Lambda hanya dapat mengakses sumber daya yang diperlukan.
-   **Amazon CloudWatch:** Digunakan untuk logging dan monitoring, sangat krusial selama proses debugging untuk melacak error dan kinerja fungsi Lambda.

---

### 🇮🇩 Kontribusi untuk Ekonomi Kreatif (EKRAF)

Proyek ini secara langsung mendukung subsektor **Fashion dan Kriya** dengan:
-   **Memberdayakan UMKM:** Menyediakan teknologi canggih untuk membantu brand fashion lokal bersaing di pasar digital.
-   **Mempromosikan Budaya:** Menjadi etalase digital untuk fashion yang terinspirasi dari budaya Indonesia seperti Batik dan Tenun, membuatnya lebih mudah diakses dan dicoba oleh pasar yang lebih luas.
-   **Mengurangi Limbah:** Berpotensi mengurangi tingkat pengembalian produk fashion online, yang berdampak positif pada jejak karbon dari logistik.

---
**Bukan Boboiboy**
