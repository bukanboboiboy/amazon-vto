// =======================================================
// KODE LENGKAP FINAL UNTUK SCRIPT.JS
// =======================================================

// 1. Ambil elemen-elemen penting dari HTML
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const galeriProduk = document.querySelector('.product-choices');
const generateBtn = document.getElementById('generateBtn');
const loadingIndicator = document.getElementById('loadingIndicator');

// 2. Tampilkan pratinjau saat pengguna upload foto
imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// 3. Daftar Baju (pastikan nama file ini ada di folder /assets)
const daftarBaju = [
    "01158e1a42a153ee8223cce3e0a30949@resize_w900_nl.webp", "2239b6358bb187b27a2185f21aafff4c@resize_w900_nl.webp",
    "31a778a3cf43e18c937dd7840cd0f994@resize_w900_nl.webp", "42ee31518c78b020ec1293ddd220fd6a@resize_w900_nl.webp",
    "521fdeae559b7740e209ed94abbeaf2e@resize_w900_nl.webp", "6438f74128ce355fb63cede5be09d65c@resize_w900_nl.webp",
    "679cbafd7e8342d95ef4cef3198b1211@resize_w900_nl.webp", "80670022f8362084636d05ce8d712338@resize_w900_nl.webp",
    "b04333de73fd711f530cf4d024e14342@resize_w900_nl.webp", "d1810213ad48304f9a149e0abbc87969@resize_w900_nl.webp",
    "id-11134201-7rbkb-mau3e2aw18h035@resize_w900_nl.webp", "id-11134207-7r98q-m0crzxzhz87q92@resize_w900_nl.webp",
    "id-11134207-7r98u-lyh9xjjgmxqd90@resize_w900_nl.webp", "id-11134207-7r992-lyh9xjjghbgl15@resize_w900_nl.webp",
    "id-11134207-7ra0j-mcbmikl40g5h44@resize_w900_nl.webp", "id-11134207-7ra0s-mcu2biepzsc750@resize_w900_nl.webp",
    "id-11134207-7ra0t-mclu10bqmz9za1@resize_w900_nl.webp", "id-11134207-7rasc-m4bineisefmrc1@resize_w900_nl.webp",
    "id-11134207-7rasd-m17upx3r6pz611@resize_w900_nl.webp", "id-11134207-7rasf-m3w3pyw6iss8e6@resize_w900_nl.webp",
    "id-11134207-7rbk3-m7j7qjw5c8occ8@resize_w900_nl.webp", "id-11134207-7rbk3-m99w7baw5q19ed@resize_w900_nl.webp",
    "id-11134207-7rbk3-m99x2pr5vn8e53@resize_w900_nl.webp", "id-11134207-7rbk8-m765t0bvikcc4d@resize_w900_nl.webp",
    "id-11134207-7rbk8-marxsna28cex8d@resize_w900_nl.webp", "id-11134207-7rbk9-m9dwybawlipn09@resize_w900_nl.webp",
    "id-11134207-7rbkd-m6c40vs3pmvqf6@resize_w900_nl (1).webp", "id-11134207-7rbkd-m6c40vs3pmvqf6@resize_w900_nl.webp",
    "id-11134207-81ztf-megsxi1vbyte7a@resize_w900_nl.webp", "sg-11134201-7qvcx-lhria3axla8003@resize_w900_nl.webp",
    "sg-11134201-7rd6g-lvir2bwvglx202@resize_w900_nl.webp", "sg-11134202-7qvcz-lihkmy38oho30b@resize_w900_nl.webp",
    "sg-11134202-7qvd4-lirbujnj541t29@resize_w900_nl.webp", "sg-11134202-7qvd6-lihkiv2vulty9a@resize_w900_nl.webp",
    "sg-11134202-7qvdk-lirbujh5egao7c@resize_w900_nl.webp", "sg-11134202-7qvdr-lihkkwfsgkcg07@resize_w900_nl.webp",
    "sg-11134202-7qvds-liolds0rcoafa2@resize_w900_nl.webp", "sg-11134202-7qvdt-lihkkmiyyq4hd6@resize_w900_nl.webp",
    "sg-11134202-7qve3-lioldzke9rsw8c@resize_w900_nl.webp", "sg-11134202-7qvej-lihko87l6rr4b0@resize_w900_nl.webp",
    "sg-11134202-7qven-lihkkwiuc3d9a4@resize_w900_nl.webp", "sg-11134202-7qvet-lihkmyc4fp4nb9@resize_w900_nl.webp",
    "sg-11134202-7qvfl-lihkkgj3qmf464@resize_w900_nl.webp", "sg-11134202-7qvg0-lihkmqgtu20x8a@resize_w900_nl.webp",
    "sg-11134202-7rbk0-lm1zptc7i24r6f@resize_w900_nl.webp", "sg-11134202-7rbk3-lm3hipl6nhd597@resize_w900_nl.webp",
    "sg-11134202-7rbko-lm1yak09x5cb6d@resize_w900_nl.webp", "sg-11134202-7rbkx-lm1yak59pu4wca@resize_w900_nl.webp",
    "sg-11134202-7rbll-lm1yaqv7vrqx77@resize_w900_nl.webp", "sg-11134202-7rblx-lm3hj6nro47ue8@resize_w900_nl.webp",
    "sg-11134202-7rbm5-lm3g516bteft1e@resize_w900_nl.webp", "sg-11134202-7rbm9-lm1yajz5ys0pca@resize_w900_nl.webp",
    "sg-11134202-7rbmj-lm1zptftcrzd67@resize_w900_nl.webp", "sg-11134202-7rbml-lm1yexc5oqihd5@resize_w900_nl.webp",
    "sg-11134202-7rbmu-lm1zptgddddx80@resize_w900_nl.webp", "sg-11134202-7rbn3-lm1yak2rthllb3@resize_w900_nl.webp",
    "sg-11134202-7rbnb-lm1yaqvruyo5f8@resize_w900_nl.webp"
];

let bajuTerpilihElement = null;

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
const processImage = (input, maxSize = 2048) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width * height > 4194304) {
            const ratio = Math.sqrt(4194304 / (width * height));
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

    loadingIndicator.style.display = 'block';
    generateBtn.disabled = true;

    try {
        // Proses KEDUA gambar dengan fungsi yang sama
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
            imagePreview.src = `data:image/png;base64,${result.imageResult}`;
        } else {
            console.error("Response:", result);
            throw new Error(result.message || result.error || 'Gagal menghasilkan gambar VTO atau response tidak valid.');
        }

    } catch (error) {
        console.error('Error saat fetch:', error);
        alert(error.message);
    } finally {
        loadingIndicator.style.display = 'none';
        generateBtn.disabled = false;
    } 
});