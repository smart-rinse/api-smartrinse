import uvicorn
from fastapi import FastAPI
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pickle
import os
import re

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load tokenizer and model once during app startup
tokenizer = None
loaded_model = None

def load_resources():
    global tokenizer, loaded_model
    with open('test/tokenizer1.pkl', 'rb') as f:
        tokenizer = pickle.load(f)
    loaded_model = load_model('test/model4.h5')

@app.on_event("startup")
async def startup_event():
    load_resources()

def preprocess_text(text):
    X = tokenizer.texts_to_sequences([text])
    X = pad_sequences(X, maxlen=100, padding='post')
    return X

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/predict')
async def predict(request: dict):
    text = request.get('content')
    if not text or text.strip() == '':
        return {"sentiment": 0}
    clean_text = preprocess_text(text)
    predictions = loaded_model.predict(clean_text)
    probability = max(predictions.tolist()[0])
    return {
        "content": text,
        "sentiment": probability,
    }

if __name__ == '__main__':
     uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
