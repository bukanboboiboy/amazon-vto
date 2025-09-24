document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen-elemen penting dari HTML
    const imageUpload = document.getElementById('imageUpload');
    const fileNameSpan = document.getElementById('fileName');
    const galeriProduk = document.querySelector('.product-gallery');
    const generateBtn = document.getElementById('generateBtn');
    
    // Elemen baru
    const loadingModal = document.getElementById('loadingModal');
    const outputSection = document.getElementById('outputSection');
    const resultContainer = document.getElementById('resultContainer');
    const beforeImage = document.getElementById('beforeImage');
    const afterImage = document.getElementById('afterImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeButton = document.querySelector('.close-button');
    const afterPlaceholder = document.getElementById('afterPlaceholder');
    const afterActions = document.getElementById('afterActions');
    const steps = document.querySelectorAll('.stepper .step');
    const shareBtn = document.getElementById('shareBtn');

    let originalImageSrc = null;
    let bajuTerpilihElement = null;

    // Fungsi untuk update stepper
    const updateStepper = (stepIndex) => {
        steps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    };

    // 2. Tampilkan nama file dan update UI saat pengguna upload foto
    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            fileNameSpan.textContent = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImageSrc = e.target.result;
                // Langsung tampilkan di 'before'
                outputSection.style.display = 'block';
                beforeImage.src = originalImageSrc;
                
                // Atur ulang tampilan 'After'
                afterPlaceholder.style.display = 'flex';
                afterImage.style.display = 'none';
                afterActions.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    });

    // 3. Daftar Baju (pastikan diisi dengan nama file di folder assets)
    const daftarBaju = [
        "20250923_2020_Denim on Display_simple_compose_01k5v89a7vfc78ksaf0vexagjs.png",
        "20250923_2020_Denim on Display_simple_compose_01k5v89a7xfhkbetbm161tbc2k.png",
        "20250923_2024_Black Bomber Jacket_simple_compose_01k5v8ghs4frt9k9tfxtbm6pbs.png",
        "20250923_2025_Red Shirt Display_simple_compose_01k5v8jgyfer99nh7mjak1j0dv.png",
        "20250923_2027_Long Sleeve Elegance_simple_compose_01k5v8mh7sev79ep99ts3whkep.png",
        "20250923_2029_Red Flannel Shirt_simple_compose_01k5v8rjabekpschrcsgfqvasx.png",
        "20250923_2030_Black Blazer Elegance_simple_compose_01k5v8vbq5fegv21g47yxxtaes.png",
        "Gemini_Generated_Image_5qsly5qsly5qsly5.png",
        "Gemini_Generated_Image_l4rczxl4rczxl4rc.png",
        "Gemini_Generated_Image_o1vmilo1vmilo1vm.png",
        "Gemini_Generated_Image_x0176ox0176ox017.png",
        "Gemini_Generated_Image_xhvefvxhvefvxhve.png",
        "Gemini_Generated_Image_yxhehoyxhehoyxhe.png"
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

    // 5. Fungsi final untuk memproses gambar
    const processImage = (input) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            const MAX_PIXELS = 4194304;

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

        loadingModal.style.display = 'flex';
        generateBtn.disabled = true;
        updateStepper(1); // Update stepper ke langkah 2

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
                afterPlaceholder.style.display = 'none';
                afterImage.style.display = 'block';
                afterActions.style.display = 'block';
                afterImage.src = `data:image/png;base64,${result.imageResult}`;
                downloadBtn.href = `data:image/png;base64,${result.imageResult}`;

                if (navigator.share) { // Cek apakah browser mendukung Web Share API
                    shareBtn.style.display = 'inline-block'; // Tampilkan tombol jika didukung

                    shareBtn.onclick = async () => {
                        try {
                            const imageFile = await base64ToFile(result.imageResult, 'hasil-vto.png', 'image/png');
                            await navigator.share({
                                title: 'Hasil Virtual Try-On',
                                text: 'Lihat baju baru yang aku coba dengan AI Virtual Try-On!',
                                files: [imageFile]
                            });
                        } catch (err) {
                            console.error("Gagal share:", err);
                        }
                    };
                } else {
                    shareBtn.style.display = 'none'; // Sembunyikan tombol jika tidak didukung (di desktop)
                }
            } else {
                throw new Error(result.message || 'Gagal menghasilkan gambar VTO.');
            }

        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
            updateStepper(0); // Kembalikan stepper ke langkah 1 jika error
        } finally {
            loadingModal.style.display = 'none';
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

    // Inisialisasi stepper ke langkah pertama
    updateStepper(0);
});

async function base64ToFile(base64, filename, mimeType) {
    const res = await fetch(`data:${mimeType};base64,${base64}`);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
}