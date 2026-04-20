import { useState, useRef } from "react";

function VoiceInput({ onTranscript, disabled }) {
    const [isRecording, setIsRecording] = useState(false)
    const [liveTest, setLiveTest] = useState('')
    const recognitionRef = useRef(null)

    const startRecording = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition

        if(!SR) {
            alert("Use Chrome - voice not supported here.")
            return
        }
        const r = new SR()
        r.lang = "en-IN"
        r.continuous = true
        r.interimResults = true
        recognitionRef.current = r

        r.onstart = () => { setIsRecording(true); setLiveTest('') }

        r.onresult = (e) => {
            let final = '', interim = ''
            for (let res of e.results) {
                if (res.isFinal) final += res[0].transcript + ' '
                else
                    interim += res[0].transcript
            }
            setLiveTest(final + interim)
            if (final) onTranscript(final.trim())
        }

        r.onerror = (e) => {
            console.error("Speech error:", e.error)
            setIsRecording(false)
        }
        r.onend = () => setIsRecording(false)
        r.start()
    }

    const stopRecording = () => {
        recognitionRef.current?.stop()
        setIsRecording(false)
    }

    return(
        <div style={{ textAlign:'center', padding:'24px 20px' }}>
            <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={disabled}
                style={{
                    width: "80px",
                    height:'80px',
                    borderRadius:'50%',
                    border: isRecording ? "2px solid #E24B4A" : "2px solid #1D9E75",
                    background: isRecording ? '#FCEBEB' : '#E1F5EE',
                    fontSize:'32px',
                    cursor:'pointer',
                    animation: isRecording ? 'pulse 1s infinite' : 'none'}}>
                {isRecording ? "⏹" : "🎤"}
            </button>

            <p style={{ fontSize:'13px', color:'#888', marginTop:'10px' }}>
                {isRecording
                ? 'Recording... tap to stop'
                : 'Tap mic and describe your shop'}
            </p>

            {liveTest && (
                <div style={{ 
                    margin: "12px",
                    padding: "12px",
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#444",
                    textAlign: "left",
                    lineHeight: "1.6" }}>{liveTest}</div>
            )}

            <style>{`
            @keyframes pulse {
            0%,100% { transform:scale(1); }
            50%     { transform:scale(1.08); }
            }
            `}</style>
        </div>
    )
}

export default VoiceInput