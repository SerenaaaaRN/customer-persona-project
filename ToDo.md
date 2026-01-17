## Fase 1: Frontend Dashboard

[x] Setup Next.js
[x] Install Shadcn UI: Inisialisasi Shadcn dan pasang komponen: Card, Button, Input, Form, Tabs.
[ ] Slicing Dashboard: Buat layout dengan Sidebar dan Navbar.
[ ] Pasang Recharts untuk visualisasi Scatter Plot (titik-titik cluster).
[ ] Slicing Predictor Page: Buat form input menggunakan Shadcn Form + Zod untuk validasi.

---

## Fase 2: Data & Machine Learning

[ ] Dataset dari Kaggle "Mall Customer Segmentation"
[ ] EDA (Notebook) Analisis statistik (Mean, Median, Standar Deviasi). Cek korelasi antara Income dan Spending Score
[ ] Clustering mengguanakn algoritma K-Means. menggunakan Elbow Method untuk menentukan jumlah cluster
[ ] Labeling tiap cluster manual (misal: "Hemat", "Sultan", "Impulsif").
[ ] Export model K-Means menggunakan library pickle atau joblib.

---

## Fase 3: Backend API

[ ] Setup FastAPI: Buat server sederhana di main.py.
[ ] Create Endpoint /predict: Buat fungsi menerima data JSON (age, income, score), lalu memanggil model ML untuk menentukan clusternya.
[ ] Create Endpoint /stats: Kirim ringkasan data EDA (rata-rata per cluster) agar bisa ditampilkan di grafik frontend.
[ ] Test API: Swagger UI untuk memastikan API.

---

## Fase 4: Integration

[ ]Fetch Data: Gunakan useEffect atau Server Components di Next.js untuk mengambil data dari FastAPI.
[ ]Mapping Data: Masukkan data dari API ke dalam komponen grafik.
[ ] Handle Loading/Error: Tambahkan state loading agar UI terasa halus.

---

## Struktur Project
```
customer-persona-project/
├── backend/                # Brain (FastAPI + ML)
│   ├── data/               # Tempat simpan dataset (.csv)
│   ├── models/             # Tempat simpan model terlatih (.pkl)
│   ├── notebooks/          # Tempat EDA (Jupyter Notebook)
│   ├── main.py             # Entry point FastAPI
│   ├── ml_logic.py         # Fungsi preprocessing & prediction
│   └── requirements.txt    # Library Python (pandas, sklearn, fastapi)
│
├── frontend/               # Shell (Next.js + Shadcn)
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Dashboard Visualisasi
│   │   └── predictor/      # Halaman Form Input
│   ├── components/
│   │   ├── ui/             # Shadcn Components 
│   │   ├── charts/         # Komponen grafik (Recharts)
│   │   └── layout/         # Navbar, Sidebar, Footer
│   ├── lib/
│   │   └── api.ts          # Axios/Fetch config ke Backend
│   └── tailwind.config.ts
└── README.md               # Dokumentasi Project
```