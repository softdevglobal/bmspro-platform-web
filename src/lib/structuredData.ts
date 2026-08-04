import {
  SITE_CONTACT_EMAIL,
  SITE_PHONE_E164,
  SITE_POSTAL_ADDRESS,
} from "@/lib/siteContact";

export const SITE_URL = "https://www.bmspros.com.au";
export const SITE_LOGO_URL = `${SITE_URL}/logo.png`;
export const SITE_NAME = "BMS Pro";

export type FaqItem = { q: string; a: string };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO_URL,
    email: SITE_CONTACT_EMAIL,
    telephone: SITE_PHONE_E164,
    address: SITE_POSTAL_ADDRESS,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_PHONE_E164,
      email: SITE_CONTACT_EMAIL,
      contactType: "customer service",
      areaServed: "AU",
      availableLanguage: "English",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** Platform-level software schema for the homepage - no fake offers or ratings. */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    image: SITE_LOGO_URL,
    description:
      "Booking and operations software for workshops, trades and salons in Australia.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

type ProductSchemaInput = {
  name: string;
  description: string;
  path: string;
  imagePath: string;
  /** Public AUD prices shown on the product/pricing UI */
  lowPrice: number;
  highPrice?: number;
  offerCount?: number;
};

function productOffers({
  url,
  lowPrice,
  highPrice,
  offerCount,
}: {
  url: string;
  lowPrice: number;
  highPrice?: number;
  offerCount?: number;
}) {
  const resolvedHigh = highPrice ?? lowPrice;
  const resolvedCount = offerCount ?? (resolvedHigh === lowPrice ? 1 : 2);

  return {
    "@type": "AggregateOffer",
    priceCurrency: "AUD",
    lowPrice: String(lowPrice),
    highPrice: String(resolvedHigh),
    offerCount: String(resolvedCount),
    availability: "https://schema.org/InStock",
    url,
  };
}

/**
 * Product + SoftwareApplication for product pages.
 * Includes AggregateOffer from published plan prices (required for Product rich results).
 * No AggregateRating / review - those would be misleading without real reviews.
 */
export function productSoftwareSchema({
  name,
  description,
  path,
  imagePath,
  lowPrice,
  highPrice,
  offerCount,
}: ProductSchemaInput) {
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}${imagePath}`;
  const offers = productOffers({ url, lowPrice, highPrice, offerCount });

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      description,
      brand: { "@type": "Brand", name: SITE_NAME },
      url,
      image,
      category: "BusinessApplication",
      offers,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url,
      image,
      description,
      brand: { "@type": "Brand", name: SITE_NAME },
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      offers,
    },
  ];
}
