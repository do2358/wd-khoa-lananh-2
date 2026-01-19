import { createFileRoute } from '@tanstack/react-router';
import { last } from 'lodash';
import { GiftIcon, ImagesIcon, MapPinIcon, MessageCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { showCommentToast } from '@/components/CommentToast';
import FloatingDock from '@/components/FloatingDock';
import LivestreamComments from '@/components/LivestreamComments';
import RcImagesPreview from '@/components/media/RcImagesPreview';
import ModalQR from '@/components/modal/ModalQR';
import Section01 from '@/components/Section01';
import Section03 from '@/components/Section03';
import Section04 from '@/components/Section04';
import Section05 from '@/components/Section05';
import Section07 from '@/components/Section07';
import Section08 from '@/components/Section08';
import SEO from '@/components/SEO';
import UserAvatarStack from '@/components/UserAvatarStack';
import { useRealtimeComments } from '@/hooks/useRealtimeComments';
import { generateMockComments } from '@/libs/mockData';
import LocalStorage from '@/libs/utils-storage';

//
//

export const Route = createFileRoute('/$')({
  component: HomePage,
  head: ({ params }) => {
    const paramsArr = params?._splat?.split('/') || [];
    //
    const pTypeList = ['h', 't', 't-31'];
    const pType0 = paramsArr?.[0] || '';
    const pType = pTypeList.includes(pType0) ? pType0 : 'h';
    // If there are multiple segments (e.g. /t/pName) use the last segment as pName,
    // otherwise for single-segment (/pName) use that segment if it's NOT a pType.
    const pNameRaw = paramsArr.length > 1 ? last(paramsArr) : !pTypeList.includes(pType0) ? pType0 : '';
    const pName = pNameRaw ? pNameRaw.replace(/-/g, ' ') : '';
    return {
      meta: [{ title: [pName || 'Thân mời', 'Thu Huyền Việt Tùng', '✨ 🎉 🎊'].filter(Boolean).join(' | ') }, { name: 'description', content: '✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊' }],
    };
  },
});

//
// MAIN
//
function HomePage() {
  const params = Route.useParams();
  const paramsArr = params?._splat?.split('/') || [];
  //
  const pTypeList = ['h', 't', 't-31'];
  const pType0 = paramsArr?.[0] || '';
  const pType = pTypeList.includes(pType0) ? pType0 : 'h';

  // If there are multiple segments (e.g. /t/pName) use the last segment as pName,
  // otherwise for single-segment (/pName) use that segment if it's NOT a pType.
  const rawPName = paramsArr.length > 1 ? last(paramsArr) : !pTypeList.includes(pType0) ? pType0 : '';
  const pName = rawPName ? rawPName.replace(/-/g, ' ') : 'TH';
  const pName1 = rawPName ? (pName === 'TH' ? '' : pName) : '';

  const [isOpenQR, setIsOpenQR] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);

  // User state - stored in localStorage
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('');

  // Idle detection and toast notifications
  const { comments } = useRealtimeComments(30);

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

      setUserId(deterministicUserId);
      setUserName(pNameR);
      setUserAvatar(storedUserAvatar || '');

      // Store in localStorage
      LocalStorage.set('wedding-user-id', undefined, deterministicUserId);
      LocalStorage.set('wedding-user-name', undefined, pNameR);
    } else if (storedUserId && storedUserName) {
      // Use stored values if no pName
      setUserId(storedUserId);
      setUserName(storedUserName);
      setUserAvatar(storedUserAvatar || '');
    } else {
      // Generate a random user ID and use it as the name if no pName and no stored values
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substr(2, 9);
      const newUserId = `user-${timestamp}-${randomStr}`;
      const generatedName = `Guest-${randomStr}`; // Use short ID as name

      setUserId(newUserId);
      setUserName(generatedName);
      setUserAvatar('');

      LocalStorage.set('wedding-user-id', undefined, newUserId);
      LocalStorage.set('wedding-user-name', undefined, generatedName);
    }
  }, [pName]);

  // Show toast for new real-time comments (optional)
  useEffect(() => {
    if (comments.length > 0 && !isOpenComments) {
      const latestComment = comments[comments.length - 1];
      // Only show if it's a recent comment (within last 5 seconds)
      const now = Date.now();
      const commentTime = latestComment.createdAt?.getTime?.() || 0;
      if (now - commentTime < 5000) {
        showCommentToast(latestComment);
      }
    }
  }, [comments, isOpenComments]);

  // Show mock toast messages on component mount
  useEffect(() => {
    const mockComments = generateMockComments(3);

    // Show mock toasts with staggered delays
    mockComments.forEach((mockComment, index) => {
      setTimeout(
        () => {
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
            { autoClose: 5000 },
          );
        },
        (index + 1) * 2000,
      ); // Show every 2 seconds
    });
  }, []);

  //
  const mapParty = pType === 'h' ? 'https://maps.app.goo.gl/CH1Yi2JWQdu4c1LVA' : 'https://maps.app.goo.gl/7XFB6K6QAaBbRWYP9';

  return (
    <>
      <SEO title={[pName1 || 'Thân mời', 'Thu Huyền Việt Tùng', '✨ 🎉 🎊'].filter(Boolean).join(' | ')} />

      <RcImagesPreview>
        <Section01 pType={pType} />
      </RcImagesPreview>

      <Section03 pName={pName1} pType={pType} />

      <RcImagesPreview>
        <Section04 />
      </RcImagesPreview>

      <Section05 />

      <RcImagesPreview>
        <Section07 />
      </RcImagesPreview>

      <RcImagesPreview>
        <Section08 />
      </RcImagesPreview>

      <FloatingDock
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
        items={[
          {
            title: `Xem vị trí ${pType === 'h' ? 'Nhà Gái' : 'Nhà Trai'}`,
            icon: <MapPinIcon className="size-full" />,
            href: mapParty,
            target: '_blank',
            rel: 'noreferrer noopenner',
          },

          {
            title: 'Album chúng mình',
            icon: <ImagesIcon className="size-full" />,
            href: '/albums',
            target: '_blank',
            rel: 'noreferrer noopenner',
          },

          {
            title: 'Lời chúc',
            icon: <MessageCircleIcon className="size-full" />,
            onClick: () => {
              setIsOpenComments(!isOpenComments);
            },
          },

          {
            title: 'Mừng Cưới',
            icon: <GiftIcon className="size-full !min-h-[40px] !min-w-[40px] text-red-700" />,
            onClick: () => {
              setIsOpenQR(true);
            },
          },
        ]}
      />

      <ModalQR open={isOpenQR} pName={pName} pType={pType} setOpen={setIsOpenQR} />

      {/* User Avatar Stack - Top Left */}
      <UserAvatarStack userId={userId} userAvatar={userAvatar} userName={userName} />

      {/* Livestream Comments - Bottom Right */}
      <LivestreamComments userId={userId} hasUserName={!!pName} isOpen={isOpenComments} userAvatar={userAvatar} userName={userName} onToggle={() => setIsOpenComments(!isOpenComments)} />
    </>
  );
}
