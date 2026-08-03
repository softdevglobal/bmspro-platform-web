import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.bmspros.com.au";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  /** Absolute URL or site path for social preview image */
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function resolveImageUrl(image?: string) {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

export function SEO({ title, description, path, image, jsonLd }: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = resolveImageUrl(image);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
