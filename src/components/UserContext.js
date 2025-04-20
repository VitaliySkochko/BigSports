import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);       // undefined → ще не знаємо
  const [userData, setUserData] = useState(undefined);
  const [loadingUser, setLoadingUser] = useState(true); // 🔥 новий прапорець

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Помилка при отриманні userData:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoadingUser(false); // 🔥 сигнал, що все готово
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

