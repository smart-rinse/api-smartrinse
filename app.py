import uvicorn
from fastapi import FastAPI
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pickle

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('tokenizer1.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

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
    loaded_model = load_model('model/model2.h5')
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
    uvicorn.run(app, host='0.0.0.0', port=8080)
