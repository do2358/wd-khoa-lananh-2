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
import Section02 from '@/components/Section02';
import Section03 from '@/components/Section03';
import Section04 from '@/components/Section04';
import Section05 from '@/components/Section05';
import Section06 from '@/components/Section06';
import Section07 from '@/components/Section07';
import Section08 from '@/components/Section08';
import SEO from '@/components/SEO';
import UserAvatarStack from '@/components/UserAvatarStack';
import { useRealtimeComments } from '@/hooks/useRealtimeComments';

//
//
//

export const Route = createFileRoute('/$')({
  component: HomePage,
});

//
// MAIN
//
function HomePage() {
  const params = Route.useParams();
  const paramsArr = params?._splat?.split('/') || [];
  //
  const pType = paramsArr?.[0];
  const pName = last(paramsArr)?.replace(/-/g, ' ');

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
    const storedUserId = localStorage.getItem('wedding-user-id');
    const storedUserName = localStorage.getItem('wedding-user-name');
    const storedUserAvatar = localStorage.getItem('wedding-user-avatar');

    // If pName exists, use it to create a deterministic user ID
    if (pName) {
      // Create a consistent user ID based on pName
      const pNameSlug = pName.toLowerCase().replace(/\s+/g, '-');
      const deterministicUserId = `user-${pNameSlug}`;

      setUserId(deterministicUserId);
      setUserName(pName);
      setUserAvatar(storedUserAvatar || '');

      // Store in localStorage
      localStorage.setItem('wedding-user-id', deterministicUserId);
      localStorage.setItem('wedding-user-name', pName);
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

      localStorage.setItem('wedding-user-id', newUserId);
      localStorage.setItem('wedding-user-name', generatedName);
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

  //
  const mapParty = pType === 'h' ? 'https://maps.app.goo.gl/CH1Yi2JWQdu4c1LVA' : 'https://maps.app.goo.gl/7XFB6K6QAaBbRWYP9';

  return (
    <>
      <SEO description={'✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 '} title={[pName, 'Welcome to Our Wedding', '✨ 🎉 🎊'].filter(Boolean).join(' | ')} />

      {/* <BgAurora className="fixed top-0 left-0 -z-50 h-dvh w-dvw bg-white max-sm:hidden" classNameContainer="-z-50 opacity-40" /> */}

      <RcImagesPreview>
        <Section01 pType={pType} />
      </RcImagesPreview>

      <Section03 pName={pName} pType={pType} />

      <Section02 pName={pName} pType={pType} />

      <RcImagesPreview>
        <Section04 />
      </RcImagesPreview>

      <Section05 />

      <RcImagesPreview>
        <Section06 />
      </RcImagesPreview>

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
            title: pName ? 'Lời chúc' : 'Lời chúc (cần tên khách mời)',
            icon: <MessageCircleIcon className="size-full" />,
            disabled: !pName,
            onClick: () => {
              if (pName) {
                setIsOpenComments(!isOpenComments);
              }
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
      {pName && <LivestreamComments userId={userId} isOpen={isOpenComments} userAvatar={userAvatar} userName={userName} onToggle={() => setIsOpenComments(!isOpenComments)} />}

      {/* <ModalQR open={isOpenQR} setOpen={setIsOpenQR} /> */}

      {/* <ModalAccept open={isOpenSaveDate} pName={pName} pType={pType} setOpen={setIsOpenSaveDate} /> */}
    </>
  );
}
