// Push notification utilities

const PUSH_ENABLED_KEY = "bloomscroll_push_enabled";
const PUSH_TIME_KEY = "bloomscroll_push_time";

export interface NotificationSettings {
  enabled: boolean;
  reminderTime: string; // HH:MM format
  lastNotification: string | null;
}

export interface PushSettings {
  enabled: boolean;
  time: string; // HH:MM format
  lastNotification: string | null;
}

export function getNotificationSettings(): NotificationSettings {
  if (typeof window === "undefined") {
    return { enabled: false, reminderTime: "09:00", lastNotification: null };
  }
  
  return {
    enabled: localStorage.getItem(PUSH_ENABLED_KEY) === "true",
    reminderTime: localStorage.getItem(PUSH_TIME_KEY) || "09:00",
    lastNotification: localStorage.getItem("bloomscroll_last_push"),
  };
}

export function getPushSettings(): PushSettings {
  const settings = getNotificationSettings();
  return {
    enabled: settings.enabled,
    time: settings.reminderTime,
    lastNotification: settings.lastNotification,
  };
}

export function savePushSettings(settings: Partial<PushSettings>): void {
  if (typeof window === "undefined") return;
  
  if (settings.enabled !== undefined) {
    localStorage.setItem(PUSH_ENABLED_KEY, String(settings.enabled));
  }
  if (settings.time) {
    localStorage.setItem(PUSH_TIME_KEY, settings.time);
  }
}

export function isPushSupported(): boolean {
  return typeof window !== "undefined" && 
    "serviceWorker" in navigator && 
    "PushManager" in window &&
    "Notification" in window;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isPushSupported()) return false;
  const permission = await Notification.requestPermission();
  return permission === "granted";
}

export function getNotificationPermission(): NotificationPermission | null {
  if (!isPushSupported()) return null;
  return Notification.permission;
}

export async function registerPushServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isPushSupported()) return null;
  
  try {
    const registration = await navigator.serviceWorker.register("/sw-push.js");
    console.log("Push SW registered:", registration);
    return registration;
  } catch (error) {
    console.error("Push SW registration failed:", error);
    return null;
  }
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!isPushSupported()) return null;
  
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return null;
    
    const registration = await registerPushServiceWorker();
    if (!registration) return null;
    
    // For now, we'll use local notifications since we don't have a push server
    // In production, you'd subscribe to a push server here
    savePushSettings({ enabled: true });
    
    return null;
  } catch (error) {
    console.error("Push subscription failed:", error);
    return null;
  }
}

export async function unsubscribeFromPush(): Promise<void> {
  savePushSettings({ enabled: false });
  
  if (!isPushSupported()) return;
  
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
    }
  } catch (error) {
    console.error("Push unsubscribe failed:", error);
  }
}

// Local notification fallback (works without push server)
export async function sendLocalNotification(title: string, body: string): Promise<void> {
  if (!isPushSupported()) return;
  
  const granted = await requestNotificationPermission();
  if (!granted) return;
  
  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(title, {
    body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: "bloomscroll-reminder",
    renotify: true,
  } as NotificationOptions);
}

let reminderTimeout: ReturnType<typeof setTimeout> | null = null;

// Schedule daily reminder check
export function scheduleDailyReminder(time?: string): void {
  // Clear any existing timeout
  if (reminderTimeout) {
    clearTimeout(reminderTimeout);
  }
  
  const settings = getNotificationSettings();
  const reminderTime = time || settings.reminderTime;
  
  // Save the time if provided
  if (time) {
    savePushSettings({ enabled: true, time });
  }
  
  if (!settings.enabled && !time) return;
  
  const [hours, minutes] = reminderTime.split(":").map(Number);
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hours, minutes, 0, 0);
  
  // If time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  const delay = scheduledTime.getTime() - now.getTime();
  
  reminderTimeout = setTimeout(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastNotification = localStorage.getItem("bloomscroll_last_push");
    
    // Only send if we haven't sent today
    if (lastNotification !== today) {
      const message = getRandomReminderMessage();
      sendLocalNotification(message.title, message.body);
      localStorage.setItem("bloomscroll_last_push", today);
    }
    
    // Reschedule for tomorrow
    scheduleDailyReminder();
  }, delay);
}

export function cancelDailyReminder(): void {
  if (reminderTimeout) {
    clearTimeout(reminderTimeout);
    reminderTimeout = null;
  }
  savePushSettings({ enabled: false });
}

// Reminder messages pool
const REMINDER_MESSAGES = [
  { title: "🌱 Time to Bloom!", body: "Your daily wisdom awaits." },
  { title: "📚 New Quote Ready", body: "Discover today's insight." },
  { title: "🧠 Feed Your Mind", body: "60 seconds of wisdom awaits." },
  { title: "✨ Daily Dose", body: "Great minds are waiting for you." },
  { title: "🔥 Keep the Streak!", body: "Don't break your reading streak!" },
];

export function getRandomReminderMessage(): { title: string; body: string } {
  return REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
}
