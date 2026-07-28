import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicy() {
  return (
    <Layout>
      <SEO
        title="Cookie Policy | BMS Pro"
        description="How BMS Pro uses cookies and similar technologies on our website."
        path="/cookies"
      />
      <div className="container-wide py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Cookie Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: January 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                This Cookie Policy explains how BMS Pro Pty Ltd ("we", "us", or "our") uses cookies 
                and similar tracking technologies when you visit our website at bmspros.com.au and 
                use our services.
              </p>
              <p className="text-muted-foreground">
                By using our website, you consent to the use of cookies in accordance with this policy. 
                If you do not agree to our use of cookies, you should set your browser settings accordingly 
                or not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. What Are Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your device when you visit a website. 
                They are widely used to make websites work more efficiently and to provide information 
                to the website owners.
              </p>
              <p className="text-muted-foreground">
                Cookies can be "session" cookies (which expire when you close your browser) or 
                "persistent" cookies (which remain on your device for a set period or until you delete them).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Essential Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies are necessary for the website to function properly. They enable basic 
                functions like page navigation, secure areas access, and remembering your preferences. 
                The website cannot function properly without these cookies.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Performance Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies help us understand how visitors interact with our website by collecting 
                and reporting information anonymously. They help us improve the website's performance 
                and user experience.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Functional Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering 
                your login details, language preferences, and region selection. They may be set by us 
                or by third-party providers whose services we use.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Marketing Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are used to track visitors across websites. The intention is to display 
                ads that are relevant and engaging for the individual user. We may use these cookies 
                to measure the effectiveness of our advertising campaigns.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use third-party services that set cookies on your device. These third parties include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Google Analytics - for website analytics and performance monitoring</li>
                <li>Intercom - for customer support and communication</li>
                <li>Social media platforms - for sharing functionality and social login</li>
              </ul>
              <p className="text-muted-foreground">
                These third parties have their own privacy policies, and we encourage you to read them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Most web browsers allow you to control cookies through their settings preferences. 
                However, limiting cookies may impact your experience of our website.
              </p>
              <p className="text-muted-foreground mb-4">
                To manage cookies, you can:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Adjust your browser settings to refuse or delete cookies</li>
                <li>Use browser extensions that block tracking cookies</li>
                <li>Use private/incognito browsing mode</li>
                <li>Clear cookies periodically from your browser</li>
              </ul>
              <p className="text-muted-foreground">
                For more information about managing cookies in your browser, visit your browser's help section 
                or the website <a href="https://www.allaboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We encourage you to periodically 
                review this page for the latest information on our cookie practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Email:</strong> info@bmspros.com.au</li>
                <li><strong className="text-foreground">Phone:</strong> 03 8797 3795</li>
                <li><strong className="text-foreground">Address:</strong> 12 Stelvio Close, Lynbrook VIC 3975</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
