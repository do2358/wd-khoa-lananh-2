import { motion } from 'motion/react';
import { type ToastOptions, toast } from 'react-toastify';

import { type Comment } from '@/hooks/useRealtimeComments';

interface CommentToastProps {
  comment: Comment;
}

export function CommentToast({ comment }: CommentToastProps) {
  return (
    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex gap-2">
      <div className="size-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-red-400 to-rose-500">
        {comment.userAvatar ? (
          <img alt={comment.userName} src={comment.userAvatar} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-sm font-bold text-white">{comment.userName.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <div className="min-h-11 min-w-0 flex-1 pb-1">
        <div className="mb-0 mb-0.5 text-xs font-semibold text-red-800">{comment.userName}</div>
        <div className="line-clamp-3 text-sm leading-[1.2] font-400 break-words text-gray-600">{comment.message}</div>
      </div>
    </motion.div>
  );
}

export function showCommentToast(comment: Comment, options?: ToastOptions) {
  toast.error(<CommentToast comment={comment} />, {
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
    className: 'bg-white border border-red-200 shadow-lg rounded-xl p-3',
    progressClassName: 'bg-gradient-to-r from-red-500 to-rose-500',
    ...options,
  });
}
