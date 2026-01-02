"use client";

import { Product } from "@/lib/firebase";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }: { product: Product }) {
    const { addToCart } = useCart();

    const handleWhatsAppBuy = () => {
        const phone = "5211234567890"; // Configurable
        const message = `Halo, I want to buy: ${product.name} (ID: ${product.id}). Is it available?`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            <button
                onClick={() => addToCart(product)}
                className="btn btn-outline"
                style={{ width: "100%", padding: "1rem" }}
            >
                npm install --save (Add to Cart)
            </button>
            <button
                onClick={handleWhatsAppBuy}
                className="btn btn-primary"
                style={{ width: "100%", padding: "1rem" }}
            >
                git checkout (Buy via WhatsApp)
            </button>
        </div>
    );
}
