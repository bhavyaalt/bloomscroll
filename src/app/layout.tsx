import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { FarcasterProvider } from "@/components/FarcasterProvider";

const appUrl = process.env.NEXT_PUBLIC_URL || "https://bloomscroll.club";

export const viewport: Viewport = {
  themeColor: "#007A5E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Bloomscroll — Turn Scroll Time Into Grow Time",
  description:
    "Replace mindless scrolling with meaningful wisdom. Digestible 60-second summaries of history's greatest ideas, delivered daily. Philosophy, history, science — curated for curious minds.",
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
    "farcaster",
    "mini app",
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
    title: "Bloomscroll — Turn Scroll Time Into Grow Time",
    description:
      "Replace mindless scrolling with meaningful wisdom. 60-second summaries of history's greatest ideas. Philosophy, history, science — curated daily.",
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
    title: "Bloomscroll — Turn Scroll Time Into Grow Time",
    description:
      "Replace mindless scrolling with meaningful wisdom. 60-second summaries of history's greatest ideas.",
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bloomscroll" />
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
