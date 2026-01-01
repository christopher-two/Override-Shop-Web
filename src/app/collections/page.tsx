import Link from "next/link";
import { getCollections } from "@/lib/firebase";

export const revalidate = 600;

export const metadata = {
    title: "Collections | Override Shop",
    description: "Browse curated collections of developer gear.",
};

export default async function CollectionsPage() {
    const collections = await getCollections();

    return (
        <div className="container" style={{ padding: "2rem 0" }}>
            <h1 style={{ marginBottom: "2rem", fontFamily: "var(--font-mono)" }}>
                ~/collections
            </h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
                {collections.map((col) => (
                    <Link key={col.id} href={`/shop?collection=${col.id}`} style={{ textDecoration: "none" }}>
                        <div style={{
                            border: "1px solid var(--border-color)",
                            padding: "3rem",
                            textAlign: "center",
                            backgroundColor: "var(--bg-color)",
                            transition: "all 0.2s",
                            cursor: "pointer"
                        }} className="card">
                            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>{col.name}</h2>
                            <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                                {col.productIds.length} ITEMS
                            </p>
                        </div>
                    </Link>
                ))}
                {collections.length === 0 && (
                    <p>No collections found.</p>
                )}
            </div>
        </div>
    );
}
