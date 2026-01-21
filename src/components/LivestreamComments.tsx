import { HeartIcon, MessageCircleIcon, SendIcon, SparklesIcon, XIcon } from 'lucide-react';
import { m } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';

import { useRealtimeComments } from '@/hooks/useRealtimeComments';
import { cn } from '@/libs/utils';

import ScrollArea from './ScrollArea';

interface LivestreamCommentsProps {
  userId?: string;
  userName?: string;
  userAvatar?: string;
  isOpen: boolean;
  onToggle: () => void;
  hasUserName?: boolean;
}

// Quick fill messages - select 6 random messages
const QUICK_MESSAGES = ['Chúc mừng hạnh phúc! 🎉', 'Trăm năm hạnh phúc! ❤️', 'Chúc đôi uyên ương hạnh phúc! 💑', 'Yêu thương mãi mãi! 💕', 'Chúc sớm có tin vui! 👶', 'Hạnh phúc bên nhau! 🥰'];

export default function LivestreamComments({ userId, userName, userAvatar, isOpen, onToggle, hasUserName = true }: LivestreamCommentsProps) {
  const [message, setMessage] = useState('');
  const { comments, addComment } = useRealtimeComments(30);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleQuickFill = (quickMessage: string) => {
    setMessage(quickMessage);
  };

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
      const trimmedMessage = message.trim();
      await addComment(userId, userName, trimmedMessage, userAvatar);

      // Show toast notification
      // showCommentToast({
      //   id: `toast-${Date.now()}`,
      //   userId,
      //   userName,
      //   message: trimmedMessage,
      //   userAvatar,
      //   timestamp: new Date(),
      //   createdAt: new Date(),
      // });

      // Clear message and close modal
      setMessage('');

      // Close modal after a short delay to show the animation
      setTimeout(() => {
        onToggle();
      }, 500);
    } catch (error) {
      console.error('Failed to send comment:', error);
    }
  };

  return (
    <Drawer.Root
      dismissible={true}
      open={isOpen}
      shouldScaleBackground={false}
      onOpenChange={(open) => {
        if (!open) onToggle();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay style={{ zIndex: 40 }} className="fixed inset-0 bg-black/20 sm:hidden" />
        <Drawer.Content
          style={{ zIndex: 50 }}
          className={cn(
            'fixed z-50 flex max-h-[90dvh] max-h-[600px] w-full max-w-md flex-col rounded-t-2xl bg-white/95 shadow-2xl backdrop-blur-sm outline-none',
            'inset-x-0 bottom-0',
            'sm:inset-x-auto sm:inset-y-auto sm:right-4 sm:bottom-10 sm:w-80 sm:rounded-t-2xl sm:border sm:border-red-200',
          )}
        >
          {/* Drag Handle - Mobile Only */}
          <div className="absolute top-0 left-0 z-10 flex w-full shrink-0 justify-center py-2 sm:hidden">
            <div className="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>

          {/* Header */}
          <div className="z-0 flex shrink-0 items-center justify-between rounded-t-2xl border-b border-red-200 bg-gradient-to-r from-red-50 to-rose-50 py-3 pr-3 pl-4">
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="size-6 text-red-500" />
              <h3 className="font-semibold text-gray-800">Lời chúc</h3>
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{comments.length}</span>
            </div>
            <button type="button" className="rounded-full p-1 transition-colors hover:bg-red-100" onClick={onToggle}>
              <span className="sr-only">Close</span>
              <XIcon className="size-6 text-gray-900" />
            </button>
          </div>

          {/* Comments List */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <ScrollArea ref={scrollRef} style={{ maxHeight: 408 }} className="h-full">
              <div style={{ minHeight: '10rem' }} className="min-h-40 space-y-3 p-3 pb-4">
                {comments.length === 0 ? (
                  <m.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center px-4 py-4">
                    <m.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="mb-4 rounded-full bg-gradient-to-br from-red-100 to-rose-100 p-2"
                    >
                      <HeartIcon className="size-8 fill-red-500 text-red-500" />
                    </m.div>

                    {hasUserName ? (
                      <>
                        <h4 className="mb-3 text-center text-lg font-semibold text-red-800">Chưa có lời chúc nào</h4>
                        <p className="mb-1 text-center text-base text-gray-600">Hãy là người đầu tiên gửi lời chúc</p>
                        <p className="text-center text-base text-gray-600">đến đôi uyên ương nhé!</p>
                        <m.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                          className="mt-6 flex items-center gap-1 text-[15px] text-red-500"
                        >
                          <SparklesIcon className="size-3" />
                          <span className="font-medium">Viết lời chúc bên dưới</span>
                          <SparklesIcon className="size-3" />
                        </m.div>
                      </>
                    ) : (
                      <>
                        <h4 className="mb-2 text-center text-lg font-semibold text-red-800">Xem lời chúc từ mọi người</h4>
                        <p className="text-center text-base text-gray-600">Hiện chưa có lời chúc nào.</p>
                        <p className="mt-4 mb-0.5 text-center text-base text-gray-500 md:text-[15px]">Để gửi lời chúc, vui lòng truy cập</p>
                        <p className="mb-10 text-center text-base text-gray-500 md:text-[15px]">qua link thiệp mời có tên của bạn.</p>
                      </>
                    )}
                  </m.div>
                ) : (
                  comments.map((comment, index) => (
                    <m.div key={comment.id} animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="group">
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
                    </m.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input Form */}
          {hasUserName && (
            <form className="shrink-0 border-t border-red-200 bg-white p-3 pt-2" onSubmit={handleSubmit}>
              {/* Quick Fill Buttons - 2 Rows in Single Scroll Container */}
              <div className="scrollbar-hide mb-2 overflow-x-auto">
                <div className="flex flex-col gap-1.5">
                  {/* First Row */}
                  <div className="flex gap-1.5">
                    {QUICK_MESSAGES.slice(0, 3).map((quickMsg, index) => (
                      <button
                        key={'QUICK_MESSAGES' + index}
                        type="button"
                        className="shrink-0 rounded-full border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-all hover:border-red-300 hover:from-red-100 hover:to-rose-100 hover:shadow-sm"
                        onClick={() => handleQuickFill(quickMsg)}
                      >
                        {quickMsg}
                      </button>
                    ))}
                  </div>
                  {/* Second Row */}
                  <div className="flex gap-1.5">
                    {QUICK_MESSAGES.slice(3, 6).map((quickMsg, index) => (
                      <button
                        key={index + 3}
                        type="button"
                        className="shrink-0 rounded-full border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-all hover:border-red-300 hover:from-red-100 hover:to-rose-100 hover:shadow-sm"
                        onClick={() => handleQuickFill(quickMsg)}
                      >
                        {quickMsg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Field */}
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
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
