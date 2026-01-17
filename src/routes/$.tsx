import { createFileRoute } from '@tanstack/react-router';
import { last } from 'lodash';
import { CalendarHeartIcon, GiftIcon, ImagesIcon, MapPinIcon } from 'lucide-react';
import { useState } from 'react';

import FloatingDock from '@/components/FloatingDock';
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

  const [isOpenSaveDate, setIsOpenSaveDate] = useState(false);
  const [isOpenQR, setIsOpenQR] = useState(false);

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
            title: 'Save the Date',
            icon: <CalendarHeartIcon className="size-full max-sm:-mt-0.5" />,
            onClick: () => {
              setIsOpenSaveDate(true);
            },
          },

          {
            title: 'Album chúng mình',
            icon: <ImagesIcon className="size-full" />,
            href: '/albums',
            target: '_blank',
            rel: 'noreferrer noopenner',
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

      {/* <ModalQR open={isOpenQR} setOpen={setIsOpenQR} /> */}

      {/* <ModalAccept open={isOpenSaveDate} pName={pName} pType={pType} setOpen={setIsOpenSaveDate} /> */}
    </>
  );
}
