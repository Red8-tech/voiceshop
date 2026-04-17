function SkeletonCard() {
    return (
        <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
            border: "1px solid #eee"
        }}>
            {/* Emoji placeholder */}
            <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#e8e8e8",
                margin: "0 auto 12px",
                animation: "shimmer 1.5s infinite"
            }}/>
            {/* Name placeholder */}
            <div style={{
                height: "14px",
                width: "70%",
                background: "#e8e8e8",
                borderRadius: "6px",
                margin: "0 auto",
                animation: "shimmer 1.5s infinite"
            }}/>
            {/* Price placeholder */}
            <div style={{
                height: "20px",
                width: "40%",
                background: "#e8e8e8",
                borderRadius: "6px",
                margin: "0 auto",
                animation: "shimmer 1.5s infinite 0.2s"
            }}/>
        </div>
    )
}



function SkeletonStoreFront() {
    return (
        <div style={{
            maxWidth: "480px",
            margin: "0 auto",
            fontFamily: "sans-serif"
        }}>
            {/* Header skeleton */}
            <div style={{
                background: "#e8e8e8",
                padding: "40px 20px",
                textAlign: "center"
            }}>
                <div style={{
                    height: "28px",
                    width: "60%",
                    background: "#ccc",
                    borderRadius: "8px",
                    margin: "0 auto 12px",
                    animation: "shimmer 1.5s infinite"
                }}/>
                <div style={{
                    height: "16px",
                    width: "40%",
                    background: "#ccc",
                    borderRadius: "6px",
                    margin: "0 auto",
                    animation: "shimmer 1.5s infinite 0.15s"
                }}/>
            </div>

            {/* Product grid skeleton */}
            <div style={{ padding: "20px" }}>
                <div style={{
                    height: "18px",
                    width: "30%",
                    background: "#e8e8e8",
                    borderRadius: "6px",
                    marginBottom: "16px",
                    animation: "shimmer 1.5s infinite"
                }}/>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px"
                }}>
                    {[1,2,3,4].map(i => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>

            {/* Info bar skeleton */}
            <div style={{
                background: "#e8e8e8",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                {[1,2,3].map(i => (
                    <div key={i} style={{
                        height: "14px",
                        width: i === 1 ? "55%" : i === 2 ? "45%" : "65%",
                        background: "#ccc",
                        borderRadius: "6px",
                        animation: `shimmer 1.5s infinite ${i * 0.1}s`
                    }}/>
                ))}
            </div>

            <style>{`
            @keyframes shimmer {
            0%, 100% {opacity: 1; }
            50% {opacity: 0.4; }
            }
            `}</style>
        </div>
    )
}

export default SkeletonStoreFront