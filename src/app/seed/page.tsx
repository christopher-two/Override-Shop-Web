"use client";

import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp, collection } from "firebase/firestore";
import { useState } from "react";

export default function SeedPage() {
    const [status, setStatus] = useState("Idle");

    const handleSeed = async () => {
        setStatus("Seeding...");
        try {
            // 1. Categories
            await setDoc(doc(db, "categories", "keyboards"), {
                name: "Keyboards",
                createdAt: Timestamp.now()
            });
            await setDoc(doc(db, "categories", "accessories"), {
                name: "Accessories",
                createdAt: Timestamp.now()
            });

            // 2. Products (Nested in products/featured/items)
            const productsRef = collection(db, "products", "featured", "items");
            const productIds = ["hhkb-hybrid", "split-ergo", "vim-mat", "git-mug"];

            // Product 1
            await setDoc(doc(productsRef, "hhkb-hybrid"), {
                id: "hhkb-hybrid",
                name: "HHKB Professional Hybrid",
                price: 320,
                category: "Keyboards",
                image: "https://placehold.co/600x400/000000/FFFFFF/png?text=HHKB+Pro",
                images: [],
                description: "The ultimate minimalist keyboard for developers. Topre switches, 60% layout, charcoal black.",
                inStock: true,
                createdAt: new Date().toISOString()
            });

            // Product 2
            await setDoc(doc(productsRef, "split-ergo"), {
                id: "split-ergo",
                name: "Split Ergo Alice",
                price: 250,
                category: "Keyboards",
                image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Split+Ergo",
                images: [],
                description: "Ergonomic split layout to save your wrists during long coding sessions. QMK/VIA compatible.",
                inStock: true,
                createdAt: new Date().toISOString()
            });

            // Product 3
            await setDoc(doc(productsRef, "vim-mat"), {
                id: "vim-mat",
                name: "Vim Shortcuts Deskmat",
                price: 25,
                category: "Accessories",
                image: "https://placehold.co/600x400/000000/CCCCCC/png?text=Vim+Mat",
                images: [],
                description: "Never forget how to exit vim again. High quality cloth surface.",
                inStock: true,
                createdAt: new Date().toISOString()
            });

            // Product 4
            await setDoc(doc(productsRef, "git-mug"), {
                id: "git-mug",
                name: "Git Push Mug",
                price: 18,
                category: "Accessories",
                image: "https://placehold.co/600x400/111111/EEEEEE/png?text=Git+Mug",
                images: [],
                description: "Matte black ceramic mug. 'git push --force' printed in white.",
                inStock: true,
                createdAt: new Date().toISOString()
            });

            // 3. Collections (Updated with Product IDs)
            await setDoc(doc(db, "collections", "featured"), {
                id: "featured",
                name: "Featured Drop",
                timeStamp: new Date().toISOString(),
                productIds: productIds
            });

            setStatus("Success! Database populated.");
        } catch (e) {
            console.error(e);
            setStatus("Error: " + e);
        }
    };

    return (
        <div className="container" style={{ padding: "4rem", textAlign: "center" }}>
            <h1>Database Seeder</h1>
            <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
                Click below to populate your Firestore with sample 'Override Shop' data.
            </p>
            <button onClick={handleSeed} className="btn btn-primary">
                Initialize Data
            </button>
            <p style={{ marginTop: "2rem", fontFamily: "var(--font-mono)" }}>Status: {status}</p>
        </div>
    );
}
