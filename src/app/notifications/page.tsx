"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  isPushSupported,
  getPushSettings,
  savePushSettings,
  requestNotificationPermission,
  getNotificationPermission,
  registerPushServiceWorker,
  sendLocalNotification,
  scheduleDailyReminder,
  cancelDailyReminder,
  PushSettings,
} from "@/lib/push-notifications";

export default function NotificationsPage() {
  const [settings, setSettings] = useState<PushSettings>({
    enabled: false,
    time: "09:00",
    lastNotification: null,
  });
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [supported, setSupported] = useState(false);
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    setSupported(isPushSupported());
    setPermission(getNotificationPermission());
    setSettings(getPushSettings());
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setPermission(granted ? "granted" : "denied");
    
    if (granted) {
      await registerPushServiceWorker();
      const newSettings = { ...settings, enabled: true };
      setSettings(newSettings);
      savePushSettings(newSettings);
      scheduleDailyReminder(settings.time);
    }
  };

  const handleDisableNotifications = () => {
    const newSettings = { ...settings, enabled: false };
    setSettings(newSettings);
    savePushSettings(newSettings);
    cancelDailyReminder();
  };

  const handleTimeChange = (time: string) => {
    const newSettings = { ...settings, time };
    setSettings(newSettings);
    savePushSettings(newSettings);
    if (settings.enabled) {
      scheduleDailyReminder(time);
    }
  };

  const handleTestNotification = async () => {
    await sendLocalNotification(
      "🌱 Test Notification",
      "Your notifications are working! See you at your scheduled time."
    );
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Link href="/app" className="flex items-center gap-2">
            <span className="text-xl">←</span>
            <span className="font-impact text-lg uppercase tracking-tight text-[#007A5E]">Back</span>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔔</div>
            <h1 className="font-impact text-3xl uppercase mb-2">Daily Reminders</h1>
            <p className="text-white/60">Never miss your daily wisdom</p>
          </div>

          {!supported ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400">
                Push notifications aren't supported on this device/browser.
              </p>
              <p className="text-sm text-white/40 mt-2">
                Try using Chrome, Firefox, or Safari on a supported device.
              </p>
            </div>
          ) : permission === "denied" ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 mb-4">
                Notifications are blocked for this site.
              </p>
              <p className="text-sm text-white/40">
                To enable notifications, update your browser settings for this site.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Enable/Disable Toggle */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold mb-1">Daily Reminder</h3>
                    <p className="text-sm text-white/50">Get notified to read daily</p>
                  </div>
                  <button
                    onClick={settings.enabled ? handleDisableNotifications : handleEnableNotifications}
                    className={`w-14 h-8 rounded-full transition-colors relative ${
                      settings.enabled ? "bg-[#007A5E]" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${
                        settings.enabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Time Picker */}
              {settings.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="font-bold mb-4">Reminder Time</h3>
                  <div className="flex gap-4">
                    {["07:00", "09:00", "12:00", "18:00", "21:00"].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeChange(time)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                          settings.time === time
                            ? "bg-[#007A5E] text-white"
                            : "bg-white/10 text-white/60 hover:bg-white/20"
                        }`}
                      >
                        {time.replace(":00", "")}
                        <span className="text-xs opacity-70">
                          {parseInt(time) < 12 ? "AM" : "PM"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-4 text-center">
                    We'll remind you at {settings.time} local time
                  </p>
                </motion.div>
              )}

              {/* Test Notification */}
              {settings.enabled && (
                <button
                  onClick={handleTestNotification}
                  className="w-full py-4 bg-white/10 rounded-2xl font-bold hover:bg-white/20 transition-colors"
                >
                  {testSent ? "✓ Notification Sent!" : "🔔 Send Test Notification"}
                </button>
              )}

              {/* Info */}
              <div className="text-center text-sm text-white/40 space-y-2">
                <p>Notifications help you maintain your reading streak.</p>
                <p>You can disable them anytime.</p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
