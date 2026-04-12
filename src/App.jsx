import { useState } from "react"
import ProductCard from "./components/ProductCard"
import StoreFront from "./components/StoreFront"
import VoiceInput from "./components/VoiceInput"
import StatusBar from "./components/StatusBar"
import { parseShopFromText } from "./utils/parseShop"

const defaultShop = {
  name: "Your shop name",
  tagline: "Describe your shop using mic below",
  color: "#1D9E75",
  products: [],
  hours: "",
  contact: "",
  location: ""
}

function App() {
  const [shop, setShop] = useState(defaultShop)
  const [status, setStatus] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTranscript = async (transcript) => {
    if (!transcript.trim()) return

    setLoading(true)
    setError(null)
    setStatus("AI is reading your description...")

    try {
      const shopdata = await parseShopFromText(transcript)
      setShop(shopdata)
      setStatus("")
    } catch(err) {
      setError(err.message)
      setStatus("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      fontFamily: "sans-serif"
    }}>
      <VoiceInput
      onTranscript={handleTranscript}
      disabled={loading}
      />
      <StatusBar status={status} error={error}/>
      <StoreFront shop={shop}/>
    </div>
  )
}

export default App