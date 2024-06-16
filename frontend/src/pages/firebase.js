import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage";
import 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyA8e8Fgya6lFEr6EwLq0AhJ16zwTe6Y1bM",
  authDomain: "paisa-tracker-d6ce1.firebaseapp.com",
  projectId: "paisa-tracker-d6ce1",
  storageBucket: "paisa-tracker-d6ce1.appspot.com",
  messagingSenderId: "211393123451",
  appId: "1:211393123451:web:2d48eb196e35d1d886bede",
  measurementId: "G-LQ48DWDDTH"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider= new GoogleAuthProvider()
export const storage = getStorage(app);

export default app;