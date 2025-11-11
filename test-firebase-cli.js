import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZqi57_XK-LNXFVNotiqXKYRUkNh-gHCo",
  authDomain: "interludeapp-2ff3f.firebaseapp.com",
  projectId: "interludeapp-2ff3f",
  storageBucket: "interludeapp-2ff3f.firebasestorage.app",
  messagingSenderId: "1068934787939",
  appId: "1:1068934787939:web:773c0131cba6c665671956"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase initialized");

// Test read
try {
  const snapshot = await getDocs(collection(db, 'songs'));
  console.log(`📊 Found ${snapshot.size} songs in Firestore`);
  snapshot.forEach(doc => {
    console.log(`  - ${doc.id}:`, doc.data());
  });
} catch (error) {
  console.error("❌ Error:", error.code, error.message);
}

process.exit(0);
