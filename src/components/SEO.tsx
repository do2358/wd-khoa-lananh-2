import { useLocation } from '@tanstack/react-router';

type TSEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  statusbarColor?: string;
};

const SEO = ({ title = 'Tung&Huyen', description = 'Tung&Huyen', keywords = '', statusbarColor = '#fff' }: TSEOProps) => {
  const router = useLocation();
  // Customize Meta Properties
  const metaDescription = description || import.meta.env.VITE_siteDescription || 'Tung&Huyen';
  const metaKeywords = keywords || import.meta.env.VITE_siteKeywords || '';
  const twitterHandle = import.meta.env.VITE_twitterHandle;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const siteImagePreviewUrl = `${router?.url?.origin}/preview.jpg`;

  return (
    <>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta content="ie=edge" httpEquiv="X-UA-Compatible" />
      <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      {/* Twitter Card */}
      <meta key="twcard" name="twitter:card" content="summary_large_image" />
      <meta key="twhandle" name="twitter:creator" content={twitterHandle} />

      {/* Open Graph */}
      <meta key="ogurl" content={currentUrl} property="og: url" />
      <meta key="ogimage" content={siteImagePreviewUrl} property="og:image" />
      <meta key="ogsitename" content="Tung&Huyen" property="og:site_name" />
      <meta key="ogtitle" content={title} property="og: title" />
      <meta key="ogdesc" content={metaDescription} property="og:description" />

      {/* Favicons */}
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link key="favicon" href="/favicon.ico" rel="icon" />

      {/* Theme Colors */}
      <meta name="theme-color" content={statusbarColor} />
      <meta name="msapplication-TileColor" content={statusbarColor} />
      <meta name="msapplication-navbutton-color" content={statusbarColor} />
      <meta name="apple-mobile-web-app-status-bar-style" content={statusbarColor} />

      {/* Title */}
      <title>{title}</title>
    </>
  );
};

export default SEO;
