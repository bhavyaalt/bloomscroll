import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createRouteHandlerClient } from "@/lib/supabase-server";

type DodoCustomer = {
  customer_id?: string;
  id?: string;
  email?: string;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase service credentials");
  }

  return createClient(url, serviceKey);
}

function getDodoConfig() {
  const apiKey = process.env.DODO_SECRET_KEY || process.env.DODO_API_KEY;
  const apiBaseUrl = process.env.DODO_API_BASE_URL || "https://api.dodopayments.com";

  if (!apiKey) {
    throw new Error("Missing DODO_SECRET_KEY or DODO_API_KEY");
  }

  return { apiKey, apiBaseUrl };
}

function parseCustomerList(payload: unknown): DodoCustomer[] {
  if (Array.isArray(payload)) return payload as DodoCustomer[];
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (Array.isArray(record.items)) return record.items as DodoCustomer[];
    if (Array.isArray(record.data)) return record.data as DodoCustomer[];
  }
  return [];
}

function getPortalUrl(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;

  const direct = record.link || record.url;
  if (typeof direct === "string") return direct;

  if (record.data && typeof record.data === "object") {
    const nested = record.data as Record<string, unknown>;
    if (typeof nested.link === "string") return nested.link;
    if (typeof nested.url === "string") return nested.url;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const routeSupabase = await createRouteHandlerClient();
    const { data: { user } } = await routeSupabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const reason = typeof body.reason === "string" ? body.reason : "other";
    const details = typeof body.details === "string" ? body.details.slice(0, 500) : "";

    const adminSupabase = getSupabaseAdmin();
    const email = user.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "No billing email found" }, { status: 400 });
    }

    const { data: profileById } = await adminSupabase
      .from("bloomscroll_profiles")
      .select("id, email, subscription_status")
      .eq("id", user.id)
      .maybeSingle();

    const { data: profileByEmail } = await adminSupabase
      .from("bloomscroll_profiles")
      .select("id, email, subscription_status")
      .ilike("email", email)
      .maybeSingle();

    const profile = profileById || profileByEmail;

    await adminSupabase
      .from("bloomscroll_cancellation_feedback")
      .insert({
        profile_id: profile?.id || user.id,
        email,
        reason,
        details: details || null,
        subscription_status: profile?.subscription_status || null,
      })
      .then(({ error }) => {
        if (error) {
          console.error("Failed to store cancellation feedback:", error);
        }
      });

    const { apiKey, apiBaseUrl } = getDodoConfig();

    const customerResponse = await fetch(
      `${apiBaseUrl}/customers?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      console.error("Dodo customer lookup failed:", errorText);
      return NextResponse.json({ error: "Could not open billing portal" }, { status: 502 });
    }

    const customers = parseCustomerList(await customerResponse.json());
    const customer =
      customers.find((item) => item.email?.toLowerCase() === email) ||
      customers[0];

    const customerId = customer?.customer_id || customer?.id;

    if (!customerId) {
      return NextResponse.json({ error: "No Dodo customer found for this email" }, { status: 404 });
    }

    const portalResponse = await fetch(
      `${apiBaseUrl}/customers/${customerId}/customer-portal/session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          return_url: `${request.nextUrl.origin}/profile`,
        }),
      }
    );

    if (!portalResponse.ok) {
      const errorText = await portalResponse.text();
      console.error("Dodo portal session failed:", errorText);
      return NextResponse.json({ error: "Could not create cancellation session" }, { status: 502 });
    }

    const portalUrl = getPortalUrl(await portalResponse.json());

    if (!portalUrl) {
      return NextResponse.json({ error: "Billing portal URL missing" }, { status: 502 });
    }

    return NextResponse.json({ url: portalUrl });
  } catch (error) {
    console.error("Subscription cancellation route failed:", error);
    return NextResponse.json({ error: "Failed to start cancellation" }, { status: 500 });
  }
}
