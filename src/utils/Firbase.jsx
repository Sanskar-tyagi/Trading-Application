import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCW5sjy4CXy8RFA3ZI6dF9U4gBb9SAF_Z8",
  authDomain: "trading-application-b410b.firebaseapp.com",
  projectId: "trading-application-b410b",
  storageBucket: "trading-application-b410b.appspot.com",
  messagingSenderId: "577861657015",
  appId: "1:577861657015:web:deb1b308479331bed84832",
};

const app = initializeApp(firebaseConfig);
export const firbaseauth = getAuth(app);
