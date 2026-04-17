function ProductCard({ name, price, emoji }){
    return (
        <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px 16px",
            textAlign: "center",
            border: "1px solid #eee",
            cursor: "default",
            transition: "transform 0.15s, box-shadow 0.15s"
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)"
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "none"
        }}
        >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {emoji}
            </div>
            <div style={{
                fontWeight: "600",
                fontSize: "15px",
                color: "#222",
                marginBottom: "6px"
            }}>
                {name}
            </div>
            <div style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#1D9E75"
            }}>
                ${price}
            </div>
        </div>
    )
}


function StoreFront({ shop, onEdit }) {
    if (!shop || !shop.name) return null

    return (
        <div style={{
            maxWidth: "480px",
            margin: "0 auto",
            fontFamily: "sans-serif",
            paddingBottom: "40px"
        }}>
            {/* Header */}
            <div style={{
                background: shop.color || "#1D9E75",
                color: "white",
                padding: "36px 24px 28px",
                textAlign: "center",
                position: "relative"
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: "26px",
                    fontWeight: "700",
                    letterSpacing: "-0.3px"
                }}>
                    {shop.name}
                </h1>
                <p style={{
                    margin: "8px 0 0",
                    opacity: 0.88,
                    fontSize: "14px",
                    lineHeight: "1.5"
                }}>
                    {shop.tagline}
                </p>

                {/* edit button */}
                {onEdit && (
                    <button
                    onClick={onEdit}
                    style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        color: "white",
                        borderRadius: "20px",
                        padding: "6px 14px",
                        fontSize: "12px",
                        cursor: "pointer",
                        fontWeight: "500"
                    }}>
                        ✏️ Edit
                    </button>
                )}
            </div>


            {/* Products */}
            {shop.products && shop.products.length > 0 && (
                <div style={{ padding: '24px 20px 8px' }}>
                    <h2 style={{
                        fontSize: "17px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "16px"
                    }}>
                        Our Products
                    </h2>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px"
                    }}>
                        {shop.products.map(p => (
                            <ProductCard
                            key={p.id}
                            name={p.name}
                            price={p.price}
                            emoji={p.emoji}
                            />
                        ))}
                    </div>
                </div>    
            )}


            {/* Info bar */}
            <div style={{
                background: shop.color || "#1D9E75",
                color: "white",
                margin: "20px",
                borderRadius: "16px",
                padding: "20px"
            }}>
                {shop.hours && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "12px",
                        fontSize: "14px"
                    }}>
                        <span style={{ fontSize: "18px" }}>🕐</span>
                        <span>{shop.hours}</span>
                    </div>    
                )}
                {shop.contact && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "12px",
                        fontSize: "14px"
                    }}>
                        <span style={{ fontSize: "18px" }}>📞</span>
                        <span>{shop.contact}</span>
                    </div>
                )}
                {shop.location && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "12px",
                        fontSize: "14px"
                    }}>
                        <span style={{ fontSize: "18px" }}>📍</span>
                        <span>{shop.location || "Location not spedified"}</span>
                    </div>
                )}
            </div>

        </div>
    )
}


export default StoreFront