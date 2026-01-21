import { m } from 'motion/react';

import { type OnlineUser, useUserPresence } from '@/hooks/useUserPresence';
import { cn } from '@/libs/utils';

interface UserAvatarStackProps {
  userId?: string;
  userName?: string;
  userAvatar?: string;
  maxDisplay?: number;
}

export default function UserAvatarStack({ userId, userName, userAvatar, maxDisplay = 5 }: UserAvatarStackProps) {
  const { onlineUsers, userCount } = useUserPresence(userId, userName, userAvatar);

  const displayUsers = onlineUsers.slice(0, maxDisplay);
  const remainingCount = Math.max(0, userCount - maxDisplay);

  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-red-200 bg-white/95 p-1 shadow-lg backdrop-blur-sm"
    >
      {/* Avatar Stack */}
      <div className="flex -space-x-2">
        {displayUsers.length === 0 ? (
          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-gray-300 to-gray-400">
            <span className="text-xs text-white">?</span>
          </div>
        ) : (
          displayUsers.map((user: OnlineUser, index: number) => (
            <m.div
              key={user.userId}
              animate={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0, opacity: 0 }}
              title={user.userName}
              transition={{ delay: index * 0.1 }}
              className={cn('relative size-6 overflow-hidden rounded-full border-2 border-white ring-1 ring-red-200')}
            >
              {user.userAvatar ? (
                <img alt={user.userName} src={user.userAvatar} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-red-400 to-rose-500 text-xs font-bold text-white">{user.userName.charAt(0).toUpperCase()}</div>
              )}
              {/* Online indicator */}
              <div className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-green-500" />
            </m.div>
          ))
        )}

        {/* Remaining count */}
        {remainingCount > 0 && (
          <m.div
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ delay: maxDisplay * 0.1 }}
            className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-red-500 to-rose-500 text-xs font-bold text-white ring-1 ring-red-200"
          >
            +{remainingCount}
          </m.div>
        )}
      </div>

      {/* User count */}

      {/* Pulse animation for online indicator */}
      <div className="relative mr-1">
        <div className="size-2 rounded-full bg-green-500" />
        <m.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full bg-green-500" />
      </div>
    </m.div>
  );
}
