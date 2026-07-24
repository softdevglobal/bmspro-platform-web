import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | BMS Pro"
        description="How BMS Pro collects, uses, and protects your information under the Australian Privacy Principles."
        path="/privacy"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Legal</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: 16 January 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                BMS Pro Pty Ltd (ABN 71 608 672 608) ("BMS Pro", "we", "us", or "our") is committed to protecting your privacy in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
              </p>
              <p className="text-muted-foreground mb-4">
                This Privacy Policy explains how we collect, hold, use, and disclose personal information when you use our applications, platform, websites, and services ("Services"), and how you may access or correct your personal information or make a privacy complaint.
              </p>
              <p className="text-muted-foreground">
                By using our Services or providing personal information to us, you consent to the handling of your information in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Types of Information Collected */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Types of Personal Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                The types of personal information we may collect include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Name, address, email address, and phone number</li>
                <li>Business name and ABN (if applicable)</li>
                <li>Payment and billing information</li>
                <li>Information about your use of our Services and website</li>
                <li>Device information, IP address, operating system, and browser type</li>
                <li>Staff and employee information for businesses using our platform</li>
                <li>Client and customer booking information</li>
                <li>Communication records between you and BMS Pro</li>
                <li>Location information (only when enabled) for optional on-site staff attendance verification, such as confirming presence at a salon's registered workplace during clock-in, clock-out, or active work shifts</li>
                <li>Any other information you choose to provide to us</li>
              </ul>
              <p className="text-muted-foreground">
                We do not collect sensitive information (such as health information, racial or ethnic origin, political opinions, religious beliefs, or sexual orientation) unless you voluntarily provide it or it is required or authorised by law.
              </p>
            </section>

            {/* How We Collect Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Collect Personal Information</h2>
              <p className="text-muted-foreground mb-4">
                We collect personal information in various ways, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>When you register an account or subscribe to our Services</li>
                <li>When you create or manage bookings through the platform</li>
                <li>When staff members use attendance or scheduling features</li>
                <li>When you contact us via email, phone, or our website</li>
                <li>When you complete forms, onboarding steps, or surveys</li>
                <li>Through cookies and similar technologies when you visit our website</li>
                <li>From third parties such as payment processors, cloud service providers, or analytics providers</li>
              </ul>
              <p className="text-muted-foreground">
                Where reasonable and practicable, we collect personal information directly from you.
              </p>
            </section>

            {/* Purpose of Collection */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Purpose of Collection, Use and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We collect, hold, use, and disclose personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>To provide, operate, and maintain our Services</li>
                <li>To manage accounts, bookings, scheduling, and attendance</li>
                <li>To process payments and subscriptions</li>
                <li>To communicate with you regarding your account or service updates</li>
                <li>To provide customer support and respond to enquiries</li>
                <li>To improve, personalise, and secure our Services</li>
                <li>To comply with legal and regulatory obligations</li>
                <li>To support optional on-site staff attendance verification, including confirming that staff members are physically present at a configured workplace during working hours or attendance actions</li>
                <li>For any other purpose with your consent or as required by law</li>
              </ul>
              <p className="text-muted-foreground">
                We do not use personal information for purposes unrelated to the operation of our Services without consent.
              </p>
            </section>

            {/* Location Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Location Information</h2>
              <p className="text-muted-foreground mb-4">
                BMS Pro Pink may collect location information to support optional on-site staff attendance verification features for businesses using the platform.
              </p>
              <p className="text-muted-foreground mb-4">
                Location data is used solely to verify that staff members are physically present at the salon's registered workplace during clock-in, clock-out, or active work shifts.
              </p>
              <p className="text-muted-foreground mb-4">
                Key safeguards include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Location data is collected only during working hours or attendance-related actions</li>
                <li>Location data is limited to the salon's configured workplace</li>
                <li>Location data is not used for advertising, marketing, or user profiling</li>
                <li>Location access is optional and enabled only if chosen by the salon owner or user</li>
                <li>Users are clearly informed when location access is required and can manage permissions through their device settings</li>
              </ul>
            </section>

            {/* Disclosure to Third Parties */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Disclosure to Third Parties</h2>
              <p className="text-muted-foreground mb-4">
                We may disclose personal information to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Employees, contractors, and service providers assisting in operating our business</li>
                <li>Payment processors and financial institutions</li>
                <li>Cloud hosting, infrastructure, and security providers</li>
                <li>Professional advisers such as lawyers and accountants</li>
                <li>Government authorities where required by law</li>
                <li>Other parties with your consent</li>
              </ul>
              <p className="text-muted-foreground">
                We take reasonable steps to ensure third parties comply with confidentiality and privacy obligations.
              </p>
            </section>

            {/* Cross-Border Disclosure */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Cross-Border Disclosure of Personal Information</h2>
              <p className="text-muted-foreground mb-4">
                Some service providers may be located outside Australia, including in the United States or European Union.
              </p>
              <p className="text-muted-foreground">
                Before disclosing personal information overseas, we take reasonable steps to ensure compliance with the APPs or obtain your consent where required.
              </p>
            </section>

            {/* Data Quality and Security */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Quality and Security</h2>
              <p className="text-muted-foreground mb-4">
                We take reasonable steps to ensure that personal information is accurate, up-to-date, and protected against misuse, loss, unauthorised access, modification, or disclosure.
              </p>
              <p className="text-muted-foreground mb-4">
                Security measures include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Encryption in transit and at rest</li>
                <li>Secure data centres and infrastructure</li>
                <li>Access controls and authentication</li>
                <li>Regular security reviews</li>
                <li>Staff privacy and security training</li>
              </ul>
              <p className="text-muted-foreground">
                Personal information is destroyed or de-identified when no longer required unless retention is required by law.
              </p>
            </section>

            {/* Access and Correction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Access to and Correction of Personal Information</h2>
              <p className="text-muted-foreground mb-4">
                You may request access to or correction of your personal information by contacting us. Requests are generally responded to within 30 days.
              </p>
              <p className="text-muted-foreground">
                We may refuse access or correction in circumstances permitted by law and will provide reasons if applicable.
              </p>
            </section>

            {/* Direct Marketing */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Direct Marketing</h2>
              <p className="text-muted-foreground mb-4">
                We may send marketing communications where permitted by law. You may opt out at any time using unsubscribe links or by contacting us.
              </p>
              <p className="text-muted-foreground">
                Transactional and service-related communications may still be sent.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground">
                Our website uses cookies and similar technologies to improve functionality and performance. You may control cookies through your browser settings.
              </p>
            </section>

            {/* Anonymity and Pseudonymity */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Anonymity and Pseudonymity</h2>
              <p className="text-muted-foreground">
                Where practicable, you may interact with us anonymously or using a pseudonym. Some services require personal information to function properly.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain personal information only as long as necessary to provide Services, comply with legal obligations, resolve disputes, and enforce agreements.
              </p>
            </section>

            {/* Complaints */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Complaints</h2>
              <p className="text-muted-foreground mb-4">
                If you believe we have breached this Privacy Policy or the APPs, you may contact us. Complaints are investigated and responded to within 30 days.
              </p>
              <p className="text-muted-foreground">
                If unresolved, you may contact the Office of the Australian Information Commissioner (OAIC).
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">15. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. Updates will be posted with a revised "Last updated" date.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">16. Contact Us</h2>
              <div className="bg-secondary/50 rounded-xl p-6">
                <p className="text-foreground font-medium mb-2">Privacy Officer – BMS Pro Pty Ltd</p>
                <p className="text-muted-foreground text-sm">
                  Email: <a href="mailto:admin@bmspros.com.au" className="text-primary hover:underline">admin@bmspros.com.au</a><br />
                  Phone: <a href="tel:0387973795" className="text-primary hover:underline">03 8797 3795</a><br />
                  Address: 12 Stelvio Close, Lynbrook VIC 3975, Australia
                </p>
              </div>
            </section>

            {/* Definitions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">17. Definitions</h2>
              <p className="text-muted-foreground">
                "Personal information" and "Sensitive information" have the meanings given under the Privacy Act 1988 (Cth). "APPs" means the Australian Privacy Principles.
              </p>
            </section>

            {/* Back to Home Link */}
            <div className="pt-8 border-t border-border">
              <Link 
                to="/" 
                className="text-primary hover:underline font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
