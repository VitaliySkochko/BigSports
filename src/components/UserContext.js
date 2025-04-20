import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

import amplitude from '../amplitude';
import * as amplitudeLib from '@amplitude/analytics-browser';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [loadingUser, setLoadingUser] = useState(true);
  const trackedRef = useRef(false); // ❗️Щоб не трекати вдруге

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      let fetchedData = null;

      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            fetchedData = docSnap.data();
            setUserData(fetchedData);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Помилка отримання userData:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoadingUser(false);

      // === Трекінг тільки після завантаження ===
      if (!trackedRef.current) {
        const referrer = document.referrer;
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');

        let trafficSource = 'direct';
        if (utmSource) {
          trafficSource = utmSource;
        } else if (referrer.includes('google.')) {
          trafficSource = 'google';
        } else if (referrer.includes('youtube.com')) {
          trafficSource = 'youtube';
        } else if (referrer.includes('instagram.com')) {
          trafficSource = 'instagram';
        }

        if (currentUser && fetchedData) {
          amplitude.setUserId(fetchedData.username);

          const identify = new amplitudeLib.Identify()
            .set('username', fetchedData.username)
            .set('email', fetchedData.email)
            .set('role', fetchedData.role);

          amplitude.identify(identify);

          amplitude.track('site_visited', {
            user_id: fetchedData.username,
            role: fetchedData.role,
            traffic_source: trafficSource,
          });

        } else {
          let guestId = localStorage.getItem('guestId');
          if (!guestId) {
            guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('guestId', guestId);
          }

          amplitude.setUserId(guestId);

          const identify = new amplitudeLib.Identify().set('role', 'guest');
          amplitude.identify(identify);

          amplitude.track('site_visited', {
            user_id: guestId,
            role: 'guest',
            traffic_source: trafficSource,
          });
        }

        trackedRef.current = true;
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};


