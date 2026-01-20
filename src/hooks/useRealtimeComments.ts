import { addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { getFirebaseApp } from '@/libs/utils-firebase';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: any;
  createdAt: Date;
}

export function useRealtimeComments(maxComments = 50) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newestComment, setNewestComment] = useState<Comment | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const commentsRef = collection(db, 'wedding-comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'), limit(maxComments));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newComments: Comment[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          newComments.push({
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            userAvatar: data.userAvatar,
            message: data.message,
            timestamp: data.timestamp,
            createdAt: data.timestamp?.toDate() || new Date(),
          });
        });

        const sortedComments = newComments.reverse(); // Show oldest first

        // Detect newest comment (only after first load)
        if (!isFirstLoad && sortedComments.length > 0) {
          const latestComment = sortedComments[sortedComments.length - 1];
          // Check if this is truly a new comment by comparing with previous state
          setComments((prevComments) => {
            const isNewComment = !prevComments.some((c) => c.id === latestComment.id);
            if (isNewComment) {
              setNewestComment(latestComment);
            }
            return sortedComments;
          });
        } else {
          setComments(sortedComments);
        }

        setLoading(false);
        if (isFirstLoad) {
          setIsFirstLoad(false);
        }
      },
      (error) => {
        console.error('Error fetching comments:', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [maxComments, isFirstLoad]);

  const addComment = async (userId: string, userName: string, message: string, userAvatar?: string) => {
    const db = getFirestore(getFirebaseApp());
    const commentsRef = collection(db, 'wedding-comments');

    try {
      await addDoc(commentsRef, {
        userId,
        userName,
        userAvatar,
        message,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  return { comments, loading, addComment, newestComment };
}
