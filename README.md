# VoiceShop 🎤

AI-powered tool that converts spoken descriptions into
functional storefronts for small retail shop owners.

## The Problem
63M+ small businesses in India have no online presence.
Existing website builders require coding knowledge,
design skills, and content planning — too complex for
a vegetable vendor or boutique owner.

## The Solution
Speak your shop description in natural language.
VoiceShop uses AI to parse your words and instantly
generate a complete, shareable storefront.

## Demo
> "My name is Raju. I sell tomatoes for 30 rupees,
> potatoes for 20 rupees. Open 7am to 8pm. Call
> 9876543210. New Market, Kolkata."

→ Generates a live storefront in ~3 seconds.

## Tech Stack
- **Frontend**: React + Vite
- **Voice**: Web Speech API (browser built-in)
- **AI**: Groq API (llama-3.3-70b-versatile)
- **Styling**: Inline React styles (no CSS framework)

## Project Status
Currently in Week 3 of a 10-week build plan.
- ✅ Week 1: JavaScript fundamentals
- ✅ Week 2: React basics + StoreFront component
- ✅ Week 3: Voice input + AI parsing pipeline
- 🔄 Week 4: Polish + mobile layout (in progress)

## Local Setup
```bash
git clone https://github.com/Red8-tech/voiceshop
cd voiceshop
npm install
cp .env.example .env
# Add your Groq API key to .env
npm run dev
```

## Get a Free Groq API Key
1. Go to console.groq.com
2. Sign up (no credit card needed)
3. API Keys → Create Key
4. Paste into your .env file

## Author
Built by Arpan — Computer Science student
building real-world tools for non-technical users.
