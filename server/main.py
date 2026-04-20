from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx, os, json, re

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

COLORS = ["#1D9E75","#185FA5","#D85A30","#D4537E","#BA7517"]

class TranscriptRequest(BaseModel):
    transcript: str

@app.get("/")
def health_check():
    return {"status": "VoiceShop server running"}

@app.post("/api/parse-shop")
async def parse_shop(body: TranscriptRequest):
    transcript = body.transcript.strip()
    if not transcript:
        raise HTTPException (status_code=400, detail="No transcript provided")
    
    prompt = f"""Extract shop info from this voice description.
Return ONLY valid JSON. Start with {{ and end with }}.

{{
    "name":     "shop name",
    "tagline":  "one short catchy line",
    "color":    "one hex from: {', '.join(COLORS)}",
    "products": [{{"id":1,"name":"...","price":0,"emoji":"..."}}],
    "hours":    "opening hours",
    "contact":  "phone or empty string",
    "location": "area or empty string"
}}

Max 4 products. Guess price if missing.
Pick best emoji per product.
Pick color that fits the shop type.

Voice description: "{transcript}"
"""
    
    groq_key = os.getenv("GROQ_KEY")
    if not groq_key:
        raise HTTPException (status_code=500, detail="GROQ_KEY not set in .env")
    
    async with httpx.AsyncClient() as client:
        try:
            res = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {groq_key}"
                },
                json={
                    "model": "llama-3.3-70b-versatile",
                    "max_tokens": 600,
                    "messages": [{"role":"user","content":prompt}]
                },
                timeout=30.0
            )
            res.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Groq error: {e.response.text}"
            )
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Request failed: {str(e)}"
            )
        
    data = res.json()
    if "choices" not in data or not data["choices"]:
        raise HTTPException(
            status_code=500,
            detail=f"No response from Groq"
        )
    
    raw = data["choices"][0]["message"]["content"].strip()
    clean = re.sub(r'^```json\s*', '', raw,   flags=re.IGNORECASE)
    clean = re.sub(r'^```\s*',     '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'```\s*$',     '', clean).strip()

    try:
        return json.loads(clean)
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"JSON parse failed: {str(e)}"
        )