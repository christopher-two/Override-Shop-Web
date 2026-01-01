import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    collectionGroup,
    where,
    Timestamp,
    doc,
    getDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAiHI761iwpNC--PPpViCfM3hLayo_HfKc",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "override-shops.firebaseapp.com",
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://override-shops-default-rtdb.firebaseio.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "override-shops",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "override-shops.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "960396045126",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:960396045126:web:2ea11a43a8133268481347",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-T61ETT4EYD"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Types based on the User's Schema

export interface Category {
    id: string; // Document ID
    name: string;
    createdAt: Timestamp;
}

export interface Collection {
    id: string; // Document ID
    name: string;
    timeStamp: string;
    productIds: string[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    images: string[];
    description: string;
    inStock: boolean;
    createdAt: string;
    collectionId?: string; // Helper to know which collection it belongs to
}

// --- MOCK DATA FOR LOCAL DEVELOPMENT ---

const MOCK_CATEGORIES: Category[] = [
    { id: "keyboards", name: "Keyboards", createdAt: Timestamp.now() },
    { id: "accessories", name: "Accessories", createdAt: Timestamp.now() }
];

const MOCK_PRODUCTS: Product[] = [
    {
        id: "hhkb-hybrid",
        name: "HHKB Professional Hybrid",
        price: 320,
        category: "Keyboards",
        image: "https://placehold.co/600x400/000000/FFFFFF/png?text=HHKB+Pro",
        images: [],
        description: "The ultimate minimalist keyboard for developers. Topre switches, 60% layout, charcoal black.",
        inStock: true,
        createdAt: new Date().toISOString(),
        collectionId: "featured"
    },
    {
        id: "split-ergo",
        name: "Split Ergo Alice",
        price: 250,
        category: "Keyboards",
        image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Split+Ergo",
        images: [],
        description: "Ergonomic split layout to save your wrists during long coding sessions. QMK/VIA compatible.",
        inStock: true,
        createdAt: new Date().toISOString(),
        collectionId: "featured"
    },
    {
        id: "vim-mat",
        name: "Vim Shortcuts Deskmat",
        price: 25,
        category: "Accessories",
        image: "https://placehold.co/600x400/000000/CCCCCC/png?text=Vim+Mat",
        images: [],
        description: "Never forget how to exit vim again. High quality cloth surface.",
        inStock: true,
        createdAt: new Date().toISOString(),
        collectionId: "featured"
    },
    {
        id: "git-mug",
        name: "Git Push Mug",
        price: 18,
        category: "Accessories",
        image: "https://placehold.co/600x400/111111/EEEEEE/png?text=Git+Mug",
        images: [],
        description: "Matte black ceramic mug. 'git push --force' printed in white.",
        inStock: true,
        createdAt: new Date().toISOString(),
        collectionId: "featured"
    }
];

// Helper Functions

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
    try {
        const categoriesDisplay: Category[] = [];
        const querySnapshot = await getDocs(collection(db, "categories"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            categoriesDisplay.push({
                id: doc.id,
                name: data.name,
                createdAt: data.createdAt
            });
        });
        return categoriesDisplay;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

/**
 * Fetch all collections
 */
export async function getCollections(): Promise<Collection[]> {
    try {
        const cols: Collection[] = [];
        const querySnapshot = await getDocs(collection(db, "collections"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            cols.push({
                id: data.id || doc.id,
                name: data.name,
                timeStamp: data.timeStamp,
                productIds: data.productIds || []
            });
        });
        return cols;
    } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
    }
}

/**
 * Fetch all products using Collection Group query since they are nested
 * products/{collectionId}/items/{productId}
 * The subcollection name is 'items'
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const prods: Product[] = [];
        const q = query(collectionGroup(db, "items"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // We can try to infer collectionId from ref if needed, but for now just data
            prods.push({
                id: data.id || doc.id,
                name: data.name,
                price: data.price,
                category: data.category,
                image: data.image,
                images: data.images || [],
                description: data.description,
                inStock: data.inStock,
                createdAt: data.createdAt,
                collectionId: doc.ref.parent.parent?.id
            });
        });
        return prods;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

/**
 * Fetch a single product by ID
 * Since precise path is unknown without collectionId, we search via collectionGroup
 */
export async function getProductById(productId: string): Promise<Product | null> {
    try {
        const q = query(collectionGroup(db, "items"), where("id", "==", productId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            return {
                id: data.id || doc.id,
                name: data.name,
                price: data.price,
                category: data.category,
                image: data.image,
                images: data.images || [],
                description: data.description,
                inStock: data.inStock,
                createdAt: data.createdAt,
                collectionId: doc.ref.parent.parent?.id
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching product by id:", error);
        return null;
    }
}

/**
 * Fetch products for a specific collection
 */
export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
    try {
        // Path: products/{collectionId}/items
        const ref = collection(db, "products", collectionId, "items");
        const querySnapshot = await getDocs(ref);
        const prods: Product[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            prods.push({
                id: data.id || doc.id,
                name: data.name,
                price: data.price,
                category: data.category,
                image: data.image,
                images: data.images || [],
                description: data.description,
                inStock: data.inStock,
                createdAt: data.createdAt,
                collectionId
            });
        });
        return prods;
    } catch (error) {
        console.error("Error fetching products by collection:", error);
        return [];
    }
}

/**
 * Fetch a single collection by ID
 */
export async function getCollectionById(collectionId: string): Promise<Collection | null> {
    try {
        const docRef = doc(db, "collections", collectionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: data.id || docSnap.id,
                name: data.name,
                timeStamp: data.timeStamp,
                productIds: data.productIds || []
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching collection by id:", error);
        return null;
    }
}
