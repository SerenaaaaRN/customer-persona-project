import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// interface untuk tipe data response
export interface CustomerStats {
  "Annual Income (k$)": number;
  "Spending Score (1-100)": number;
  Cluster: number;
  Persona: string;
}

export interface PredictionResult {
  cluster_id: number;
  persona: string;
  description: string;
}

// function untuk ambil data scatter plot tadi
export const getStats = async (): Promise<CustomerStats[]> => {
  const res = await api.get("/stats");
  return res.data.data;
};

//function untuk kirim data predikis
export const predictPersona = async (age: number, income: number, score: number): Promise<PredictionResult> => {
  const response = await api.post("/predict", {
    age: age,
    annual_income: income,
    spending_score: score,
  });
  return response.data;
};