// seo.ts
type SEOOptions = {
  title?: string;
  description?: string;
  keywords?: string;
  statusbarColor?: string;
  twitterHandle?: string;
  origin?: string;
};

export function buildSeoMeta(opts: SEOOptions = {}) {
  const siteTitle = import.meta.env.VITE_siteTitle || 'Thu Huyền Việt Tùng';
  const siteDescription = import.meta.env.VITE_siteDescription || '✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊';
  const siteKeywords = import.meta.env.VITE_siteKeywords || '';
  const twitterHandle = opts.twitterHandle ?? import.meta.env.VITE_twitterHandle;

  const metaTitle = opts.title || siteTitle;
  const metaDescription = opts.description || siteDescription;
  const metaKeywords = opts.keywords || siteKeywords;
  const statusbarColor = opts.statusbarColor ?? '#fff';

  const origin = opts.origin || (typeof window !== 'undefined' ? window.location.origin : '');
  const siteImagePreviewUrl = origin ? `${origin}/preview.jpg` : '';

  return [
    // Title
    { title: metaTitle },

    // Basic
    { charSet: 'utf-8' },
    { httpEquiv: 'X-UA-Compatible', content: 'ie=edge' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    },
    { name: 'description', content: metaDescription },
    { name: 'keywords', content: metaKeywords },

    // Theme colors
    { name: 'theme-color', content: statusbarColor },
    { name: 'msapplication-TileColor', content: statusbarColor },
    { name: 'msapplication-navbutton-color', content: statusbarColor },
    { name: 'apple-mobile-web-app-status-bar-style', content: statusbarColor },
    { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(twitterHandle ? [{ name: 'twitter:creator', content: twitterHandle }] : []),

    // Open Graph
    // { property: 'og:url', content: origin },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: metaTitle },
    { property: 'og:site_name', content: metaTitle },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: siteImagePreviewUrl },
  ];
}

export function buildSeoLinks() {
  return [
    // Apple touch icons
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },

    // Favicons
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },

    // Manifest
    { rel: 'manifest', href: '/manifest.json' },
  ];
}
