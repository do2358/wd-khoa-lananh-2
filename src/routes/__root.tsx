import RC_I_CSS from '@rc-component/image/assets/index.css?url';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { GlobalScrollbar } from 'mac-scrollbar';
import MS_CSS from 'mac-scrollbar/dist/mac-scrollbar.css?url';

import Providers from '@/components/Providers';
import SEO from '@/components/SEO';
import { buildSeoMeta } from '@/libs/buildSeoHead';

// import APP_ANTD_CSS from '../styles-antd.css?url';
import APP_CSS from '../styles.css?url';

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-dvw! overflow-x-hidden!">
      <head>
        <HeadContent />
        <SEO description={'✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 '} title={'Thu Huyền Việt Tùng'} />
      </head>
      <body className="w-dvw! overflow-x-hidden!">
        <Providers>
          {children}
          <GlobalScrollbar />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: ({ params }) => ({
    meta: buildSeoMeta({
      title: 'Thu Huyền Việt Tùng',
      description: '✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊',
      keywords: 'Ngô Việt Tùng, Trịnh Thu Huyền, Đám cưới Việt Tùng Thu Huyền, tunghuyen3101, wedding, tunghuyen',
      statusbarColor: '#fff',
      origin: 'https://tunghuyen3101.vercel.app',
    }),
    links: [
      // Favicons
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', href: '/favicon.ico' },
      //
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: RC_I_CSS },
      { rel: 'stylesheet', href: MS_CSS },
      { rel: 'stylesheet', href: APP_CSS },
      // { rel: 'stylesheet', href: APP_ANTD_CSS },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Manrope:wght@200..800&family=Questrial&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
});
