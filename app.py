import uvicorn
from fastapi import FastAPI
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pickle
import os
import requests

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url = 'https://storage.googleapis.com/machinelearning-27/tokenizer1.pkl'
local_file_path = 'tokenizer1.pkl'

response = requests.get(url)
with open(local_file_path, 'wb') as f:
    f.write(response.content)

# Setelah file berhasil diunduh, Anda dapat membukanya seperti ini:
with open(local_file_path, 'rb') as f:
    tokenizer = pickle.load(f)

url = 'https://storage.googleapis.com/machinelearning-27/model2.h5'
local_model_path = 'model2.h5'

response = requests.get(url)
with open(local_model_path, 'wb') as f:
    f.write(response.content)


def my_pipeline(text):
    X = tokenizer.texts_to_sequences([text])
    X = pad_sequences(X, maxlen=100, padding='post')
    return X

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/predict')
async def predict(request: dict):
    text = request.get('text')
    clean_text = my_pipeline(text)
    loaded_model = load_model(local_model_path)
    predictions = loaded_model.predict(clean_text)
    probability = max(predictions.tolist()[0])
    
    if probability > 0.5:
        t_sentiment = 'Positif'
    else:
        t_sentiment = 'Negatif'
 
    return {
        "Kalimat": text,
        "Sentimen": t_sentiment,
        "Hasil": probability
    }

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
