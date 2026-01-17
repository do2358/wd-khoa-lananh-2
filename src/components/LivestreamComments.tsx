import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { type Comment, useRealtimeComments } from '@/hooks/useRealtimeComments';
import { generateMockComments } from '@/libs/mockData';
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
  const [displayedComments, setDisplayedComments] = useState<Comment[]>([]);

  // Initialize with mock data if no real comments
  useEffect(() => {
    if (comments.length === 0 && displayedComments.length === 0) {
      const mockComments = generateMockComments(8);
      setDisplayedComments(mockComments as Comment[]);
    }
  }, []);

  // Auto-scroll to bottom when new comments arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedComments]);

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

  // Handle new comments with animation
  useEffect(() => {
    if (comments.length > 0) {
      // Merge real comments with mock comments, prioritizing real ones
      const realCommentIds = new Set(comments.map((c) => c.id));
      const filteredMockComments = displayedComments.filter((c) => c.id.startsWith('mock-') && !realCommentIds.has(c.id));
      const allComments = [...filteredMockComments, ...comments].sort((a, b) => {
        const timeA = a.createdAt?.getTime?.() || 0;
        const timeB = b.createdAt?.getTime?.() || 0;
        return timeA - timeB;
      });
      setDisplayedComments(allComments);
    }
  }, [comments]);

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
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{displayedComments.length}</span>
        </div>
        <button type="button" className="rounded-full p-1 transition-colors hover:bg-red-100" onClick={onToggle}>
          <XIcon className="size-4 text-gray-600" />
        </button>
      </div>

      {/* Comments List */}
      <ScrollArea ref={scrollRef} suppressScrollX className="max-h-96 space-y-2 p-3">
        {displayedComments.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-400">Chưa có lời chúc nào. Hãy là người đầu tiên!</div>
        ) : (
          displayedComments.map((comment, index) => (
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
