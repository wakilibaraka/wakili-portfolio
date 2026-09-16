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
  title: "Emmanuel Baraka | Advocate & Legal Counsel",
  description: "Interactive Chambers & Portfolio of Emmanuel Baraka, Advocate of the High Court.",
  icons: {
    icon: "/favicon.ico",
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
