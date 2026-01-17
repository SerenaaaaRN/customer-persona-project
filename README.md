# My First Project on ML

## 📋 Project Overview

Aplikasi **End-to-End Machine Learning** yang dirancang untuk melakukan segmentasi pelanggan secara otomatis menggunakan algoritma _Unsupervised Learning_. Sistem ini mengolah data demografis dan perilaku transaksi untuk mengidentifikasi pola klaster pelanggan, yang kemudian digunakan untuk prediksi persona pelanggan baru secara real-time melalui REST API.

Project ini telah direfaktor menjadi arsitektur yang lebih ringan menggunakan Vanilla JavaScript dan Tailwind CSS , mengintegrasikan pipeline Data Science (Scikit-Learn)

---

## 🎯 Objectives

1.  **Data-Driven Segmentation:** Menggantikan segmentasi manual dengan pengelompokan berbasis algoritma K-Means Clustering untuk akurasi yang lebih tinggi.
2.  **Real-time Inference:** Menyediakan interface bagi pengguna untuk memprediksi kategori pelanggan baru secara instan tanpa perlu melatih ulang model.
3.  **Visualization:** Menyajikan distribusi data pelanggan dalam format Scatter Plot interaktif menggunakan Chart.js untuk memudahkan analisis stakeholder.

---

## Methodology & Implementation

### 1. Data Preprocessing

- **Dataset:** Mall Customer Data (Kaggle).
- **Feature Selection:** Fokus pada dimensi `Annual Income (k$)` dan `Spending Score (1-100)`.
- **Normalization:** Penerapan `StandardScaler` untuk menstandarisasi fitur agar memiliki rata-rata 0 dan varians 1, mencegah bias skala pada algoritma berbasis jarak (Euclidean distance).

### 2. Modeling (K-Means Clustering)

- **Algorithm:** K-Means Clustering.
- **Hyperparameter Tuning:** Penentuan jumlah cluster optimal ($k=5$) menggunakan **Elbow Method** (analisis WCSS).
- **Cluster Definition:**
  - **Cluster 0 (Sensible):** Low Income, Low Spending.
  - **Cluster 1 (Careless):** Low Income, High Spending.
  - **Cluster 2 (Standard):** Medium Income, Medium Spending.
  - **Cluster 3 (Saver):** High Income, Low Spending.
  - **Cluster 4 (Target):** High Income, High Spending.

### 3. System Architecture

- **Model Persistence:** Model dan Scaler disimpan (`joblib`) untuk efisiensi inferensi.
- **API Layer:** FastAPI menangani request prediksi, melakukan scaling input on-the-fly, dan mengembalikan label cluster.

---

## 🛠️ Tech Stack

### Backend & AI

- **Language:** Python
- **Framework:** FastAPI
- **Server:** Uvicorn
- **ML Libraries:** Scikit-Learn, Pandas, NumPy
- **Serialization:** Joblib

### Frontend (Lightweight Refactor)

- **Core**: Vanilla JavaScript (ES6+).
- **Styling:** Tailwind CSS CDN
- **Charting:** Chart.js
- **Icons:** Lucide Icons

---

## 🚀 Key Features

### 1. Dashboard Analytics

Visualisasi data scatter plot yang memetakan seluruh pelanggan berdasarkan `Income` vs `Spending Score`, dengan color-coding berdasarkan hasil clustering model.

### 2. Predictor Module

Form input terintegrasi yang memungkinkan pengguna memasukkan parameter pelanggan baru. Sistem melakukan request ke endpoint `/predict`, memproses data melalui Scaler dan Model yang sudah dilatih, lalu mengembalikan profil persona beserta Cluster ID.

---

## 📸 Application Preview

|          Dashboard Visualization          |           Prediction Interface            |
| :---------------------------------------: | :---------------------------------------: |
| ![Dashboard](/frontend/public/image1.png) | ![Predictor](/frontend/public/image2.png) |
