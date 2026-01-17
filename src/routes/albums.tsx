import { createFileRoute } from '@tanstack/react-router';

import RcImagesPreview from '@/components/media/RcImagesPreview';
import SectionAlbum from '@/components/SectionAlbum';

export const Route = createFileRoute('/albums')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* <SEO description={'✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 '} title={['Welcome to Our Wedding', '✨ 🎉 🎊'].filter(Boolean).join(' | ')} /> */}
      {/* <AuroraBackground className="fixed top-0 left-0 h-dvh w-dvw" /> */}

      <RcImagesPreview>
        <SectionAlbum />
      </RcImagesPreview>
    </>
  );
}
