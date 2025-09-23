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
 "01158e1a42a153ee8223cce3e0a30949@resize_w900_nl.webp",
 "2239b6358bb187b27a2185f21aafff4c@resize_w900_nl.webp",
 "31a778a3cf43e18c937dd7840cd0f994@resize_w900_nl.webp",
 "42ee31518c78b020ec1293ddd220fd6a@resize_w900_nl.webp",
 "521fdeae559b7740e209ed94abbeaf2e@resize_w900_nl.webp",
 "6438f74128ce355fb63cede5be09d65c@resize_w900_nl.webp",
 "679cbafd7e8342d95ef4cef3198b1211@resize_w900_nl.webp",
 "80670022f8362084636d05ce8d712338@resize_w900_nl.webp",
 "b04333de73fd711f530cf4d024e14342@resize_w900_nl.webp",
 "d1810213ad48304f9a149e0abbc87969@resize_w900_nl.webp",
 "id-11134201-7rbkb-mau3e2aw18h035@resize_w900_nl.webp",
 "id-11134207-7r98q-m0crzxzhz87q92@resize_w900_nl.webp",
 "id-11134207-7r98u-lyh9xjjgmxqd90@resize_w900_nl.webp",
 "id-11134207-7r992-lyh9xjjghbgl15@resize_w900_nl.webp",
 "id-11134207-7ra0j-mcbmikl40g5h44@resize_w900_nl.webp",
 "id-11134207-7ra0s-mcu2biepzsc750@resize_w900_nl.webp",
 "id-11134207-7ra0t-mclu10bqmz9za1@resize_w900_nl.webp",
 "id-11134207-7rasc-m4bineisefmrc1@resize_w900_nl.webp",
 "id-11134207-7rasd-m17upx3r6pz611@resize_w900_nl.webp",
 "id-11134207-7rasf-m3w3pyw6iss8e6@resize_w900_nl.webp",
 "id-11134207-7rbk3-m7j7qjw5c8occ8@resize_w900_nl.webp",
 "id-11134207-7rbk3-m99w7baw5q19ed@resize_w900_nl.webp",
 "id-11134207-7rbk3-m99x2pr5vn8e53@resize_w900_nl.webp",
 "id-11134207-7rbk8-m765t0bvikcc4d@resize_w900_nl.webp",
 "id-11134207-7rbk8-marxsna28cex8d@resize_w900_nl.webp",
 "id-11134207-7rbk9-m9dwybawlipn09@resize_w900_nl.webp",
 "id-11134207-7rbkd-m6c40vs3pmvqf6@resize_w900_nl (1).webp",
 "id-11134207-7rbkd-m6c40vs3pmvqf6@resize_w900_nl.webp",
 "id-11134207-81ztf-megsxi1vbyte7a@resize_w900_nl.webp",
 "sg-11134201-7qvcx-lhria3axla8003@resize_w900_nl.webp",
 "sg-11134201-7rd6g-lvir2bwvglx202@resize_w900_nl.webp",
 "sg-11134202-7qvcz-lihkmy38oho30b@resize_w900_nl.webp",
 "sg-11134202-7qvd4-lirbujnj541t29@resize_w900_nl.webp",
 "sg-11134202-7qvd6-lihkiv2vulty9a@resize_w900_nl.webp",
 "sg-11134202-7qvdk-lirbujh5egao7c@resize_w900_nl.webp",
 "sg-11134202-7qvdr-lihkkwfsgkcg07@resize_w900_nl.webp",
 "sg-11134202-7qvds-liolds0rcoafa2@resize_w900_nl.webp",
 "sg-11134202-7qvdt-lihkkmiyyq4hd6@resize_w900_nl.webp",
 "sg-11134202-7qve3-lioldzke9rsw8c@resize_w900_nl.webp",
 "sg-11134202-7qvej-lihko87l6rr4b0@resize_w900_nl.webp",
 "sg-11134202-7qven-lihkkwiuc3d9a4@resize_w900_nl.webp",
 "sg-11134202-7qvet-lihkmyc4fp4nb9@resize_w900_nl.webp",
 "sg-11134202-7qvfl-lihkkgj3qmf464@resize_w900_nl.webp",
 "sg-11134202-7qvg0-lihkmqgtu20x8a@resize_w900_nl.webp",
 "sg-11134202-7rbk0-lm1zptc7i24r6f@resize_w900_nl.webp",
 "sg-11134202-7rbk3-lm3hipl6nhd597@resize_w900_nl.webp",
 "sg-11134202-7rbko-lm1yak09x5cb6d@resize_w900_nl.webp",
 "sg-11134202-7rbkx-lm1yak59pu4wca@resize_w900_nl.webp",
 "sg-11134202-7rbll-lm1yaqv7vrqx77@resize_w900_nl.webp",
 "sg-11134202-7rblx-lm3hj6nro47ue8@resize_w900_nl.webp",
 "sg-11134202-7rbm5-lm3g516bteft1e@resize_w900_nl.webp",
 "sg-11134202-7rbm9-lm1yajz5ys0pca@resize_w900_nl.webp",
 "sg-11134202-7rbmj-lm1zptftcrzd67@resize_w900_nl.webp",
 "sg-11134202-7rbml-lm1yexc5oqihd5@resize_w900_nl.webp",
 "sg-11134202-7rbmu-lm1zptgddddx80@resize_w900_nl.webp",
 "sg-11134202-7rbn3-lm1yak2rthllb3@resize_w900_nl.webp",
 "sg-11134202-7rbnb-lm1yaqvruyo5f8@resize_w900_nl.webp"
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


// script.js

// Ambil elemen tombol dan indikator loading
const generateBtn = document.getElementById('generateBtn');
const loadingIndicator = document.getElementById('loadingIndicator');

// Tambahkan event listener ke tombol
generateBtn.addEventListener('click', async () => {
    const userImageFile = imageUpload.files[0];
    if (!userImageFile || !bajuTerpilih) {
        alert('Silakan unggah foto DAN pilih pakaian terlebih dahulu!');
        return;
    }

    loadingIndicator.style.display = 'block';
    generateBtn.disabled = true;

    // FUNGSI BARU UNTUK MENGECILKAN GAMBAR
    const resizeImage = (file, maxSize) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Kembalikan sebagai Base64, ambil hanya datanya
                resolve(canvas.toDataURL('image/jpeg').split(',')[1]);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });

    try {
        // Panggil fungsi resize dengan batas maksimal 1024 piksel
        const userImageBase64 = await resizeImage(userImageFile, 1024);

        const payload = {
            userImage: userImageBase64,
            clothingImage: bajuTerpilih
        };

        const apiUrl = 'https://2vf4avt2ih.execute-api.us-east-1.amazonaws.com/generate-vto';
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();
        
        if (response.ok) {
            const resultImage = document.getElementById('imagePreview');
            resultImage.src = `data:image/png;base64,${result.imageResult}`;
        } else {
            throw new Error(result.message || 'Gagal menghasilkan gambar VTO.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    } finally {
        loadingIndicator.style.display = 'none';
        generateBtn.disabled = false;
    }
});