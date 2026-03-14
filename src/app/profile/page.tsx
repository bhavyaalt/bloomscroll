import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

const appUrl = process.env.NEXT_PUBLIC_URL || "https://bloomscroll.club";

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const name = params.name || "A Reader";
  const cards = params.cards || "0";
  const streak = params.streak || "0";
  const longest = params.longest || "0";
  const quiz = params.quiz || "0";
  const days = params.days || "0";

  const ogParams = new URLSearchParams({
    name,
    cards,
    streak,
    longest,
    quiz,
    days,
  });
  const ogImageUrl = `${appUrl}/api/og/profile?${ogParams.toString()}`;

  const title = `${name}'s BloomScroll Stats`;
  const description = `${cards} cards read · ${streak} day streak · ${longest} longest streak · ${quiz}% quiz accuracy · ${days} days active`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${appUrl}/profile`,
      siteName: "BloomScroll",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${name}'s BloomScroll reading stats`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: "@bloomscroll",
    },
  };
}

export default function ProfilePage() {
  return <ProfileClient />;
}
