import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bloomscroll.xyz"),
  title: "Bloomscroll — Don't Doom, Just Bloom",
  description:
    "Replace the infinite scroll with infinite wisdom. Digestible 60-second summaries of history's greatest ideas, delivered daily. Philosophy, history, science — curated for curious minds. $5/month in USDC on Base.",
  keywords: [
    "bloomscroll",
    "doomscrolling alternative",
    "bite-sized learning",
    "book summaries",
    "daily wisdom",
    "philosophy",
    "stoicism",
    "seneca",
    "marcus aurelius",
    "micro learning",
    "productive scrolling",
    "mental models",
    "base",
    "crypto subscription",
    "60 second reads",
  ],
  authors: [{ name: "Bloomscroll" }],
  creator: "Bloomscroll",
  publisher: "Bloomscroll",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bloomscroll.xyz",
    siteName: "Bloomscroll",
    title: "Bloomscroll — Don't Doom, Just Bloom",
    description:
      "Replace the infinite scroll with infinite wisdom. 60-second summaries of history's greatest ideas. Philosophy, history, science — curated daily.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bloomscroll - Don't Doom, Just Bloom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloomscroll — Don't Doom, Just Bloom",
    description:
      "Replace the infinite scroll with infinite wisdom. 60-second summaries of history's greatest ideas.",
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
        <meta name="theme-color" content="#007A5E" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
