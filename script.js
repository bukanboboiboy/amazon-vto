document.addEventListener('DOMContentLoaded', () => {
    // === Bagian 1: Pengambilan Elemen DOM ===
    const uploadView = document.getElementById('upload-view');
    const editorView = document.getElementById('editor-view');
    const resultView = document.getElementById('result-view');
    const views = [uploadView, editorView, resultView];

    // Elemen Upload
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const dropArea = document.getElementById('drop-area');
    const sampleImages = document.querySelectorAll('.sample-image');
    const fullscreenDropOverlay = document.getElementById('fullscreen-drop-overlay');
    // Tambahkan di bagian variabel DOM lainnya
    const homeComparisonContainer = document.getElementById('homeComparisonContainer');
    const homeAfterWrapper = document.querySelector('.home-after-wrapper');
    const homeSliderHandle = document.querySelector('.home-slider-handle');


    // Elemen Editor
    const editorUserImage = document.getElementById('editorUserImage');
    const reuploadBtn = document.getElementById('reuploadBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const editorProductGallery = document.getElementById('editorProductGallery');
    const generateBtn = document.getElementById('generateBtn');

    // Elemen Hasil
    const resultBeforeImage = document.getElementById('resultBeforeImage');
    const resultAfterImage = document.getElementById('resultAfterImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const tryAnotherBtn = document.getElementById('tryAnotherBtn');

    // Elemen Modal
    const loadingModal = document.getElementById('loadingModal');
    const errorModal = document.getElementById('errorModal');
    const errorTitle = document.getElementById('errorTitle');
    const errorMessage = document.getElementById('errorMessage');
    const errorCloseBtn = document.getElementById('errorCloseBtn');

    // Variabel Global
    let userImageFile = null;
    let selectedClothingElement = null;
    
    // === Bagian 2: Manajemen Halaman (View) ===
    const showView = (viewId) => {
        views.forEach(view => {
            view.classList.remove('active');
            if (view.id === viewId) {
                view.classList.add('active');
            }
        });
    };

    // === Bagian 3: Logika Inti ===
    const processImage = (input) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            const MAX_PIXELS = 4194304;
            if (width * height > MAX_PIXELS) {
                const ratio = Math.sqrt(MAX_PIXELS / (width * height));
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
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
            reject(new Error("Invalid image input type"));
        }
    });

    const handleImageUpload = (file) => {
        userImageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            editorUserImage.src = e.target.result;
            resultBeforeImage.src = e.target.result;
            showView('editor-view');
        };
        reader.readAsDataURL(file);
    };
    
    async function base64ToFile(base64, filename, mimeType) {
        const res = await fetch(`data:${mimeType};base64,${base64}`);
        const blob = await res.blob();
        return new File([blob], filename, { type: mimeType });
    }

    // === Bagian 4: Event Listeners ===
    uploadButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) handleImageUpload(fileInput.files[0]);
    });

    // Logika Baru untuk Fullscreen Drag & Drop
    window.addEventListener('dragenter', (e) => {
        e.preventDefault();
        // Tampilkan overlay hanya jika ada file yang diseret
        if (e.dataTransfer.types.includes('Files')) {
            fullscreenDropOverlay.classList.add('visible');
        }
    });

    fullscreenDropOverlay.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    fullscreenDropOverlay.addEventListener('dragleave', (e) => {
        // Sembunyikan overlay saat kursor meninggalkan jendela
        fullscreenDropOverlay.classList.remove('visible');
    });

    fullscreenDropOverlay.addEventListener('drop', (e) => {
        e.preventDefault();
        fullscreenDropOverlay.classList.remove('visible');
        if (e.dataTransfer.files.length > 0) {
        // Gunakan fungsi yang sudah ada untuk memproses file
        handleImageUpload(e.dataTransfer.files[0]);
        }
    });

    sampleImages.forEach(img => {
        img.addEventListener('click', async () => {
            loadingModal.classList.add('visible');
            const response = await fetch(img.dataset.src);
            const blob = await response.blob();
            const file = new File([blob], "sample_model.jpg", { type: "image/jpeg" });
            handleImageUpload(file);
            loadingModal.classList.remove('visible');
        });
    });

    reuploadBtn.addEventListener('click', () => fileInput.click());
    deleteBtn.addEventListener('click', () => {
        userImageFile = null;
        fileInput.value = '';
        showView('upload-view');
    });
    
    generateBtn.addEventListener('click', async () => {
        if (!userImageFile || !selectedClothingElement) {
            alert('Please upload a photo and choose an outfit!');
            return;
        }

        loadingModal.classList.add('visible');
        
        try {
            const userImageBase64 = await processImage(userImageFile);
            const clothingImageBase64 = await processImage(selectedClothingElement);

            const payload = { userImage: userImageBase64, clothingImage: clothingImageBase64 };
            const apiUrl = 'https://2vf4avt2ih.execute-api.us-east-1.amazonaws.com/generate-vto';
            
            const response = await fetch(apiUrl, {
                method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            
            if (response.ok && result.imageResult) {
                resultAfterImage.src = `data:image/png;base64,${result.imageResult}`;
                showView('result-view');
            } else {
                throw new Error(result.message || 'Failed to produce a VTO image.');
            }
        } catch (error) {
            console.error('Error:', error);
            let customMessage = error.message || 'Failed to produce a VTO image.';
            if (customMessage.includes('pixel count') || customMessage.includes('4194304')) {
                customMessage = 'Your image is too perfect to be improved upon. Try again with another image.';
            }
            errorTitle.textContent = 'Oops! Something went wrong';
            errorMessage.textContent = customMessage;
            errorModal.classList.add('visible');
        } finally {
            loadingModal.classList.remove('visible');
        }
    });
    
    downloadBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (resultAfterImage.src && resultAfterImage.src.startsWith('data:')) {
            const base64Data = resultAfterImage.src.split(',')[1];
            const imageFile = await base64ToFile(base64Data, `result_vto_double-b_${Date.now()}.png`, 'image/png');
            const url = URL.createObjectURL(imageFile);
            const a = document.createElement('a');
            a.href = url;
            a.download = `result_vto_double-b_${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }
    });
    
    tryAnotherBtn.addEventListener('click', () => showView('editor-view'));
    
    shareBtn.addEventListener('click', async () => {
        if (navigator.share && resultAfterImage.src) {
            try {
                const base64Data = resultAfterImage.src.split(',')[1];
                const imageFile = await base64ToFile(base64Data, 'hasil-vto.png', 'image/png');
                await navigator.share({
                    title: 'Hasil Virtual Try-On',
                    text: 'Lihat baju baru yang aku coba dengan AI Virtual Try-On!',
                    files: [imageFile]
                });
            } catch (err) {
                console.error("Failure to share:", err);
            }
        } else {
            alert('The sharing feature is not supported in this browser, or there are no images to share.');
        }
    });

    // === Bagian 5: Inisialisasi Galeri & Halaman ===
    const daftarBaju = [ "1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","20250923_2020_Denim on Display_simple_compose_01k5v89a7vfc78ksaf0vexagjs.png", "20250923_2020_Denim on Display_simple_compose_01k5v89a7xfhkbetbm161tbc2k.png", "20250923_2024_Black Bomber Jacket_simple_compose_01k5v8ghs4frt9k9tfxtbm6pbs.png", "20250923_2025_Red Shirt Display_simple_compose_01k5v8jgyfer99nh7mjak1j0dv.png", "20250923_2027_Long Sleeve Elegance_simple_compose_01k5v8mh7sev79ep99ts3whkep.png", "20250923_2029_Red Flannel Shirt_simple_compose_01k5v8rjabekpschrcsgfqvasx.png", "20250923_2030_Black Blazer Elegance_simple_compose_01k5v8vbq5fegv21g47yxxtaes.png", "Gemini_Generated_Image_5qsly5qsly5qsly5.png", "Gemini_Generated_Image_l4rczxl4rczxl4rc.png", "Gemini_Generated_Image_o1vmilo1vmilo1vm.png", "Gemini_Generated_Image_x0176ox0176ox017.png", "Gemini_Generated_Image_xhvefvxhvefvxhve.png", "Gemini_Generated_Image_yxhehoyxhehoyxhe.png" ];

    daftarBaju.forEach(namaFile => {
        const img = document.createElement('img');
        img.src = 'assets/' + namaFile;
        img.alt = namaFile;
        img.classList.add('baju-pilihan');
        img.crossOrigin = "Anonymous";
        img.addEventListener('click', () => {
            document.querySelectorAll('.baju-pilihan').forEach(el => el.classList.remove('terpilih'));
            img.classList.add('terpilih');
            selectedClothingElement = img;
        });
        editorProductGallery.appendChild(img);
    });

    // Error modal close handler
    errorCloseBtn.addEventListener('click', () => {
        errorModal.classList.remove('visible');
    });

    showView('upload-view'); // Mulai dari halaman upload
    initHomeComparisonSlider();
    
});
    // Tambahkan fungsi ini di paling bawah script.js
    function initHomeComparisonSlider() {
    const homeComparisonContainer = document.getElementById("homeComparisonContainer");
    const homeAfterWrapper = document.querySelector(".home-after-wrapper");
    const homeSliderHandle = document.querySelector(".home-slider-handle");

    if (!homeComparisonContainer || !homeAfterWrapper || !homeSliderHandle) return;

    let isDragging = false;

    const moveSlider = (x) => {
        const rect = homeComparisonContainer.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;

        // Batasi posisi antara 0 dan 100
        position = Math.max(0, Math.min(100, position));

        homeSliderHandle.style.left = position + '%';
        homeAfterWrapper.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    };

    // Event listeners untuk desktop (mouse)
    homeSliderHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        homeSliderHandle.classList.add('active'); // Tambahkan kelas active untuk gaya saat di-drag
    });
    window.addEventListener('mouseup', () => {
        isDragging = false;
        homeSliderHandle.classList.remove('active');
    });
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            moveSlider(e.clientX);
        }
    });

    // Event listeners untuk mobile (touch)
    homeSliderHandle.addEventListener('touchstart', (e) => {
        isDragging = true;
        homeSliderHandle.classList.add('active');
    });
    window.addEventListener('touchend', () => {
        isDragging = false;
        homeSliderHandle.classList.remove('active');
    });
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            moveSlider(e.touches[0].clientX);
        }
    });

    // Posisikan slider di tengah saat pertama kali dimuat
    moveSlider(homeComparisonContainer.getBoundingClientRect().left + homeComparisonContainer.offsetWidth / 2);
}

// Panggil fungsi saat halaman selesai dimuat
window.addEventListener('load', initHomeComparisonSlider);