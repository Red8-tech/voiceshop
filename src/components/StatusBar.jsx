function StatusBar({ status, error }) {
    if (!status && !error) return null

    if (error) {
        return (
            <div style={{
                margin: "12px 12px",
                padding: "10px 14px",
                background: "#FCEBEB",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#791F1f"
            }}>
                ✗ Error: {error}
            </div>
        )
    }

    return (
        <div style={{
            margin: "12px 20px",
            padding: "10px 14px",
            background: "#E1F5EE",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#085041",
            display: "flex",
            alignItems: "center",
            gap: "8px"
        }}>
            <span style={{
                width: "14px",
                height: "14px",
                border: "2px solid #1D9E75",
                borderTopColor: "transparent",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.8s linear infinite"
            }}/>
            {status}
            <style>{`
            @keyframes spin {
            to {transform: rotate(360deg); }
            }
            `}</style>
        </div>
    )
}

export default StatusBar