import type { Metadata } from "next";
import { Figtree, Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StructuredData } from "../components/StructuredData";
import { defaultMetadata, organizationSchema } from "../lib/seo";

const figtree = Figtree({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const redHatMono = Red_Hat_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-red-hat-mono",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body className={`${figtree.variable} ${redHatMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen pt-44 md:pt-56 scroll-mt-44 md:scroll-mt-56">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
