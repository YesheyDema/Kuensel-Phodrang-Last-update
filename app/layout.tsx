import type { Metadata, Viewport } from "next";
import { Inter, Lato, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { DonationsProvider } from "@/lib/donations-store";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  preload: true,
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buddha Dordenma | Sacred Sanctuary in Bhutan",
  description:
    "Discover Buddha Dordenma, the world's largest sitting Buddha statue in Thimphu, Bhutan. A sacred sanctuary of peace, meditation, and spiritual enlightenment nestled in the Himalayas.",
  keywords: [
    "Buddha Dordenma",
    "Bhutan",
    "Buddhist statue",
    "Thimphu",
    "meditation",
    "spiritual journey",
    "Himalayan sanctuary",
  ],
  openGraph: {
    title: "Buddha Dordenma | Sacred Sanctuary in Bhutan",
    description:
      "Experience the world's largest sitting Buddha statue in the mystical kingdom of Bhutan.",
    type: "website",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#be5e49",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${lato.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <DonationsProvider>
          {children}
        </DonationsProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
