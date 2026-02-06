import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bloomscroll.xyz"),
  title: "Bloomscroll — Turn Scroll Time Into Grow Time",
  description:
    "Replace doomscrolling with bite-sized wisdom from books, thinkers, and life lessons. 5 minutes of scrolling = 1 idea that sticks. Subscribe to topics you love. $5/month in USDC on Base.",
  keywords: [
    "bloomscroll",
    "doomscrolling alternative",
    "bite-sized learning",
    "book summaries",
    "daily wisdom",
    "philosophy",
    "self improvement",
    "micro learning",
    "productive scrolling",
    "stoicism",
    "mental models",
    "base",
    "crypto subscription",
  ],
  authors: [{ name: "Bloomscroll" }],
  creator: "Bloomscroll",
  publisher: "Bloomscroll",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bloomscroll.xyz",
    siteName: "Bloomscroll",
    title: "Bloomscroll — Turn Scroll Time Into Grow Time",
    description:
      "Replace doomscrolling with bite-sized wisdom. Daily curated ideas from books, philosophy, science & more. $5/month.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bloomscroll - Bite-sized wisdom for curious minds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloomscroll — Turn Scroll Time Into Grow Time",
    description:
      "Replace doomscrolling with bite-sized wisdom. Daily curated ideas from books, philosophy, science & more.",
    images: ["/og-image.png"],
    creator: "@bloomscroll",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://bloomscroll.xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1A7A5E" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
