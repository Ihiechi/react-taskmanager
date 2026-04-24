import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-n-ZZ3C0i3Uhoyo4r_lmJo5X6K__ld4A",
  authDomain: "react-taskmanager-da69a.firebaseapp.com",
  projectId: "react-taskmanager-da69a",
  storageBucket: "react-taskmanager-da69a.firebasestorage.app",
  messagingSenderId: "121292940811",
  appId: "1:121292940811:web:e7bf5dc5da5d376478490e",
  measurementId: "G-DSW8GKEG0V",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app)

export { db };
