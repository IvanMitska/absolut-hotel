import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  structuredData?: Record<string, any>;
}

export function SEO({
  title = 'Отель Абсолют',
  description = 'Отель Абсолют - гостиничный комплекс в центре города. Комфортабельные номера, ресторан, бизнес-центр, парковка. Бронирование номеров онлайн.',
  keywords = 'отель абсолют, гостиница, бронирование номеров, отель в центре города, комфортабельные номера, бизнес-отель',
  image = '/og-image.jpg',
  url = 'https://hotel-absolut.ru',
  type = 'website',
  locale = 'ru_RU',
  siteName = 'Отель Абсолют',
  twitterCard = 'summary_large_image',
  twitterSite = '@hotel_absolut',
  structuredData,
}: SEOProps) {
  const fullTitle = title === 'Отель Абсолют' ? title : `${title} | Отель Абсолют`;
  const canonicalUrl = `${url}${window.location.pathname}`;

  return (
    <Helmet>
      <html lang="ru" />
      
      {/* Основные мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      
      {/* ВКонтакте */}
      <meta property="vk:title" content={fullTitle} />
      <meta property="vk:description" content={description} />
      <meta property="vk:image" content={`${url}${image}`} />
      
      {/* Структурированные данные */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}