import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDDQLeGBMaOSKb0I4-2-BUY19rIvQp9QrI",
  authDomain: "crwn-clothing-db-670e5.firebaseapp.com",
  projectId: "crwn-clothing-db-670e5",
  storageBucket: "crwn-clothing-db-670e5.appspot.com",
  messagingSenderId: "602858948590",
  appId: "1:602858948590:web:f49f39f47876239d10f0ff",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if( !userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
      return { displayName, email }
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userDocRef;
};