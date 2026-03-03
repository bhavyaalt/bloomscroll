import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { FarcasterProvider } from "@/components/FarcasterProvider";

const appUrl = process.env.NEXT_PUBLIC_URL || "https://bloomscroll.club";

export const viewport: Viewport = {
  themeColor: "#13ec80",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Bloomscroll – Daily Wisdom in 60 Seconds | Replace Doomscrolling",
  description:
    "Transform your scrolling habit. Get curated wisdom from Seneca, Marcus Aurelius, and history's greatest minds in bite-sized 60-second reads. Free daily wisdom app.",
  keywords: [
    "bloomscroll",
    "daily wisdom app",
    "stoicism app",
    "book summary app",
    "replace doomscrolling",
    "mindful scrolling app",
    "philosophy quotes daily",
    "doomscrolling alternative",
    "bite-sized learning",
    "seneca",
    "marcus aurelius",
    "micro learning",
    "productive scrolling",
    "mental models",
    "60 second reads",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bloomscroll",
  },
  authors: [{ name: "Bloomscroll" }],
  creator: "Bloomscroll",
  publisher: "Bloomscroll",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appUrl,
    siteName: "Bloomscroll",
    title: "Bloomscroll – Daily Wisdom in 60 Seconds | Replace Doomscrolling",
    description:
      "Transform your scrolling habit. Get curated wisdom from Seneca, Marcus Aurelius, and history's greatest minds in bite-sized 60-second reads.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bloomscroll - Turn Scroll Time Into Grow Time",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloomscroll – Daily Wisdom in 60 Seconds | Replace Doomscrolling",
    description:
      "Transform your scrolling habit. Curated wisdom from history's greatest minds in 60-second reads.",
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
    canonical: appUrl,
  },
  // Farcaster Frame metadata
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${appUrl}/og-image.png`,
    "fc:frame:button:1": "🌱 Start Growing",
    "fc:frame:button:1:action": "launch_frame",
    "fc:frame:button:1:target": appUrl,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bloomscroll" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Bloomscroll",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              description:
                "Replace mindless scrolling with meaningful wisdom. 60-second summaries from history's greatest minds.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "127",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bloomscroll",
              url: "https://bloomscroll.xyz",
              logo: "https://bloomscroll.xyz/icon.png",
              sameAs: [
                "https://twitter.com/bloomscroll",
                "https://instagram.com/bloomscroll",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <FarcasterProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </FarcasterProvider>
      </body>
    </html>
  );
}
