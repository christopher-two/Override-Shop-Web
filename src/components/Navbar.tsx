"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount, toggleCart } = useCart();

    return (
        <nav style={{
            borderBottom: "1px solid var(--border-color)",
            padding: "1.5rem 0",
            backgroundColor: "var(--bg-color)",
            position: "sticky",
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/" style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                    OVERRIDE
                </Link>

                <div style={{ display: "flex", gap: "2rem", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                    <Link href="/collections" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>collections</Link>
                    <Link href="/shop" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>shop</Link>

                    <button onClick={toggleCart} style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", fontFamily: "inherit" }}>
                        cart [{cartCount}]
                    </button>
                </div>
            </div>
        </nav>
    );
}
