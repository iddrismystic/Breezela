import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0ZRgHvAkqAq1xpAPhpTaLk6rEuj7uqGU",
  authDomain: "breezela-e0c73.firebaseapp.com",
  projectId: "breezela-e0c73",
  storageBucket: "breezela-e0c73.appspot.com",
  messagingSenderId: "512627718984",
  appId: "1:512627718984:web:b155b63172a31f7b7f917d",
  measurementId: "G-SLPVLBQHDH"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore()