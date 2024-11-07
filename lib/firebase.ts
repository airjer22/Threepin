import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBihfSrafypT4C6HnSDWhWD-CxnKGaorZM",
  authDomain: "three-pin.firebaseapp.com",
  projectId: "three-pin",
  storageBucket: "three-pin.firebasestorage.app",
  messagingSenderId: "179630918862",
  appId: "1:179630918862:web:5aa73eceab2d350fdfd49f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);