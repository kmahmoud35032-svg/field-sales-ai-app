from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import random
import time

app = FastAPI(title="Planogram AI Service")

class AnalysisResult(BaseModel):
    share_of_shelf: float
    missing_skus: List[str]
    compliance_score: float
    detected_products: int
    processing_time: float

@app.get("/")
def read_root():
    return {"message": "AI Service is running"}

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_image(file: UploadFile = File(...)):
    start_time = time.time()
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Simulate reading image bytes
    # content = await file.read()
    
    # Mock Analysis Logic
    # In a real system, this would involve:
    # 1. Object Detection (YOLO/FasterRCNN) to find products
    # 2. Classification to identify SKUs
    # 3. Comparison with Planogram Matrix
    
    # Simulating processing delay
    time.sleep(1.5)
    
    # Mock Results based on random factors
    total_slots = 50
    detected = random.randint(30, 48)
    missing_count = total_slots - detected
    
    missing_skus = [f"SKU-{random.randint(1000, 9999)}" for _ in range(missing_count)]
    
    share_of_shelf = round(detected / total_slots, 2)
    compliance_score = round((detected / total_slots) * 100, 2)

    return AnalysisResult(
        share_of_shelf=share_of_shelf,
        missing_skus=missing_skus,
        compliance_score=compliance_score,
        detected_products=detected,
        processing_time=round(time.time() - start_time, 2)
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
