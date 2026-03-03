const INSTALL_DISMISSED_KEY = "bloomscroll_install_dismissed";

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
}

export function isInstallDismissed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(INSTALL_DISMISSED_KEY) === "true";
}

export function dismissInstallPrompt(): void {
  localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
}

export function shouldShowInstallPrompt(cardsViewed: number): boolean {
  if (typeof window === "undefined") return false;
  if (isStandalone()) return false;
  if (isInstallDismissed()) return false;
  return cardsViewed >= 5;
}
