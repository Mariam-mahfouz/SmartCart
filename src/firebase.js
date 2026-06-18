import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC8zE_2m_HDKbpRmLmoe8BwKffimy8cROo",
  authDomain: "smartcartend.firebaseapp.com",
  databaseURL: "https://smartcartend-default-rtdb.firebaseio.com",
  projectId: "smartcartend",
  storageBucket: "smartcartend.firebasestorage.app",
  messagingSenderId: "1029635083542",
  appId: "1:1029635083542:web:1d4b5c98c8ae495a7b9437"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };
export const db = database;

export default app;