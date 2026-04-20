# VoiceShop 🎤

AI-powered tool that converts spoken shop descriptions
into functional storefronts for small retail shop owners.

## Project Structure
- `client/` — React + Vite frontend
- `server/` — FastAPI Python backend

## Quick Start

**Start the backend:**
```bash
cd server
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# Create .env with GROQ_KEY=your_key
uvicorn main:app --reload --port 8000
```

**Start the frontend:**
```bash
cd client
npm install
npm run dev
```

## Tech Stack
- **Frontend**: React + Vite
- **Voice**: Web Speech API
- **Backend**: FastAPI (Python)
- **AI**: Groq API (llama-3.3-70b-versatile)

## Project Status
- ✅ Week 1: JavaScript fundamentals
- ✅ Week 2: React basics + StoreFront component
- ✅ Week 3: Voice input + AI parsing pipeline
- ✅ Week 4: Polish + mobile layout
- ✅ Week 5: FastAPI backend, API key secured
- 🔄 Week 6: Supabase database (coming soon)

## Author
Built by Arpan — CS student building real-world tools.