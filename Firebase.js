import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCO8CsEaSs8LuqMAuXSxHwlds0UWTyI5k",
  authDomain: "appfilmebd.firebaseapp.com",
  projectId: "appfilmebd",
  storageBucket: "appfilmebd.appspot.com",
  messagingSenderId: "316070975448",
  appId: "1:316070975448:web:416ffeeeb644a9039e84ad"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);