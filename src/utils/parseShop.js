const COLORS = [
    "#1D9E75", // green  — vegetables, food
    "#185FA5", // blue   — clothing, services
    "#D85A30", // orange — food stalls, chai
    "#D4537E", // pink   — boutiques, beauty
    "#BA7517", // amber  — general stores
]

export async function parseShopFromText(transcript) {
    const apiKey = import.meta.env.VITE_GROQ_KEY

    const prompt = `Extract shop infor from this description.
    Return ONLY valid JSON - no explanation, no markdown.
    
    JSON shape:
    {
        "name": "shop name",
        "tagline": "one short catchy line",
        "color": "one hex from: ${COLORS.join(', ')}",
        "products": [
            { "id": 1, "name": "...", "price": 0, "emoji": "..." }
        ],
        "hours": "opening hours",
        "contact": "phone or empty",
        "location": "area/address or empty"
    }

    Max 4 products. Guess missing prices. Start with {

    description: "${transcript}"
    `

        const res = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    max_tokens: 600,
                    messages: [{role: "user", content: prompt }]
                })
            }
        )

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.error?.message || "API call failed")
        }

        const data = await res.json()

        // DEBUG: see exactly what Groq returns
        console.log('Groq response:', JSON.stringify(data, null, 2))

          // Handle Groq error in response body
        if (data.error) {
             throw new Error(data.error.message || 'Groq API error')
        }

        // Handle missing choices
        if (!data.choices || data.choices.length === 0) {
           throw new Error('Groq returned no choices — see console for full response')
        }

        const rawText = data.choices[0].message.content.trim()

        const clean = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/, '')
        .trim()

    return JSON.parse(clean)
}