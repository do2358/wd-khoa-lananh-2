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

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(twitterHandle ? [{ name: 'twitter:creator', content: twitterHandle }] : []),

    // Open Graph
    { property: 'og:url', content: origin },
    { property: 'og:image', content: siteImagePreviewUrl },
    { property: 'og:site_name', content: metaTitle },
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },
  ];
}
