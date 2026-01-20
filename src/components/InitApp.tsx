import { debounce } from 'lodash';
import React, { memo, useEffect } from 'react';

import { useRealtimeComments } from '@/hooks/useRealtimeComments';
import { generateMockComments } from '@/libs/mockData';
import LocalStorage from '@/libs/utils-storage';

import { showCommentToast } from './CommentToast';

type TInitAppProps = {
  pName?: string;
  userId?: string;
  setUserId?: React.Dispatch<React.SetStateAction<string>>;
  userName?: string;
  setUserName?: React.Dispatch<React.SetStateAction<string>>;
  userAvatar?: string;
  setUserAvatar?: React.Dispatch<React.SetStateAction<string>>;
  isOpenComments?: boolean;
  setIsOpenComments?: React.Dispatch<React.SetStateAction<boolean>>;
};

const InitApp = ({ pName, isOpenComments, setIsOpenComments, setUserAvatar, setUserId, setUserName, userAvatar, userId, userName }: TInitAppProps) => {
  // Idle detection and toast notifications
  const { comments, newestComment } = useRealtimeComments(30);

  // Load user info from localStorage on mount
  useEffect(() => {
    const storedUserId = LocalStorage.get<string>('wedding-user-id');
    const storedUserName = LocalStorage.get<string>('wedding-user-name');
    const storedUserAvatar = LocalStorage.get<string>('wedding-user-avatar');

    // If pName exists, use it to create a deterministic user ID
    if (pName) {
      const timestamp = Date.now();
      // Create a consistent user ID based on pName
      const pNameSlug = pName.toLowerCase().replace(/\s+/g, '-');
      const deterministicUserId = `user-${timestamp}-${pNameSlug}`;
      const pNameR = ['TH'].includes(pName) ? `Guest-${timestamp}` : pName;

      setUserId?.(deterministicUserId);
      setUserName?.(pNameR);
      setUserAvatar?.(storedUserAvatar || '');

      // Store in localStorage
      LocalStorage.set('wedding-user-id', undefined, deterministicUserId);
      LocalStorage.set('wedding-user-name', undefined, pNameR);
    } else if (storedUserId && storedUserName) {
      // Use stored values if no pName
      setUserId?.(storedUserId);
      setUserName?.(storedUserName);
      setUserAvatar?.(storedUserAvatar || '');
    } else {
      // Generate a random user ID and use it as the name if no pName and no stored values
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substr(2, 9);
      const newUserId = `user-${timestamp}-${randomStr}`;
      const generatedName = `Guest-${randomStr}`; // Use short ID as name

      setUserId?.(newUserId);
      setUserName?.(generatedName);
      setUserAvatar?.('');

      LocalStorage.set('wedding-user-id', undefined, newUserId);
      LocalStorage.set('wedding-user-name', undefined, generatedName);
    }
  }, [pName]);

  // Show toast for newest real-time comment
  useEffect(() => {
    if (newestComment && !isOpenComments) {
      showCommentToast(newestComment, { autoClose: 3300 });
    }
  }, [newestComment, isOpenComments]);

  // Show mock comments on initial mount
  useEffect(() => {
    // Then show mock comments after real ones
    const mockComments = generateMockComments(3);

    debounce(() => {
      mockComments.forEach((mockComment, index) => {
        debounce(() => {
          showCommentToast(
            {
              id: mockComment.id,
              userId: mockComment.userId,
              userName: mockComment.userName,
              message: mockComment.message,
              timestamp: mockComment.timestamp,
              createdAt: mockComment.createdAt,
              userAvatar: undefined,
            },
            { autoClose: 3300 },
          );
        }, index * 1000)();
      });
    }, 100)();
  }, []);

  return <></>;
};

export default memo(InitApp);
