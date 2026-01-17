import { collection, doc, getFirestore, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { getFirebaseApp } from '@/libs/utils-firebase';

export interface OnlineUser {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lastSeen: any;
  online: boolean;
}

const OFFLINE_THRESHOLD = 30000; // 30 seconds

export function useUserPresence(userId?: string, userName?: string, userAvatar?: string) {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !userName) return;

    const db = getFirestore(getFirebaseApp());
    const presenceRef = doc(db, 'wedding-presence', userId);

    // Set user as online
    const setOnline = async () => {
      await setDoc(
        presenceRef,
        {
          userId,
          userName,
          userAvatar: userAvatar || '',
          lastSeen: serverTimestamp(),
          online: true,
        },
        { merge: true },
      );
    };

    // Update last seen periodically
    const updatePresence = async () => {
      await updateDoc(presenceRef, {
        lastSeen: serverTimestamp(),
        online: true,
      });
    };

    // Set user as offline
    const setOffline = async () => {
      await updateDoc(presenceRef, {
        online: false,
        lastSeen: serverTimestamp(),
      });
    };

    setOnline();
    const intervalId = setInterval(updatePresence, 15000); // Update every 15 seconds

    // Handle page visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOffline();
      } else {
        setOnline();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle beforeunload
    const handleBeforeUnload = () => {
      setOffline();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      setOffline();
    };
  }, [userId, userName, userAvatar]);

  // Listen to all online users
  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const presenceRef = collection(db, 'wedding-presence');
    const q = query(presenceRef, where('online', '==', true));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const users: OnlineUser[] = [];
        const now = Date.now();

        snapshot.forEach((doc) => {
          const data = doc.data();
          const lastSeenTime = data.lastSeen?.toDate()?.getTime() || 0;
          const isOnline = now - lastSeenTime < OFFLINE_THRESHOLD;

          if (isOnline) {
            users.push({
              id: doc.id,
              userId: data.userId,
              userName: data.userName,
              userAvatar: data.userAvatar,
              lastSeen: data.lastSeen,
              online: data.online,
            });
          }
        });

        setOnlineUsers(users);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching online users:', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { onlineUsers, loading, userCount: onlineUsers.length };
}
