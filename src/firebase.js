import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASyMe3M9swAAMkLWLddGLkCV2cilyqSZU",
  authDomain: "hiquiz-6ddd7.firebaseapp.com",
  projectId: "hiquiz-6ddd7",
  storageBucket: "hiquiz-6ddd7.appspot.com",
  messagingSenderId: "789339434459",
  appId: "1:789339434459:web:b177e6afc8120940834bfe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  auth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onAuthStateChanged,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
};
