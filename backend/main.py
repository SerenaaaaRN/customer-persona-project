from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ml_logic import predict_persona, get_dataset_stats

app = FastAPI(title="Customer Persona API")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# pydantic scema
class CustomerData(BaseModel):
    age: int
    annual_income: float  
    spending_score: int   

#endpoint
@app.get("/")
def read_root():
    return {"status": "alive", "message": "Backend Customer Persona Ready"}

@app.post("/predict")
def predict(data: CustomerData):
    """ menerima input user -> return persona label """
    try:
        result = predict_persona(data.age, data.annual_income, data.spending_score)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
def stats():
    '''return dataset dan cluster untuk visualisasi dengan scatter plot'''
    try:
        data = get_dataset_stats()
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))