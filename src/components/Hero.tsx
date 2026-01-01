import Link from "next/link";

export default function Hero() {
    return (
        <section style={{
            padding: "8rem 0",
            borderBottom: "1px solid var(--border-color)"
        }}>
            <div className="container">
                <h1 style={{
                    fontSize: "4rem",
                    marginBottom: "0.5rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 300
                }}>
                    OVERRIDE_SHOP
                </h1>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: "2rem" }}>
                    <p style={{
                        fontSize: "1rem",
                        color: "var(--text-secondary)",
                        maxWidth: "300px",
                        fontFamily: "var(--font-mono)"
                    }}>
            // essential gear<br />
            // for developers
                    </p>

                    <Link href="/shop" className="btn btn-primary">
                        view_collection()
                    </Link>
                </div>
            </div>
        </section>
    );
}
