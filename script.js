// =======================================================
// KODE LENGKAP FINAL UNTUK SCRIPT.JS (VERSI UPGRADE)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen-elemen penting dari HTML
    const imageUpload = document.getElementById('imageUpload');
    const fileNameSpan = document.getElementById('fileName');
    const galeriProduk = document.querySelector('.product-gallery');
    const generateBtn = document.getElementById('generateBtn');
    
    // Elemen baru
    const loadingModal = document.getElementById('loadingModal');
    const resultContainer = document.getElementById('resultContainer');
    const placeholderText = document.getElementById('placeholderText');
    const beforeImage = document.getElementById('beforeImage');
    const afterImage = document.getElementById('afterImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeButton = document.querySelector('.close-button');
    const afterPlaceholder = document.getElementById('afterPlaceholder');
    const afterActions = document.getElementById('afterActions');

    let originalImageSrc = null; // Untuk menyimpan gambar asli
    let bajuTerpilihElement = null;

    // 2. Tampilkan nama file saat pengguna upload foto
    // script.js (versi baru)

    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            fileNameSpan.textContent = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImageSrc = e.target.result;

                placeholderText.style.display = 'none';
                resultContainer.style.display = 'flex';
                beforeImage.src = originalImageSrc;
                
                // Atur ulang tampilan 'After'
                afterPlaceholder.style.display = 'flex';
                afterImage.style.display = 'none';
                afterActions.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    });

    // 3. Daftar Baju (tambahkan nama file gambar yang ada di folder assets)
    const daftarBaju = [

    ];

    // 4. Buat galeri baju secara dinamis
    daftarBaju.forEach(namaFile => {
        const imgElement = document.createElement('img');
        imgElement.src = 'assets/' + namaFile;
        imgElement.alt = namaFile;
        imgElement.classList.add('baju-pilihan');
        imgElement.crossOrigin = "Anonymous";

        imgElement.addEventListener('click', () => {
            document.querySelectorAll('.baju-pilihan').forEach(img => {
                img.classList.remove('terpilih');
            });
            imgElement.classList.add('terpilih');
            bajuTerpilihElement = imgElement;
        });
        galeriProduk.appendChild(imgElement);
    });

    // 5. Fungsi final untuk memproses gambar (resize + ubah ke Base64)
    const processImage = (input) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            const MAX_PIXELS = 4194304; // Batas 4MP dari Nova Canvas

            if (width * height > MAX_PIXELS) {
                const ratio = Math.sqrt(MAX_PIXELS / (width * height));
                width *= ratio;
                height *= ratio;
            }

            canvas.width = Math.round(width);
            canvas.height = Math.round(height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            resolve(canvas.toDataURL('image/jpeg', 0.9).split(',')[1]);
        };
        img.onerror = reject;

        if (input instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(input);
            reader.onload = (e) => { img.src = e.target.result; };
            reader.onerror = reject;
        } else if (input instanceof HTMLImageElement) {
            img.src = input.src;
        } else {
            reject(new Error("Tipe input untuk proses gambar tidak valid"));
        }
    });

    // 6. Logika utama saat tombol "Buat Ajaib!" diklik
    generateBtn.addEventListener('click', async () => {
        const userImageFile = imageUpload.files[0];
        if (!userImageFile || !bajuTerpilihElement) {
            alert('Silakan unggah foto DAN pilih pakaian terlebih dahulu!');
            return;
        }

        loadingModal.style.display = 'flex'; // Tampilkan modal loading
        generateBtn.disabled = true;

        try {
            const userImageBase64 = await processImage(userImageFile);
            const clothingImageBase64 = await processImage(bajuTerpilihElement);

            const payload = {
                userImage: userImageBase64,
                clothingImage: clothingImageBase64
            };
            
            const apiUrl = 'https://2vf4avt2ih.execute-api.us-east-1.amazonaws.com/generate-vto';
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            
            if (response.ok && result.imageResult) {
                // Tampilkan hasil
                afterPlaceholder.style.display = 'none'; // Sembunyikan placeholder
                afterImage.style.display = 'block'; // Tampilkan gambar hasil
                afterActions.style.display = 'block'; // Tampilkan tombol download

                afterImage.src = `data:image/png;base64,${result.imageResult}`;
                downloadBtn.href = `data:image/png;base64,${result.imageResult}`;
            } else {
                throw new Error(result.message || 'Gagal menghasilkan gambar VTO.');
            }

        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
            loadingModal.style.display = 'none'; // Sembunyikan modal loading
            generateBtn.disabled = false;
        }
    });

    // 7. Logika Lightbox
    afterImage.addEventListener('click', () => {
        lightboxImage.src = afterImage.src;
        lightboxModal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
    });
    
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
        }
    });
});