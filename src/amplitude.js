// src/amplitude.js
import { createInstance } from '@amplitude/analytics-browser';

const amplitude = createInstance();

amplitude.init('55d9c6d6cbcbc0f0cd61281b2cb859ee', undefined, {
  defaultTracking: false, // ❗️ВАЖЛИВО! — щоб не відправляв нічого сам
});

export default amplitude;

