import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import joblib
import os

path = pd.read_csv("D:/Study/data ml/customer-persona-project/backend/data/Mall_Customers.csv")
model_dir = 'models'
plot_dir = 'plots'

os.makedirs(model_dir, exist_ok=True)
os.makedirs(plot_dir,exist_ok=True)

def main():
    # data cleaning
    df = pd.DataFrame(path)

    if df.isnull().sum().sum() > 0:
        df = df.dropna()

    # feature scaling
    X = df[['Annual Income (k$)', 'Spending Score (1-100)']].values

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # elbow method
    wcss = []
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
        kmeans.fit(X_scaled)
        wcss.append(kmeans.inertia_)

    plt.figure(figsize=(10, 5))
    plt.plot(range(1, 11), wcss, marker='o')
    plt.title('The Elbow Method')
    plt.xlabel('Number of clusters')
    plt.ylabel('WCSS')
    plt.savefig(f'{plot_dir}/elbow_method.png')

    # training dengan kmeans
    kmeans = KMeans(n_clusters=5, init='k-means++', random_state=42)
    y_kmeans = kmeans.fit_predict(X_scaled)

    # cluster analysis dan labeling
    df['Cluster'] = y_kmeans
    
    # menghitung rata rata per cluster untuk nentuin label
    cluster_analysis = df.groupby('Cluster')[['Annual Income (k$)', 'Spending Score (1-100)']].mean()
    print("\nCluster Analysis (Mean Values):")
    print(cluster_analysis)

    # mapping ID cluster (0-4) ke nama Persona berdasarkan Income & Score
    # Income Rendah, Score Rendah -> Hemat / Sensible
    # Income Rendah, Score Tinggi -> Boros / Careless
    # Income Sedang, Score Sedang -> Standard / Normal
    # Income Tinggi, Score Rendah -> Sultan Pelit / Saver
    # Income Tinggi, Score Tinggi -> Target Customer / Sultan
    
    cluster_labels = {}
    centers = scaler.inverse_transform(kmeans.cluster_centers_)
    
    for i, center in enumerate(centers):
        income = center[0]
        score = center[1]
        
        if income < 40 and score < 40:
            label = "Sensible (Hemat)"
        elif income < 40 and score > 60:
            label = "Careless (Boros)"
        elif 40 <= income <= 70 and 40 <= score <= 60:
            label = "Standard (Normal)"
        elif income > 70 and score < 40:
            label = "Saver (Sultan Irit)"
        elif income > 70 and score > 60:
            label = "Target (Sultan)"
        else:
            label = f"Cluster {i}"
        
        cluster_labels[i] = label

    print("\nAssigned Labels:")
    print(cluster_labels)

    print("\nSaving models...")
    joblib.dump(scaler, f'{model_dir}/scaler.pkl')
    joblib.dump(kmeans, f'{model_dir}/kmeans.pkl')
    
    # Simpan metadata cluster
    joblib.dump(cluster_labels, f'{model_dir}/cluster_labels.pkl')

    print("Selesai! File .pkl tersimpan di folder models/.")

if __name__ == "__main__":
    main()