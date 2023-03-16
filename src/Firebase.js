// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA3x6907goDxwLjsVPwjRin7it8qeTdkCE',
	authDomain: 'twitter-3ab6e.firebaseapp.com',
	projectId: 'twitter-3ab6e',
	storageBucket: 'twitter-3ab6e.appspot.com',
	messagingSenderId: '965249414053',
	appId: '1:965249414053:web:0784c8b1029d976a086e4c',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
