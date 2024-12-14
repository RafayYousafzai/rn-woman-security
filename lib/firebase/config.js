import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDOgOTbyA_2vmzMqy8rfKKaz5JgUfLU25A",
  authDomain: "woman-security-6cd7b.firebaseapp.com",
  projectId: "woman-security-6cd7b",
  storageBucket: "woman-security-6cd7b.firebasestorage.app",
  messagingSenderId: "358008766631",
  appId: "1:358008766631:web:eacd7004daa3337bef1b82",
  measurementId: "G-748PE5VXC6",
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export { database };
export default app;
