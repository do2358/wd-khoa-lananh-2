import RC_I_CSS from '@rc-component/image/assets/index.css?url';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { GlobalScrollbar } from 'mac-scrollbar';
import MS_CSS from 'mac-scrollbar/dist/mac-scrollbar.css?url';

import Providers from '@/components/Providers';
import SEO from '@/components/SEO';

// import APP_ANTD_CSS from '../styles-antd.css?url';
import APP_CSS from '../styles.css?url';

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-dvw! overflow-x-hidden!">
      <head>
        <HeadContent />
        <SEO description={'✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 '} title={['Welcome to Our Wedding', '✨ 🎉 🎊'].filter(Boolean).join(' | ')} />
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
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' },
      { title: 'Tùng Huyền 30 & 31.01.2026' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: MS_CSS },
      { rel: 'stylesheet', href: RC_I_CSS },
      { rel: 'stylesheet', href: APP_CSS },
      // { rel: 'stylesheet', href: APP_ANTD_CSS },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Manrope:wght@200..800&family=Questrial&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
});
