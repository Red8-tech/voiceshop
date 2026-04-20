let lastCallTime = 0

export async function parseShopFromText(transcript) {
  const now = Date.now()
  if (now - lastCallTime < 3000) {
    throw new Error('Please wait a moment before trying again.')
  }
  lastCallTime = now

  const res = await fetch('http://localhost:8000/api/parse-shop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail || 'Server error')
  }

  return res.json()
}