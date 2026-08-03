import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { SoftwarePreviewSection } from "@/components/home/SoftwarePreviewSection";
import { ProductSuiteSection } from "@/components/home/ProductSuiteSection";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { TrustWalkthroughSection } from "@/components/home/TrustWalkthroughSection";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { CTASection } from "@/components/home/CTASection";
import { HOME_FAQS } from "@/lib/homeFaqs";
import {
  faqPageSchema,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/structuredData";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="BMS Pro | Booking and Operations Software for Service Businesses"
        description="Manage bookings, jobs, staff, customer updates and workflows in one platform built for workshops, trades and salons in Australia."
        path="/"
        image="/logo.png"
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          softwareApplicationSchema(),
          faqPageSchema([...HOME_FAQS]),
        ]}
      />
      <HeroSection />
      <SoftwarePreviewSection />
      <ProductSuiteSection />
      <ArchitectureSection />
      <TrustWalkthroughSection />
      <HomeFAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
