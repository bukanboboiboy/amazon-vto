// 1. Ambil elemen-elemen penting dari HTML
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');

// 2. Tambahkan "pendengar" ke tombol upload.
// 'change' berarti event ini akan jalan SETIAP KALI kamu selesai memilih file.
imageUpload.addEventListener('change', function() {

    // 3. Ambil file yang baru saja kamu pilih
    const file = this.files[0];

    // 4. Jika ada file yang dipilih...
    if (file) {
        // ...buat sebuah URL sementara untuk file gambar itu...
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // ...dan pasang URL itu sebagai sumber gambar di area pratinjau.
            imagePreview.src = e.target.result;
        }
        
        reader.readAsDataURL(file);
    }
});

const daftarBaju = [
    
];

let bajuTerpilih = null;

// Ambil elemen div galeri dari HTML
const galeriProduk = document.querySelector('.product-choices');

// Gunakan loop 'forEach' untuk memproses setiap nama file dalam daftarBaju
daftarBaju.forEach(namaFile => {
    // 1. Buat elemen <img> baru di dalam memori
    const imgElement = document.createElement('img');
    
    // 2. Atur atributnya
    imgElement.src = 'assets/' + namaFile; // Penting: pastikan path 'assets/' benar
    imgElement.alt = namaFile;
    imgElement.classList.add('baju-pilihan'); // Tambahkan class untuk styling

    // 3. Tambahkan logika 'klik untuk memilih'
    imgElement.addEventListener('click', () => {
        // Hapus highlight dari semua gambar lain dulu
        document.querySelectorAll('.baju-pilihan').forEach(img => {
            img.classList.remove('terpilih');
        });

        // Tambahkan highlight ke gambar yang baru diklik
        imgElement.classList.add('terpilih');
        
        // Simpan nama file dari baju yang terpilih
        bajuTerpilih = namaFile;
        console.log('Baju terpilih:', bajuTerpilih); // Cek di console browser
    });

    // 4. Masukkan elemen <img> yang sudah jadi ke dalam galeri di halaman web
    galeriProduk.appendChild(imgElement);
});