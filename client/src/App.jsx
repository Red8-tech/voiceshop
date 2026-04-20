import { useState } from "react"
import StoreFront from "./components/StoreFront"
import VoiceInput from "./components/VoiceInput"
import StatusBar from "./components/StatusBar"
import { parseShopFromText } from "./utils/parseShop"
import SkeletonStoreFront from "./components/SkeletonStoreFront"

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
  const [isEditing, setIsEditing] = useState(true)

  const handleTranscript = async (transcript) => {
    if (!transcript.trim()) return

    setLoading(true)
    setError(null)
    setIsEditing(false)
    setStatus("AI is reading your description...")

    try {
      const shopdata = await parseShopFromText(transcript)
      setShop(shopdata)
      setStatus("")
    } catch(err) {
      setError(err.message)
      setStatus("")
      setIsEditing(true)
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

      {/* Show mic only when editing */}
      {isEditing && (
        <VoiceInput
          onTranscript={handleTranscript}
          disabled={loading}
        />
      )}

      {/* Status / error */}
      <StatusBar status={status} error={error}/>

      {/* Skeleton while loading, StoreFront when ready */}
      {loading
        ? <SkeletonStoreFront/>
        : !isEditing && (
          <StoreFront
            shop={shop}
            onEdit={() => setIsEditing(true)}
          />
        )
      }
    </div>
  )
}

export default App