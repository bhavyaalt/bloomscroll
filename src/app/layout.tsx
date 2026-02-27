import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { FarcasterProvider } from "@/components/FarcasterProvider";

const appUrl = process.env.NEXT_PUBLIC_URL || "https://scrollbliss.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Scrollbliss — Scroll Into Bliss",
  description:
    "Replace mindless scrolling with meaningful wisdom. Digestible 60-second summaries of history's greatest ideas, delivered daily. Philosophy, history, science — curated for curious minds.",
  keywords: [
    "scrollbliss",
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
  authors: [{ name: "Scrollbliss" }],
  creator: "Scrollbliss",
  publisher: "Scrollbliss",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appUrl,
    siteName: "Scrollbliss",
    title: "Scrollbliss — Scroll Into Bliss",
    description:
      "Replace mindless scrolling with meaningful wisdom. 60-second summaries of history's greatest ideas. Philosophy, history, science — curated daily.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Scrollbliss - Scroll Into Bliss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrollbliss — Scroll Into Bliss",
    description:
      "Replace mindless scrolling with meaningful wisdom. 60-second summaries of history's greatest ideas.",
    images: ["/og-image.png"],
    creator: "@scrollbliss",
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
    "fc:frame:button:1": "✨ Scroll Into Bliss",
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#007A5E" />
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
