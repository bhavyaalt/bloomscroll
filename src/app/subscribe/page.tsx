import { Suspense } from "react";
import { headers } from "next/headers";
import SubscribeContent from "@/components/subscribe/SubscribeContent";
import { detectRegionFromHeaders } from "@/lib/pricing";

export default async function SubscribePage() {
  const requestHeaders = await headers();
  const initialRegion = detectRegionFromHeaders(requestHeaders);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bglight flex items-center justify-center">
          <div className="animate-pulse text-4xl font-bold text-bgdark">Loading...</div>
        </div>
      }
    >
      <SubscribeContent initialRegion={initialRegion} />
    </Suspense>
  );
}
