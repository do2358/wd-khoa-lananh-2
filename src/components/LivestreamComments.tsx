import { HeartIcon, MessageCircleIcon, SendIcon, SparklesIcon, XIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { type Comment, useRealtimeComments } from '@/hooks/useRealtimeComments';
import { cn } from '@/libs/utils';

import ScrollArea from './ScrollArea';

interface LivestreamCommentsProps {
  userId?: string;
  userName?: string;
  userAvatar?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function LivestreamComments({ userId, userName, userAvatar, isOpen, onToggle }: LivestreamCommentsProps) {
  const [message, setMessage] = useState('');
  const { comments, addComment } = useRealtimeComments(30);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new comments arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  // Scroll to bottom when popup opens
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      // Use setTimeout to ensure the DOM is fully rendered
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !userName || !message.trim()) return;

    try {
      await addComment(userId, userName, message.trim(), userAvatar);
      setMessage('');
    } catch (error) {
      console.error('Failed to send comment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed right-4 bottom-20 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-red-200 bg-white/95 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-red-200 bg-gradient-to-r from-red-50 to-rose-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="size-5 text-red-500" />
          <h3 className="font-semibold text-gray-800">Lời chúc</h3>
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{comments.length}</span>
        </div>
        <button type="button" className="rounded-full p-1 transition-colors hover:bg-red-100" onClick={onToggle}>
          <XIcon className="size-4 text-gray-600" />
        </button>
      </div>

      {/* Comments List */}
      <ScrollArea ref={scrollRef} suppressScrollX className="max-h-96 space-y-2 p-3">
        {comments.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center px-4 py-12">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="mb-4 rounded-full bg-gradient-to-br from-red-100 to-rose-100 p-4"
            >
              <HeartIcon className="size-10 fill-red-500 text-red-500" />
            </motion.div>

            <h4 className="mb-2 text-center font-semibold text-gray-800">Chưa có lời chúc nào</h4>

            <p className="mb-1 text-center text-sm text-gray-600">Hãy là người đầu tiên gửi lời chúc</p>
            <p className="text-center text-sm text-gray-600">đến đôi uyên ương nhé!</p>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="mt-4 flex items-center gap-1 text-xs text-red-500"
            >
              <SparklesIcon className="size-3" />
              <span className="font-medium">Viết lời chúc bên dưới</span>
              <SparklesIcon className="size-3" />
            </motion.div>
          </motion.div>
        ) : (
          comments.map((comment, index) => (
            <motion.div key={comment.id} animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="group">
              <div className="flex gap-2">
                <div className="size-8 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-red-400 to-rose-500">
                  {comment.userAvatar ? (
                    <img alt={comment.userName} src={comment.userAvatar} className="size-full object-cover" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-xs font-bold text-white">{comment.userName.charAt(0).toUpperCase()}</div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 text-xs font-semibold text-gray-700">{comment.userName}</div>
                  <div className="rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 px-3 py-2 text-sm break-words text-gray-800">{comment.message}</div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </ScrollArea>

      {/* Input Form */}
      <form className="border-t border-red-200 bg-white p-3" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            maxLength={200}
            placeholder="Gửi lời chúc..."
            type="text"
            value={message}
            className="min-w-0 flex-1 rounded-full border border-red-200 bg-red-50/50 px-4 py-2 text-sm transition-colors outline-none focus:border-red-400 focus:bg-white"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            disabled={!message.trim()}
            type="submit"
            className={cn(
              'flex !size-10 shrink-0 items-center justify-center rounded-full p-2 transition-all',
              message.trim() ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:shadow-lg' : 'bg-gray-200 text-gray-400',
            )}
          >
            <SendIcon className="size-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
