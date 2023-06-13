import uvicorn
from fastapi import FastAPI
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pickle
import os
import re
from transformers import TFBertModel
import numpy as np

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
    with open('tokenizer.pkl', 'rb') as f:
        tokenizer = pickle.load(f)
    loaded_model = load_model('modelfix.h5',custom_objects={'TFBertModel':TFBertModel})

@app.on_event("startup")
async def startup_event():
    load_resources()

def preprocess_text(tokenizer, reviews, max_length):
    token_ids = np.zeros(shape=(len(reviews), max_length), dtype=np.int32)
    for i, review in enumerate(reviews):
        encoded = tokenizer.encode(review, max_length=max_length, truncation=True, padding='max_length')
        token_ids[i] = encoded
    attention_mask = (token_ids != 0).astype(np.int32)
    return {'input_ids': token_ids, 'attention_mask': attention_mask}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/predict')
async def predict(request: dict):
    text = request.get('content')
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'[\d]', '', text)
    if not text or text.strip() == '':
        return {"sentiment": 0}
    clean_text = preprocess_text(tokenizer,[text],75)
    predictions = loaded_model.predict(clean_text)
    probability = max(predictions.tolist()[0])
    return {
        "content": text,
        "sentiment": probability,
    }

if __name__ == '__main__':
     uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))