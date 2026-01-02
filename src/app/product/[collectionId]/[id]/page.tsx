import { getProduct } from "@/lib/firebase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions"; // Client component for interactivity

export const revalidate = 600;

interface ProductPageProps {
    params: Promise<{ collectionId: string; id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { collectionId, id } = await params;
    const product = await getProduct(collectionId, id);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.image ? [product.image] : [],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { collectionId, id } = await params;
    const product = await getProduct(collectionId, id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: "2rem 0" }}>
            <Link href="/shop" className="btn btn-outline" style={{ marginBottom: "2rem", display: "inline-flex" }}>
                &lt; Back to Shop
            </Link>

            <div className="product-details-grid">
                {/* Image Section */}
                <div
                    className="product-image-container"
                    style={{
                        backgroundColor: "var(--surface-color)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius)",
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                    }}>
                    {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                        <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>No Image Preview</span>
                    )}
                </div>

                {/* Details Section */}
                <div>
                    <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--text-primary)" }}>{product.name}</h1>
                    <div style={{
                        fontSize: "1.5rem",
                        color: "var(--accent-color)",
                        fontFamily: "var(--font-mono)",
                        marginBottom: "2rem"
                    }}>
                        ${product.price}
                    </div>

                    <div style={{
                        backgroundColor: "var(--surface-color)",
                        padding: "1.5rem",
                        borderRadius: "var(--radius)",
                        marginBottom: "2rem",
                        border: "1px solid var(--border-color)"
                    }}>
                        <h3 style={{ marginBottom: "0.5rem", fontSize: "1rem", color: "var(--text-secondary)" }}>// Description</h3>
                        <p style={{ lineHeight: "1.6" }}>{product.description}</p>
                    </div>

                    <div>
                        <ProductActions product={product} />
                    </div>

                    <div style={{ marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                        <p>Category: {product.category}</p>
                        <p>ID: {product.id}</p>
                        <p>In Stock: {product.inStock ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
