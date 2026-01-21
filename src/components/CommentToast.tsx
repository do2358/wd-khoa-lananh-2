import { type ToastOptions, toast } from 'react-toastify';

import { type Comment } from '@/hooks/useRealtimeComments';

interface CommentToastProps {
  comment: Comment;
}

export function CommentToast({ comment }: CommentToastProps) {
  return (
    <div className="flex gap-2">
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
    </div>
  );
}

export function showCommentToast(comment: Comment, options?: ToastOptions) {
  toast.error(<CommentToast comment={comment} />, {
    closeOnClick: true,
    draggable: true,
    icon: false,
    ...options,
  });
}
