// Regional Pricing Configuration for Dodo Payments

export type Region = 'IN' | 'US' | 'OTHER';
export type BillingCycle = 'monthly' | 'yearly';

export interface PlanPricing {
  price: number;
  originalPrice: number; // For strikethrough display
  productId: string;
  savings?: string;
}

export interface RegionPricing {
  currency: string;
  symbol: string;
  locale: string;
  monthly: PlanPricing;
  yearly: PlanPricing;
  discountPercent: number;
}

export const PRICING: Record<Region, RegionPricing> = {
  IN: {
    currency: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    discountPercent: 17,
    monthly: { 
      price: 149, 
      originalPrice: 179,
      productId: process.env.NEXT_PUBLIC_DODO_INR_MONTHLY || 'pdt_0NZhOW3CE8kBUybLJEXpj' 
    },
    yearly: { 
      price: 999, 
      originalPrice: 1199,
      productId: process.env.NEXT_PUBLIC_DODO_INR_YEARLY || 'pdt_0NZhOcVC5iWA9ZERoAzsl',
      savings: 'Save ₹789/yr' 
    },
  },
  US: {
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    discountPercent: 17,
    monthly: { 
      price: 4.99, 
      originalPrice: 5.99,
      productId: process.env.NEXT_PUBLIC_DODO_USD_MONTHLY || 'pdt_0NZhOieGgNkEHC9GqbTBx' 
    },
    yearly: { 
      price: 39.99, 
      originalPrice: 47.99,
      productId: process.env.NEXT_PUBLIC_DODO_USD_YEARLY || 'pdt_0NZhOoNwre6igKDvDFsSX',
      savings: 'Save $20/yr' 
    },
  },
  OTHER: {
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    discountPercent: 17,
    monthly: { 
      price: 4.99, 
      originalPrice: 5.99,
      productId: process.env.NEXT_PUBLIC_DODO_USD_MONTHLY || 'pdt_0NZhOieGgNkEHC9GqbTBx' 
    },
    yearly: { 
      price: 39.99, 
      originalPrice: 47.99,
      productId: process.env.NEXT_PUBLIC_DODO_USD_YEARLY || 'pdt_0NZhOoNwre6igKDvDFsSX',
      savings: 'Save $20/yr' 
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
  // First try timezone (most reliable, no network)
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta') {
      return 'IN';
    }
    if (timezone.startsWith('America/New_York') || 
        timezone.startsWith('America/Los_Angeles') ||
        timezone.startsWith('America/Chicago') ||
        timezone.startsWith('America/Denver')) {
      return 'US';
    }
  } catch (e) {
  }
  
  // Then try IP-based detection
  try {
    const res = await fetch('https://ipapi.co/country_code/', {
      cache: 'no-store',
    });
    
    if (res.ok) {
      const country = (await res.text()).trim();
      
      if (country === 'IN') return 'IN';
      if (country === 'US') return 'US';
    }
  } catch (e) {
  }
  
  // Final fallback - check language
  try {
    const lang = navigator.language || navigator.languages?.[0];
    if (lang?.includes('IN') || lang === 'hi' || lang === 'hi-IN') {
      return 'IN';
    }
  } catch {}
  
  return 'OTHER';
}

// Format price with currency
export function formatPrice(region: Region, price: number): string {
  const pricing = PRICING[region];
  return new Intl.NumberFormat(pricing.locale, {
    style: 'currency',
    currency: pricing.currency,
    minimumFractionDigits: pricing.currency === 'INR' ? 0 : 2,
    maximumFractionDigits: pricing.currency === 'INR' ? 0 : 2,
  }).format(price);
}

// Get checkout URL for Dodo Payments
export function getCheckoutUrl(productId: string, customerEmail?: string, successUrl?: string): string {
  const baseUrl = 'https://checkout.dodopayments.com/buy';
  const url = new URL(`${baseUrl}/${productId}`);
  
  if (customerEmail) {
    url.searchParams.set('prefilled_email', customerEmail);
  }
  
  if (successUrl) {
    url.searchParams.set('redirect_url', successUrl);
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
