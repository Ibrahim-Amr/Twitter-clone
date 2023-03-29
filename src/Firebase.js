// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_projectId,
	storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
	messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
	appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
