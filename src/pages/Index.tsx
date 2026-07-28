import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductSuiteSection } from "@/components/home/ProductSuiteSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="BMS Pro | Software + Real Human Receptionists"
        description="Booking software for mechanic shops, salons, and trades — paired with 100% real human receptionists. No AI voicebots. Book your strategy call."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BMS Pro",
            url: "https://bmspros.com.au",
            logo: "https://bmspros.com.au/logo.png",
            email: "admin@bmspros.com.au",
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
            url: "https://bmspros.com.au",
          },
        ]}
      />
      <HeroSection />
      <ProductSuiteSection />
      <AudienceSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ArchitectureSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
