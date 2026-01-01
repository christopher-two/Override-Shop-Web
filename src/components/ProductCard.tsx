"use client";

import { Product } from "@/lib/firebase";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
            <div className="card" style={{ height: "100%", border: "none" }}>
                <div style={{
                    height: "300px",
                    backgroundColor: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    overflow: "hidden"
                }}>
                    {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
                    ) : (
                        <span style={{ color: "#333", fontFamily: "var(--font-mono)" }}>[no_img]</span>
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                        <h3 style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: "normal" }}>{product.name}</h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "0.25rem" }}>{product.category}</p>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                        ${product.price}
                    </div>
                </div>
            </div>
        </Link>
    );
}
