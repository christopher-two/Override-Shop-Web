import { MetadataRoute } from 'next';
import { getProducts, getCategories, Product } from '@/lib/firebase';

const BASE_URL = 'https://shop.override.com.mx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getProducts();
    const categories = await getCategories();

    const productUrls = products.map((product) => ({
        url: `${BASE_URL}/product/${product.id}`,
        lastModified: new Date(product.createdAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const categoryUrls = categories.map((cat) => ({
        url: `${BASE_URL}/shop?category=${encodeURIComponent(cat.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...productUrls,
        ...categoryUrls,
    ];
}
