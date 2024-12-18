import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { database } from "@/lib/firebase/config";
import { useUser } from "@clerk/clerk-expo";

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const { user } = useUser();

  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);

  const primaryEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "users"),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(docs);
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!primaryEmail || users.length === 0) return;

    const currentUser = users.find((u) => u.emailAddress === primaryEmail);

    setUserData(currentUser);
  }, [primaryEmail, users]);

  const updateUser = async (data) => {
    if (!userData) {
      console.error("User not found");
      return false;
    }

    try {
      const docRef = doc(database, "users", userData.id); // Assumes Firestore uses `id` for documents
      await updateDoc(docRef, data);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  };

  return (
    <FirebaseContext.Provider value={{ users, userData: userData, updateUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
