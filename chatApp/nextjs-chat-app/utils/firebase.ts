// lib/firebase.js


import { initializeApp, getApps, getApp } from 'firebase/app'; // Import getApps and getApp

import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get a reference to the Authentication service
const auth = getAuth(app);


export { app, auth };


