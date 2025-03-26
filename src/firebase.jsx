import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw-Z7nfuGt9SD-npp8nTiwvDjxnMMXL8w",
  authDomain: "track-mate-7d68b.firebaseapp.com",
  projectId: "track-mate-7d68b",
  storageBucket: "track-mate-7d68b.appspot.com", // ✅ Fix incorrect storageBucket URL
  messagingSenderId: "392866979516",
  appId: "1:392866979516:web:a1ea3d3664d972bd4ffab9",
  measurementId: "G-KQD51Q35SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

export { auth, db };
