import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://shop.override.com.mx'),
  title: {
    default: "Override Shop",
    template: "%s | Override Shop",
  },
  description: "Premium keyboard, accessories and SWAG for programmers.",
  openGraph: {
    title: "Override Shop",
    description: "Premium keyboard, accessories and SWAG for programmers.",
    url: "https://shop.override.com.mx",
    siteName: "Override Shop",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Override Shop",
    description: "Premium keyboard, accessories and SWAG for programmers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <CartDrawer />
          <main style={{ minHeight: "80vh" }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
