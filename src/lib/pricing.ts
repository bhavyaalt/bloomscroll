// Regional Pricing Configuration for Dodo Payments

export type Region = 'IN' | 'US' | 'OTHER';
export type BillingCycle = 'monthly' | 'yearly';

export interface PlanPricing {
  price: number;
  productId: string;
  savings?: string;
}

export interface RegionPricing {
  currency: string;
  symbol: string;
  locale: string;
  monthly: PlanPricing;
  yearly: PlanPricing;
}

// TODO: Replace with actual Dodo product IDs from your dashboard
export const PRICING: Record<Region, RegionPricing> = {
  IN: {
    currency: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    monthly: { 
      price: 200, 
      productId: process.env.NEXT_PUBLIC_DODO_INR_MONTHLY || 'prod_inr_monthly' 
    },
    yearly: { 
      price: 2000, 
      productId: process.env.NEXT_PUBLIC_DODO_INR_YEARLY || 'prod_inr_yearly',
      savings: '17%' 
    },
  },
  US: {
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    monthly: { 
      price: 5, 
      productId: process.env.NEXT_PUBLIC_DODO_USD_MONTHLY || 'prod_usd_monthly' 
    },
    yearly: { 
      price: 45, 
      productId: process.env.NEXT_PUBLIC_DODO_USD_YEARLY || 'prod_usd_yearly',
      savings: '25%' 
    },
  },
  OTHER: {
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    monthly: { 
      price: 5, 
      productId: process.env.NEXT_PUBLIC_DODO_USD_MONTHLY || 'prod_usd_monthly' 
    },
    yearly: { 
      price: 45, 
      productId: process.env.NEXT_PUBLIC_DODO_USD_YEARLY || 'prod_usd_yearly',
      savings: '25%' 
    },
  },
};

// Region display names
export const REGION_NAMES: Record<Region, string> = {
  IN: '🇮🇳 India',
  US: '🇺🇸 United States',
  OTHER: '🌍 International',
};

// Detect region from Vercel/Cloudflare headers (server-side)
export function detectRegionFromHeaders(headers: Headers): Region {
  const country = 
    headers.get('x-vercel-ip-country') || 
    headers.get('cf-ipcountry') || 
    'US';
  
  if (country === 'IN') return 'IN';
  if (country === 'US') return 'US';
  return 'OTHER';
}

// Detect region from IP (client-side)
export async function detectRegionClient(): Promise<Region> {
  try {
    // Try ipapi.co first (free tier: 1000 req/day)
    const res = await fetch('https://ipapi.co/json/', {
      cache: 'force-cache', // Cache the result
    });
    
    if (!res.ok) throw new Error('ipapi failed');
    
    const data = await res.json();
    const country = data.country_code;
    
    if (country === 'IN') return 'IN';
    if (country === 'US') return 'US';
    return 'OTHER';
  } catch {
    // Fallback: try to detect from browser timezone/locale
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.startsWith('Asia/Kolkata') || timezone.startsWith('Asia/Calcutta')) {
        return 'IN';
      }
      if (timezone.startsWith('America/')) {
        return 'US';
      }
    } catch {}
    
    return 'OTHER';
  }
}

// Format price with currency
export function formatPrice(region: Region, price: number): string {
  const pricing = PRICING[region];
  return new Intl.NumberFormat(pricing.locale, {
    style: 'currency',
    currency: pricing.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Get checkout URL for Dodo Payments
export function getCheckoutUrl(productId: string, customerEmail?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_DODO_CHECKOUT_URL || 'https://checkout.dodopayments.com/buy';
  const url = new URL(`${baseUrl}/${productId}`);
  
  if (customerEmail) {
    url.searchParams.set('prefilled_email', customerEmail);
  }
  
  return url.toString();
}

// Calculate yearly savings
export function calculateYearlySavings(region: Region): { amount: number; percentage: string } {
  const pricing = PRICING[region];
  const monthlyTotal = pricing.monthly.price * 12;
  const yearlyPrice = pricing.yearly.price;
  const savings = monthlyTotal - yearlyPrice;
  const percentage = Math.round((savings / monthlyTotal) * 100);
  
  return {
    amount: savings,
    percentage: `${percentage}%`,
  };
}
