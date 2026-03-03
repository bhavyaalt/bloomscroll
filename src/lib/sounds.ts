// Sound effects utilities

const SOUND_ENABLED_KEY = "bloomscroll_sound_enabled";

// Sound URLs (using short, royalty-free sounds)
const SOUNDS = {
  swipe: "data:audio/wav;base64,UklGRlQCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTACAACAf3+AgICAgIB/f39/gIB/f4CAgICAgIB/f39/f4CAf3+AgICAgIB/f39/f4CAf4CAgICAgIB/f39/f4CAf4CAgICAgH9/f39/gIB/gICAgICAgH9/f39/gIB/f4CAgICAgIB/f39/f4CAf3+AgICAgIB/f39/f4B/f4CAgICAgH9/f39/f4B/gICAgICAgH9/f39/f4B/gICAgICAgH9/f39/gIB/gICAgICAgH9/f39/gIB/gICAgICAgH9/f39/gICAgICAgICAgH9/f3+AgICAgICAgICAf39/f4CAgICAgICAgIB/f39/gICAgICAgICAgH9/f3+AgICAgICAgICAf39/f4CAgICAgICAgIB/f39/f4CAgICAgICAf39/f3+AgICAgICAgIB/f39/f4CAgICAgICAgH9/f39/gICAgICAgICAf39/f3+AgICAgICAgIB/f39/f4CAgICAgICAgH9/f39/gIA=",
  save: "data:audio/wav;base64,UklGRoQDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWADAACAf4CAgH+AgICAgIB/f3+AgICAf4CAgICAgH9/f4CAgIB/gICAgICAf39/gICAf4CAgICAgIB/f3+AgH+AgICAgICAf39/f4CAgICAgICAf39/f4CAgICAgICAf39/f4CAgICAgICAgH9/f4CAgICAgICAf39/f4CAgICAgICAf39/f3+AgICAgICAf39/f3+AgICAgICAgH9/f3+AgICAgICAf39/f3+AgICAgICAf39/f3+AgICAgICAf39/f4CAgICAgIB/f39/f4CAgICAgIB/f39/f4CAgICAgIB/f39/gICAgICAgH9/f3+AgICAgICAf39/f4CAgICAgIB/f39/f4CAgICAgH9/f39/gICAgICAf39/f3+AgICAgICAf39/f4CAgICAgIB/f39/gICAgICAgH9/f3+AgICAgICAf39/f4CAgICAgIB/f39/f4CAgICAf39/f3+AgICAgIB/f39/f4CAgICAf39/f3+AgICAgIB/f39/gICAgICAf39/f4CAgICAgH9/f3+AgICAgICAf39/f4CAgICAgH9/f3+AgICAgICAf39/f4CAgICAgH9/f3+AgICAgICAf39/gICAgICAgH9/f4CAgICAgH9/f3+AgICAgICAf39/f4CAgICAgH9/f3+AgICAgIB/f39/gICAgICAf39/f4CAgICAgH9/f39/gICAgIB/f39/f4CAgICAf39/f3+AgICAgH9/f39/gICAgIB/f39/f4CAgICAf39/f3+AgICAgH9/f39/gICAgIB/f39/f4CAgIB/f39/f4CAgICAf39/f3+AgICAf39/f3+AgICAf39/f3+AgICAf39/f3+AgICAgH9/f3+AgICAf39/f3+AgICAf39/f3+AgICAf39/f3+AgICAf39/f3+AgICAf39/f4CAgICAf39/f4CAgIB/f39/f4CAgH9/f3+AgICAf39/f3+AgIB/f39/f4CAgH9/f39/gICAf39/f3+AgIB/f39/f4CAgH9/f3+AgICAgH9/f4CAgIB/f39/f4CAgH9/f3+AgICAgH9/f4CAgIB/f39/gICAgH9/f3+AgICAgH9/gICAgH9/f3+AgICAgH9/f4CAgH9/f3+AgICAf39/f4CAgH9/f3+AgICA",
  milestone: "data:audio/wav;base64,UklGRiQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAFAACAf4CAgH+AgICAgIB/f3+AgICAf4CAgICAgH9/f4CAgIB/gICAgICAgH9/gICAf4CAgICAgICAgH+AgH+AgICAgICAgICAgIB/gICAgICAgICAgICAgIB/gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA=",
};

export function getSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SOUND_ENABLED_KEY) !== "false"; // default to true
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
}

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function playSound(type: "swipe" | "save" | "milestone"): void {
  if (!getSoundEnabled()) return;
  
  try {
    const audio = new Audio(SOUNDS[type]);
    audio.volume = type === "milestone" ? 0.4 : 0.2;
    audio.play().catch(() => {}); // Ignore autoplay errors
  } catch (e) {
    // Fallback: do nothing if audio fails
  }
}

// Alternative: Web Audio API oscillator for simple sounds
export function playTone(frequency: number = 440, duration: number = 100, type: OscillatorType = "sine"): void {
  if (!getSoundEnabled()) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  } catch (e) {
    // Ignore errors
  }
}

// Simple haptic feedback
export function haptic(type: "light" | "medium" | "heavy" = "light"): void {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  
  const durations = {
    light: 10,
    medium: 25,
    heavy: 50,
  };
  
  try {
    navigator.vibrate(durations[type]);
  } catch (e) {
    // Ignore errors
  }
}

// Sound presets using tones
export const sounds = {
  swipe: () => playTone(600, 50, "sine"),
  save: () => {
    playTone(800, 80, "sine");
    setTimeout(() => playTone(1000, 100, "sine"), 80);
  },
  milestone: () => {
    playTone(523, 100, "sine"); // C5
    setTimeout(() => playTone(659, 100, "sine"), 100); // E5
    setTimeout(() => playTone(784, 150, "sine"), 200); // G5
  },
  copy: () => playTone(1200, 40, "sine"),
  error: () => playTone(200, 150, "sawtooth"),
};
