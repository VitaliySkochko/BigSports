// src/amplitude.js
import {
  createInstance,
  Identify,
} from "@amplitude/analytics-browser";

const amplitude = createInstance();

const API_KEY = "734976c9cffcb1e276760aeb7afe557d";

let isInitialized = false;

export function initAmplitude() {
  if (isInitialized) return true;

  amplitude.init(API_KEY, undefined, {
    defaultTracking: false,
  });

  isInitialized = true;

  console.log("✅ Amplitude initialized");

  return true;
}

export function trackEvent(eventName, eventProperties = {}) {
  if (!isInitialized) return;

  amplitude.track(eventName, {
    ...eventProperties,
    platform: "web",
  });
}

export function identifyUser(userId, userData = {}) {
  if (!isInitialized) return;

  amplitude.setUserId(userId);

  const identify = new Identify();

  Object.entries(userData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      identify.set(key, value);
    }
  });

  amplitude.identify(identify);

  console.log("👤 User identified:", userId, userData);
}

export function resetUser() {
  amplitude.reset();
}

export default amplitude;