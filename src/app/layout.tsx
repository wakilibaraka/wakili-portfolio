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
  metadataBase: new URL("https://wakili.barakalines.com/"),
  title: "Emmanuel Baraka — Law, Human Rights & Policy",
  description: "Emmanuel Baraka is a law graduate and human-rights practitioner completing admission as an Advocate of the High Court of Kenya — focused on constitutional litigation, human rights, and policy.",
  openGraph: {
    title: "Emmanuel Baraka — Law, Human Rights & Policy",
    description: "Emmanuel Baraka is a law graduate and human-rights practitioner completing admission as an Advocate of the High Court of Kenya — focused on constitutional litigation, human rights, and policy.",
    url: "https://wakili.barakalines.com/",
    siteName: "Emmanuel Baraka",
    type: "website",
    images: [
      {
        url: "https://wakili.barakalines.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emmanuel Baraka — 3D Office Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Baraka — Law, Human Rights & Policy",
    description: "Emmanuel Baraka is a law graduate and human-rights practitioner completing admission as an Advocate of the High Court of Kenya — focused on constitutional litigation, human rights, and policy.",
    images: ["https://wakili.barakalines.com/og-image.png"],
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
