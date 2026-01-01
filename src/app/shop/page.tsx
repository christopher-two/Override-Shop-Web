import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories, Product } from "@/lib/firebase";

export const revalidate = 600; // Refetch every 10 min

interface ShopPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata = {
    title: "Shop Collection",
    description: "Browse our premium developer gear.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const allProducts = await getProducts();
    const categories = await getCategories();
    const sp = await searchParams;

    // Basic Filtering logic
    const categoryFilter = typeof sp.category === 'string' ? sp.category : null;
    const collectionFilter = typeof sp.collection === 'string' ? sp.collection : null;

    let filteredProducts = allProducts;
    let collectionName = collectionFilter;

    if (collectionFilter) {
        // Fetch collection details for the header name
        const { getProductsByCollection, getCollectionById } = await import("@/lib/firebase");
        filteredProducts = await getProductsByCollection(collectionFilter);
        const col = await getCollectionById(collectionFilter);
        if (col) {
            collectionName = col.name;
        }
    } else if (categoryFilter) {
        filteredProducts = allProducts.filter(p => p.category === categoryFilter);
    } else {
        filteredProducts = allProducts;
    }

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <h1 style={{
                marginBottom: "2rem",
                fontFamily: "var(--font-mono)",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "1rem"
            }}>
                ~/shop {collectionFilter ? `/ collection: ${collectionName}` : categoryFilter ? `/ category: ${categoryFilter}` : ""}
            </h1>

            <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
                {/* Filters */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link href="/shop"
                        className={`btn ${!categoryFilter ? 'btn-primary' : 'btn-outline'}`}>
                        All
                    </Link>
                    {categories.map(cat => (
                        <Link key={cat.id}
                            href={`/shop?category=${cat.name}`}
                            className={`btn ${categoryFilter === cat.name ? 'btn-primary' : 'btn-outline'}`}>
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Product Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <p style={{ color: "var(--text-secondary)" }}>
                            No products found {categoryFilter ? `in category "${categoryFilter}"` : ""}.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
