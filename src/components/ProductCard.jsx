function ProductCard({ name, price, emoji }) {
    return (
        <div style={{ background: "white",
                      borderRadius: "12px",
                      padding: "16px",
                      textAlign: "center",
                      border: "1px solid #eee"}}>
        <div style={{ fontSize: "32px" }}>{emoji}</div>
        <div style={{ fontWeight: "600", marginTop: "8px" }}>{name}</div>
        <div style={{ color: "#1D9E75", fontSize: "18px", fontWeight: "700", marginTop: "4px" }}>
            ₹{price}
            </div>
        </div>
    )
}

export default ProductCard