import joblib
import pandas as pd
import os

model_dir = 'models'
data_path = "D:/Study/data ml/customer-persona-project/backend/data/Mall_Customers.csv"

scaler = None
kmeans = None
cluster_labels = None

def load_models():
    # load semua model ke memory
    global scaler, kmeans, cluster_labels
    try:
        scaler = joblib.load(os.path.join(model_dir, 'scaler.pkl'))
        kmeans = joblib.load(os.path.join(model_dir, 'kmeans.pkl'))
        cluster_labels = joblib.load(os.path.join(model_dir, 'cluster_labels.pkl'))
    except Exception as e:
        print(f"Error loading modals: {e}")

def predict_persona(age: int, income: float, score: int):
    '''prediksi cluster berdasarkan input user'''

    if not kmeans or not scaler:
        load_models()

    features = [[income, score]]

    # scaling
    features_scaled = scaler.transform(features)
    
    #predict
    cluster_id = kmeans.predict(features_scaled)[0]

    # labeling
    persona_name = cluster_labels.get(int(cluster_id), "Unknown")

    return {
        "cluster_id": int(cluster_id),
        "persona": persona_name,
        "description": f"Customer ini tergolong {persona_name} berdasarkan pola belanjanya."
    }

def get_dataset_stats():
    if not kmeans or not scaler:
        load_models()
        
    df = pd.read_csv(data_path)

    X = df[['Annual Income (k$)', 'Spending Score (1-100)']].values
    X_scaled = scaler.transform(X)
    clusters = kmeans.predict(X_scaled)

    df['Cluster'] = clusters
    df['Persona'] = df['Cluster'].map(cluster_labels)

    return df.to_dict(orient='records')

load_models()