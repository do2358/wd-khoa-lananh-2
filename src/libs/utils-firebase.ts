import { getApp, getApps, initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const fClientConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'localhost:13100',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const getFirebaseApp = () => {
  if (getApps().length) return getApp();
  const app = initializeApp(fClientConfig);
  return app;
};

// export function getFirebaseAuth() {
//   const auth = getAuth(getFirebaseApp());
//   auth.useDeviceLanguage();
//   // App relies only on server token. We make sure Firebase does not store credentials in the browser.
//   // See: https://github.com/awinogrodzki/next-firebase-auth-edge/issues/143
//   setPersistence(auth, inMemoryPersistence);
//   // if (fClientConfig.tenantId) {
//   //   auth.tenantId = fClientConfig.tenantId;
//   // }
//   return auth;
// }
