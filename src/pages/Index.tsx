import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductSuiteSection } from "@/components/home/ProductSuiteSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { SoftwarePreviewSection } from "@/components/home/SoftwarePreviewSection";
import { TrustWalkthroughSection } from "@/components/home/TrustWalkthroughSection";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_CONTACT_EMAIL } from "@/lib/siteContact";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="BMS Pro | Run the work without letting the admin run you"
        description="One platform for workshops, trades and salons. Keep bookings, jobs, staff and customer updates in one place built in Melbourne."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BMS Pro",
            url: "https://www.bmspros.com.au",
            logo: "https://www.bmspros.com.au/logo.png",
            email: SITE_CONTACT_EMAIL,
            telephone: "+61387973795",
            address: {
              "@type": "PostalAddress",
              streetAddress: "12 Stelvio Close",
              addressLocality: "Lynbrook",
              addressRegion: "VIC",
              postalCode: "3975",
              addressCountry: "AU",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "BMS Pro",
            url: "https://www.bmspros.com.au",
          },
        ]}
      />
      <HeroSection />
      <AudienceSection />
      <ProductSuiteSection />
      <ArchitectureSection />
      <BenefitsSection />
      <SoftwarePreviewSection />
      <TrustWalkthroughSection />
      <HomeFAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
