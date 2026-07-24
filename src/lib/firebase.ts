import { initializeApp, getApps } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// REMNANT Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForRemnantCommerceMemory2026",
  authDomain: "remnant-memory.firebaseapp.com",
  projectId: "remnant-memory",
  storageBucket: "remnant-memory.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abcdef1234567890"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export const setupRecaptcha = (containerId: string) => {
  if (typeof window === 'undefined') return null;
  
  try {
    return new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
  } catch (e) {
    console.warn('Firebase Recaptcha setup fallback:', e);
    return null;
  }
};

export const sendPhoneOtp = async (phoneNumber: string, recaptchaVerifier: any) => {
  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    if (recaptchaVerifier) {
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      return { success: true, confirmationResult };
    }
  } catch (e) {
    console.warn('Firebase Auth falling back to REMNANT SMS Engine:', e);
  }
  return { success: false, fallbackRequired: true };
};
