import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories, Product } from "@/lib/firebase";
import Link from "next/link";

// ISR: Revalidate every 10 minutes (600 seconds)
export const revalidate = 600;

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  // Show only first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Categories Section */}
      <section className="container" style={{ margin: "4rem auto" }}>
        <h2 style={{ marginBottom: "2rem", fontFamily: "var(--font-mono)" }}>
          explore_collections
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.name}`} style={{ textDecoration: "none" }}>
              <div className="card" style={{
                padding: "2rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
                border: "1px solid var(--border-color)"
              }}>
                <h3 style={{ color: "var(--text-primary)" }}>{cat.name}</h3>
              </div>
            </Link>
          ))}
          {categories.length === 0 && (
            <p style={{ color: "var(--text-secondary)" }}>No categories found. Please seed the database.</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ margin: "4rem auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-mono)" }}>featured_gear</h2>
          <Link href="/shop" className="btn btn-outline">View All</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {featuredProducts.length === 0 && (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--text-secondary)" }}>
              No products found. Please add products to Firestore.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
