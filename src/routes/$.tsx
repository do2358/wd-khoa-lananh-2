import { createFileRoute } from '@tanstack/react-router';
import { last } from 'lodash';
import { GiftIcon, ImagesIcon, MapPinIcon, MessageCircleIcon } from 'lucide-react';
import { Suspense, lazy, useState } from 'react';

import PageLoading from '@/components/background/PageLoading';

const FloatingDock = lazy(() => import('@/components/FloatingDock'));
const LivestreamComments = lazy(() => import('@/components/LivestreamComments'));
const RcImagesPreview = lazy(() => import('@/components/media/RcImagesPreview'));
const ModalQR = lazy(() => import('@/components/modal/ModalQR'));
const Section01 = lazy(() => import('@/components/Section01'));
const Section03 = lazy(() => import('@/components/Section03'));
const Section04 = lazy(() => import('@/components/Section04'));
const Section05 = lazy(() => import('@/components/Section05'));
const Section07 = lazy(() => import('@/components/Section07'));
const Section08 = lazy(() => import('@/components/Section08'));
const InitApp = lazy(() => import('@/components/InitApp'));
const SEO = lazy(() => import('@/components/SEO'));
const UserAvatarStack = lazy(() => import('@/components/UserAvatarStack'));

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

  //
  const mapParty = pType === 'h' ? 'https://maps.app.goo.gl/CH1Yi2JWQdu4c1LVA' : 'https://maps.app.goo.gl/7XFB6K6QAaBbRWYP9';

  // Idle detection and toast notifications

  return (
    <>
      <SEO title={[pName1 || 'Thân mời', 'Thu Huyền Việt Tùng', '✨ 🎉 🎊'].filter(Boolean).join(' | ')} />
      <Suspense fallback={<PageLoading />}>
        <InitApp setUserId={setUserId} isOpenComments={isOpenComments} pName={pName} setIsOpenComments={setIsOpenComments} setUserAvatar={setUserAvatar} setUserName={setUserName} />

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
      </Suspense>
    </>
  );
}
