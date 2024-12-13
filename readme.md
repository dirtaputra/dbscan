```markdown
# Clustering Pelanggan dan Hub untuk Optimasi Logistik

## **Deskripsi Proyek**
Proyek ini bertujuan untuk mengoptimalkan pengelolaan logistik dalam industri e-commerce. Dengan memanfaatkan algoritma unsupervised learning, yaitu **DBSCAN** dan **K-Means**, kita akan melakukan clustering pada data pelanggan dan hub distribusi untuk memberikan rekomendasi tata letak dan distribusi beban kerja yang lebih efisien.

---

## **Latar Belakang**
E-commerce modern menghadapi tantangan besar dalam pengelolaan logistik, terutama dalam:
1. **Pengelompokan pelanggan** berdasarkan lokasi dan pola pesanan.
2. **Penyeimbangan beban kerja antar hub** untuk menghindari overload pada hub tertentu.
3. **Mengurangi biaya operasional** dengan rute distribusi yang lebih efisien.

Dengan clustering, kita dapat:
- Mengidentifikasi kelompok pelanggan yang sering memesan bersama berdasarkan lokasi geografis.
- Menyeimbangkan beban kerja antar hub berdasarkan volume pengiriman.
- Memberikan rekomendasi rute pengiriman yang lebih optimal.

---

## **Tujuan Proyek**
1. **Clustering Pelanggan:**
   - Mengelompokkan pelanggan berdasarkan lokasi geografis menggunakan algoritma **DBSCAN**.
   - Menentukan pelanggan yang berada di luar cluster (noise).

2. **Clustering Hub:**
   - Mengelompokkan hub distribusi berdasarkan volume pengiriman menggunakan algoritma **K-Means**.
   - Menentukan hub mana yang membutuhkan penyesuaian beban.

3. **Rekomendasi Operasional:**
   - Memberikan rekomendasi tata letak distribusi pelanggan dan hub untuk meningkatkan efisiensi pengiriman.

---

## **Dataset**
### **1. Data Pelanggan**
Setiap pelanggan memiliki atribut berikut:
- **ID Pelanggan**: Identitas unik pelanggan.
- **Lokasi Geografis**: Latitude dan longitude pelanggan.
- **Frekuensi Pesanan**: Jumlah pesanan dalam periode tertentu.
- **Nilai Pesanan**: Rata-rata nilai pesanan pelanggan.

**Contoh Data:**
```json
[
  { "id": "C123", "location": [-6.2, 106.8], "frequency": 20, "orderValue": 500 },
  { "id": "C124", "location": [-6.3, 107.0], "frequency": 15, "orderValue": 300 }
]
```

### **2. Data Hub**
Setiap hub memiliki atribut berikut:
- **ID Hub**: Identitas unik hub.
- **Volume Pengiriman**: Total volume barang yang dikelola oleh hub.

**Contoh Data:**
```json
[
  { "hubId": "H1", "volume": 5000 },
  { "hubId": "H2", "volume": 3000 }
]
```

---

## **Algoritma yang Digunakan**
### **1. DBSCAN (Density-Based Spatial Clustering of Applications with Noise)**
- **Deskripsi**: Mengelompokkan data berdasarkan densitas titik dalam suatu area.
- **Parameter Utama**:
  - **Epsilon (`ε`)**: Radius maksimum untuk menentukan tetangga.
  - **Min Points (`minPts`)**: Jumlah minimum poin dalam radius untuk membentuk cluster.
- **Kelebihan**:
  - Cocok untuk data dengan bentuk cluster yang tidak teratur.
  - Menentukan outlier atau noise secara otomatis.
- **Penerapan**:
  - Digunakan untuk clustering data pelanggan berdasarkan lokasi geografis.

### **2. K-Means**
- **Deskripsi**: Mengelompokkan data dengan membagi dataset ke dalam `k` cluster berdasarkan centroid.
- **Parameter Utama**:
  - **Jumlah Cluster (`k`)**: Jumlah grup yang ingin dibentuk.
- **Kelebihan**:
  - Cepat dan sederhana untuk data numerik.
- **Penerapan**:
  - Digunakan untuk clustering data hub berdasarkan volume pengiriman.

---

## **Hasil Clustering**
### **1. Pelanggan**
Hasil clustering pelanggan menggunakan DBSCAN:
```plaintext
Cluster 1: [ 'C123', 'C125', 'C127' ]
Cluster 2: [ 'C124', 'C126' ]
```

### **2. Hub**
Hasil clustering hub menggunakan K-Means:
```plaintext
Cluster 1: [ 'H1', 'H3' ]
Cluster 2: [ 'H2' ]
```

---

## **Analisis dan Rekomendasi**
### **1. Pelanggan**
- **Cluster 1**:
  - Berisi pelanggan yang berada di wilayah yang sama.
  - Disarankan untuk digabungkan dalam satu rute distribusi.
- **Cluster 2**:
  - Berisi pelanggan di wilayah lain yang dapat dikelompokkan bersama.

### **2. Hub**
- **Cluster 1**:
  - Hub dengan volume tinggi. Disarankan untuk diberikan prioritas dalam alokasi armada pengiriman.
- **Cluster 2**:
  - Hub dengan volume lebih rendah. Disarankan untuk digabungkan dengan hub terdekat jika memungkinkan.

---

## **Cara Menjalankan Proyek**
1. **Persiapkan Lingkungan**
   - Pastikan Node.js sudah terinstal di sistem Anda.
   - Inisialisasi proyek baru dengan perintah:
     ```bash
     npm init -y
     ```

2. **Tambahkan File Kode**
   - Buat file `index.js` dan salin kode program ke dalamnya.

3. **Jalankan Program**
   - Jalankan perintah berikut:
     ```bash
     node index.js
     ```

4. **Tinjau Output**
   - Hasil clustering akan ditampilkan di terminal.

---

## **Kelebihan Proyek**
1. Tidak bergantung pada library eksternal (semua algoritma diimplementasikan manual).
2. Dapat disesuaikan untuk data yang lebih besar atau kompleks.
3. Menggunakan metode unsupervised learning untuk memberikan insight berbasis data.

---

## **Pengembangan Lebih Lanjut**
1. **Visualisasi Data**:
   - Gunakan library frontend seperti `Leaflet.js` atau `Google Maps API` untuk memetakan lokasi pelanggan dan hub.
2. **Optimasi Parameter**:
   - Eksperimen dengan nilai `epsilon` dan `minPts` untuk DBSCAN, atau `k` untuk K-Means.
3. **Integrasi Sistem**:
   - Gabungkan hasil clustering dengan sistem logistik untuk perencanaan rute dan alokasi sumber daya.

---

## **Lisensi**
Proyek ini bersifat open-source dan dapat digunakan untuk tujuan pembelajaran atau pengembangan lebih lanjut.

```

---