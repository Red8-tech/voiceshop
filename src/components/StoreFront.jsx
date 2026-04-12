import ProductCard from "./ProductCard";

function StoreFront({ shop }) {
    return (
        <div style={{ fontFamily: "sans-serif",
                       maxWidth: "480px",
                       margin: "0 auto" }}>

            <div style={{ background: shop.color,
                          color: "white",
                          padding: "32px 20px",
                          textAlign: "center" }}>
                <h1 style={{ margin: 0, fontSize: "24px" }}>{shop.name}</h1>
                <p style={{ margin: "8px 0 0", opacity: 0.85, fontSize: "14px"}}>
                    {shop.tagline}
                </p>
            </div>

            <div style={{ padding: "20px"}}>
                <h2 style={{ fontSize: "16px", color: "#555", marginBottom: "12px"}}>Our Products</h2>
                <div style={{ display: "grid",
                               gridTemplateColumns: "repeat(2,1fr)",
                               gap: "12px" }}>
                    {shop.products.map(product => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            emoji={product.emoji}
                        />
                    ))}
                </div>
            </div>

            <div style={{ 
                background: "#1D9E75",
                color: "white",                       padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "14px"
            }}>
                {shop.hours && <div>🕐 {shop.hours}</div>}
                {shop.contact && <div>📞 {shop.contact}</div>}
                {shop.location && <div>📍 {shop.location}</div>}
            </div>
        </div>
    )
}

export default StoreFront