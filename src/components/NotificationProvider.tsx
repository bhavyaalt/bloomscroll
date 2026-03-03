"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NotificationTone = "success" | "error" | "info";

interface NotificationInput {
  title: string;
  message?: string;
  tone?: NotificationTone;
  duration?: number;
}

interface NotificationItem extends NotificationInput {
  id: string;
}

interface NotificationContextValue {
  notify: (input: NotificationInput) => void;
  notifyAcrossNavigation: (input: NotificationInput) => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  notify: () => {},
  notifyAcrossNavigation: () => {},
});

const STORAGE_KEY = "bloomscroll_pending_notifications";

function toneClasses(tone: NotificationTone) {
  switch (tone) {
    case "success":
      return "border-[#2f7a62]/35 bg-[#10271f]/95 text-[#e8f5ef]";
    case "error":
      return "border-[#9a504d]/35 bg-[#2c1716]/95 text-[#fdeeed]";
    default:
      return "border-white/10 bg-[#18231d]/95 text-white";
  }
}

function toneBadgeClasses(tone: NotificationTone) {
  switch (tone) {
    case "success":
      return "bg-[#2f7a62]/20 text-[#87d0b0]";
    case "error":
      return "bg-[#9a504d]/20 text-[#f3a8a1]";
    default:
      return "bg-white/10 text-white/70";
  }
}

function createNotification(input: NotificationInput): NotificationItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    tone: input.tone || "info",
    duration: input.duration ?? 2800,
    title: input.title,
    message: input.message,
  };
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const timeoutsRef = useRef<Map<string, number>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  }, []);

  const notify = useCallback((input: NotificationInput) => {
    const notification = createNotification(input);
    setNotifications((current) => [...current, notification]);

    const timeoutId = window.setTimeout(() => {
      dismiss(notification.id);
    }, notification.duration);

    timeoutsRef.current.set(notification.id, timeoutId);
  }, [dismiss]);

  const notifyAcrossNavigation = useCallback((input: NotificationInput) => {
    if (typeof window === "undefined") return;
    const pending = window.sessionStorage.getItem(STORAGE_KEY);
    const queue: NotificationInput[] = pending ? JSON.parse(pending) : [];
    queue.push(input);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pending = window.sessionStorage.getItem(STORAGE_KEY);
    if (!pending) return;

    window.sessionStorage.removeItem(STORAGE_KEY);
    const queue: NotificationInput[] = JSON.parse(pending);
    queue.forEach((item) => notify(item));
  }, [notify]);

  useEffect(() => {
    const timeoutMap = timeoutsRef.current;
    return () => {
      timeoutMap.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutMap.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      notify,
      notifyAcrossNavigation,
    }),
    [notify, notifyAcrossNavigation]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
        <div className="flex w-full max-w-md flex-col gap-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur ${toneClasses(notification.tone || "info")}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${toneBadgeClasses(notification.tone || "info")}`}>
                        {notification.tone || "info"}
                      </span>
                      <p className="truncate text-sm font-semibold">{notification.title}</p>
                    </div>
                    {notification.message ? (
                      <p className="mt-1 text-sm text-white/70">{notification.message}</p>
                    ) : null}
                  </div>
                  <button
                    onClick={() => dismiss(notification.id)}
                    className="text-white/35 transition-colors hover:text-white/70"
                    aria-label="Dismiss notification"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
