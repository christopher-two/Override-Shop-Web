import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{
            padding: "4rem 0 2rem",
            borderTop: "1px solid var(--border-color)",
            marginTop: "4rem",
            backgroundColor: "var(--bg-color)",
            color: "var(--text-primary)",
            overflow: "hidden"
        }}>
            <div className="container">

                {/* Top Section: Tagline & Links */}
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "4rem" }}>

                    <div style={{ flex: "1 1 300px" }}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "normal", marginBottom: "1rem" }}>Upgrade your setup</h3>
                    </div>

                    <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <strong style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>Product</strong>
                            <Link href="/shop?category=Keyboards" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Keyboards</Link>
                            <Link href="/shop?category=Accessories" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Accessories</Link>
                            <Link href="/shop" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>All Gear</Link>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <strong style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>Resources</strong>
                            <Link href="#" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Documentation</Link>
                            <Link href="#" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Changelog</Link>
                            <Link href="#" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Support</Link>
                        </div>
                    </div>
                </div>

                {/* Massive Text */}
                <div style={{
                    fontSize: "clamp(3rem, 15vw, 15rem)",
                    fontWeight: "bold",
                    textAlign: "center",
                    lineHeight: "0.8",
                    marginBottom: "4rem",
                    letterSpacing: "-0.04em",
                    userSelect: "none"
                }}>
                    OVERRIDE
                </div>

                {/* Bottom Section */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "2rem",
                    flexWrap: "wrap",
                    gap: "1rem"
                }}>
                    <div style={{ fontWeight: "bold" }}>Override Shop</div>
                    <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        <span>About</span>
                        <span>Products</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
