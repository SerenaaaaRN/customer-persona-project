## My first project on ML Projects

---

### Project ini menggunakan Unsupervised Learning untuk mengelompokkan data tanpa label.

#### Data Preprocessing:

- Feature Selection: Menggunakan Annual Income dan Spending Score.
- Scaling: Menggunakan StandardScaler untuk normalisasi data.

#### Modeling:

- Algoritma: K-Means Clustering.
- Optimal K: Ditentukan menggunakan Elbow Method (k=5).

#### Cluster Labels:

- Sensible (Hemat): Income Rendah, Spending Rendah.
- Careless (Boros): Income Rendah, Spending Tinggi.
- Standard (Normal): Income Menengah, Spending Menengah.
- Saver (Sultan Irit): Income Tinggi, Spending Rendah.
- Target (Sultan): Income Tinggi, Spending Tinggi.

---

### 🚀 Tech Stack

#### Frontend (Client)

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Visualization:** Recharts (Scatter Plot)
- **State & Fetching:** Axios, React Hooks
- **Validation:** Zod + React Hook Form

#### Backend (Server & ML)

- **Framework:** FastAPI
- **Machine Learning:** Scikit-Learn (K-Means), Pandas, NumPy
- **Model Serialization:** Joblib
- **Server:** Uvicorn

---

### Fitur

1. Dashboard Visualisasi
   Menampilkan sebaran data pelanggan dalam grafik Scatter Plot. Warna titik merepresentasikan cluster yang berbeda.

2. AI Predictor
   Form input untuk memprediksi kategori pelanggan baru. Cukup masukkan Umur, Income, dan Spending Score, lalu sistem akan mengembalikan hasil analisis persona secara instan.
   
---

![document1](image1.png)
![document2](image2.png)
