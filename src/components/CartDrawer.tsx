"use client";

import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css"; // We'll create this or use inline for now. Let's use CSS Modules for cleanliness? Or just standard CSS.
// Using standard module CSS for specific component styles
import { Product } from "@/lib/firebase";

export default function CartDrawer() {
    const { cart, isOpen, toggleCart, removeFromCart, cartTotal } = useCart();

    if (!isOpen) return null;

    const handleCheckout = () => {
        // WhatsApp Checkout Logic
        const phone = "5211234567890"; // TODO: Replace with user number or dynamic config
        // Construct message
        let message = "Hola, me gustaría comprar los siguientes productos:\n\n";
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}): $${item.price * item.quantity}\n`;
        });
        message += `\nTotal: $${cartTotal}`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <>
            <div className="cart-overlay" onClick={toggleCart} style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999
            }} />
            <div className="cart-drawer" style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: "min(350px, 100vw)",
                backgroundColor: "var(--bg-color)", borderLeft: "1px solid var(--border-color)",
                zIndex: 1000, padding: "1.5rem", display: "flex", flexDirection: "column"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <h2 style={{ fontFamily: "var(--font-mono)" }}>./cart</h2>
                    <button onClick={toggleCart} className="btn btn-outline">X</button>
                </div>

                <div style={{ flex: 1, overflowY: "auto" }}>
                    {cart.length === 0 ? (
                        <p style={{ color: "var(--text-secondary)" }}>The cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} style={{
                                marginBottom: "1rem", padding: "0.5rem",
                                border: "1px solid var(--border-color)", borderRadius: "var(--radius)"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontWeight: "bold" }}>{item.name}</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Qty: {item.quantity}</span>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: "var(--error-color)", background: "none", border: "none", cursor: "pointer" }}>[rm]</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                        <span>TOTAL:</span>
                        <span>${cartTotal}</span>
                    </div>
                    <button onClick={handleCheckout} className="btn btn-primary" style={{ width: "100%" }}>
                        git push --checkout
                    </button>
                </div>
            </div>
        </>
    );
}
