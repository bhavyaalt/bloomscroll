export interface GrowthEventPayload {
  event: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

export function trackGrowthEvent(payload: GrowthEventPayload) {
  if (typeof window === "undefined") return;

  try {
    const body = JSON.stringify(payload);
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Best effort only.
  }
}
