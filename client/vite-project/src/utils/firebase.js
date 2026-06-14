// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";    
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "voiceassistant-49d52.firebaseapp.com",
  projectId: "voiceassistant-49d52",
  storageBucket: "voiceassistant-49d52.firebasestorage.app",
  messagingSenderId: "502114031485",
  appId: "1:502114031485:web:57477451b8f400ccc05e14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
