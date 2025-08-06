import { v4 as uuidv4 } from 'uuid';

const FINGERPRINT_KEY = 'browser_fingerprint';

export function getUserFingerprint(): string {
  let fingerprint = localStorage.getItem(FINGERPRINT_KEY);
  
  if (!fingerprint) {
    fingerprint = uuidv4();
    localStorage.setItem(FINGERPRINT_KEY, fingerprint);
  }
  
  return fingerprint;
} 