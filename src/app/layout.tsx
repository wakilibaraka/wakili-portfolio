import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wakilibaraka.github.io/wakili-portfolio/"),
  title: "Emmanuel Baraka — Advocate of the High Court of Kenya",
  description: "Emmanuel Baraka is an Advocate of the High Court of Kenya and policy strategist committed to justice, equity, and truth.",
  openGraph: {
    title: "Emmanuel Baraka — Advocate of the High Court of Kenya",
    description: "Emmanuel Baraka is an Advocate of the High Court of Kenya and policy strategist committed to justice, equity, and truth.",
    url: "https://wakilibaraka.github.io/wakili-portfolio/",
    siteName: "Emmanuel Baraka",
    type: "website",
    images: [
      {
        url: "https://wakilibaraka.github.io/wakili-portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emmanuel Baraka — 3D Office Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Baraka — Advocate of the High Court of Kenya",
    description: "Emmanuel Baraka is an Advocate of the High Court of Kenya and policy strategist committed to justice, equity, and truth.",
    images: ["https://wakilibaraka.github.io/wakili-portfolio/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} font-sans min-h-screen bg-[#0e2018] text-[#f7f5ee] selection:bg-[#d4af37] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
