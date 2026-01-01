"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
    const { cartCount, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <Link href="/" style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily: "var(--font-mono)", color: "var(--text-primary)", zIndex: 102 }}>
                    OVERRIDE
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="hide-on-desktop"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        zIndex: 102,
                        padding: "0.5rem"
                    }}
                >
                    {isMenuOpen ? "CLOSE" : "MENU"}
                </button>

                {/* Desktop Menu */}
                <div className="hide-on-mobile" style={{ display: "flex", gap: "2rem", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                    <Link href="/collections" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>collections</Link>
                    <Link href="/shop" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>shop</Link>

                    <button onClick={toggleCart} style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", fontFamily: "inherit" }}>
                        cart [{cartCount}]
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100vh",
                        backgroundColor: "var(--bg-color)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                        zIndex: 101,
                        padding: "2rem"
                    }}>
                        <Link
                            href="/collections"
                            onClick={() => setIsMenuOpen(false)}
                            style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "1.5rem", fontFamily: "var(--font-mono)" }}
                        >
                            collections
                        </Link>
                        <Link
                            href="/shop"
                            onClick={() => setIsMenuOpen(false)}
                            style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "1.5rem", fontFamily: "var(--font-mono)" }}
                        >
                            shop
                        </Link>
                        <button
                            onClick={() => { toggleCart(); setIsMenuOpen(false); }}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--text-primary)",
                                cursor: "pointer",
                                fontFamily: "var(--font-mono)",
                                fontSize: "1.5rem"
                            }}
                        >
                            cart [{cartCount}]
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
