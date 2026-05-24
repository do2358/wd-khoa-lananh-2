import { useLocation } from '@tanstack/react-router';

type TSEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  statusbarColor?: string;
};

const SEO = ({
  title = 'Vân Anh Nguyên Khoa',
  description = '✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊 • ✨ 🎉 🎊',
  keywords = 'Vũ Nguyên Khoa, Lưu Thị Vân Anh, Đám cưới Nguyên Khoa Vân Anh, wedding',
  statusbarColor = '#fff',
}: TSEOProps) => {
  const router = useLocation();
  // Customize Meta Properties
  const metaTitle = title || import.meta.env.VITE_siteTitle || 'Vân Anh Nguyên Khoa';
  const metaDescription = description || import.meta.env.VITE_siteDescription || 'Vân Anh Nguyên Khoa';
  const metaKeywords = keywords || import.meta.env.VITE_siteKeywords || '';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const siteImagePreviewUrl = `${router?.url?.origin}/preview.jpg`;

  return (
    <>
      {/* Basic Meta Tags */}
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      {/* Open Graph */}
      {/* <meta key="ogurl" content={currentUrl} property="og:url" /> */}
      <meta key="ogimage" content={siteImagePreviewUrl} property="og:image" />
      <meta key="ogsitename" content={metaTitle} property="og:site_name" />
      <meta key="ogtitle" content={metaTitle} property="og:title" />
      <meta key="ogdesc" content={metaDescription} property="og:description" />

      {/* Theme Colors */}
      <meta name="theme-color" content={statusbarColor} />
      <meta name="msapplication-TileColor" content={statusbarColor} />
      <meta name="msapplication-navbutton-color" content={statusbarColor} />
      <meta name="apple-mobile-web-app-status-bar-style" content={statusbarColor} />

      {/* Title */}
      <title>{metaTitle}</title>
    </>
  );
};

export default SEO;
