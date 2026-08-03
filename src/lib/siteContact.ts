/** Public contact details for this marketing site — keep footer, contact page, and schema in sync. */
export const SITE_CONTACT_EMAIL = "info@bmspros.com.au";

export const SITE_PHONE_DISPLAY = "03 8797 3795";
export const SITE_PHONE_TEL = "0387973795";
/** E.164 for structured data */
export const SITE_PHONE_E164 = "+61387973795";

export const SITE_STREET_ADDRESS = "12 Stelvio Close";
export const SITE_ADDRESS_LOCALITY = "Lynbrook";
export const SITE_ADDRESS_REGION = "VIC";
export const SITE_POSTAL_CODE = "3975";
export const SITE_ADDRESS_COUNTRY = "AU";

export const SITE_ADDRESS_DISPLAY = `${SITE_STREET_ADDRESS}, ${SITE_ADDRESS_LOCALITY} ${SITE_ADDRESS_REGION} ${SITE_POSTAL_CODE}`;

export const SITE_POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: SITE_STREET_ADDRESS,
  addressLocality: SITE_ADDRESS_LOCALITY,
  addressRegion: SITE_ADDRESS_REGION,
  postalCode: SITE_POSTAL_CODE,
  addressCountry: SITE_ADDRESS_COUNTRY,
};
