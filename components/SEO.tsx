
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "Software Development, AI Solutions, Nagpur, FOCS, Coding Academy, GenAI, Enterprise Software, Its Coder Camp",
  canonicalUrl,
  image = "https://focsit.in/og-image.jpg" // Reference a professional OG image
}) => {
  const siteUrl = "https://focsit.in";
  const fullUrl = canonicalUrl ? (siteUrl + canonicalUrl) : siteUrl;
  const fullTitle = `${title} | FOCS - Future of Computer Science`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="FOCS" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="FOCS - Future of Computer Science" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:site" content="@focstech" />

      {/* Search Engine Optimization Mobile Icons/Theme */}
      <meta name="theme-color" content="#4f46e5" />
    </Helmet>
  );
};

export default SEO;
