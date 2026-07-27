import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Service | BMS Pro"
        description="The terms that govern your use of BMS Pro products and services."
        path="/terms"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Legal</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: 17 December 2024
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction and Acceptance</h2>
              <p className="text-muted-foreground mb-4">
                These Terms of Service ("Terms") govern your access to and use of the services, software, and website (collectively, the "Services") provided by BMS Pro Pty Ltd (ABN 71 608 672 608) ("BMS Pro", "we", "us", or "our").
              </p>
              <p className="text-muted-foreground mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
              </p>
              <p className="text-muted-foreground">
                We may update these Terms from time to time. We will notify you of any material changes by posting the updated Terms on our website. Your continued use of the Services after such changes constitutes your acceptance of the updated Terms.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Definitions</h2>
              <p className="text-muted-foreground mb-4">In these Terms:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>"Account"</strong> means your registered account with BMS Pro</li>
                <li><strong>"Australian Consumer Law"</strong> means Schedule 2 of the Competition and Consumer Act 2010 (Cth)</li>
                <li><strong>"Business Day"</strong> means a day other than a Saturday, Sunday, or public holiday in Victoria, Australia</li>
                <li><strong>"Content"</strong> means any data, text, files, information, or materials uploaded or submitted to the Services</li>
                <li><strong>"Subscription"</strong> means your paid subscription to access the Services</li>
                <li><strong>"User"</strong> or <strong>"you"</strong> means any individual or entity that accesses or uses the Services</li>
              </ul>
            </section>

            {/* Account Registration */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To access certain features of the Services, you must register for an Account. When registering, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your Account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities that occur under your Account</li>
                <li>Notify us immediately of any unauthorised use of your Account</li>
              </ul>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your Account if any information provided is inaccurate, false, or no longer current, or if we reasonably suspect fraudulent or illegal activity.
              </p>
            </section>

            {/* Services Description */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Description of Services</h2>
              <p className="text-muted-foreground mb-4">
                BMS Pro provides cloud-based booking and business management software solutions, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Online booking and scheduling systems</li>
                <li>Customer relationship management tools</li>
                <li>Business operations and workflow management</li>
                <li>Payment processing integration</li>
                <li>Reporting and analytics features</li>
              </ul>
              <p className="text-muted-foreground">
                The specific features available to you will depend on your Subscription plan. We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time with reasonable notice.
              </p>
            </section>

            {/* Subscription and Fees */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Subscription and Fees</h2>
              <p className="text-muted-foreground mb-4">
                <strong>5.1 Subscription Plans:</strong> Access to the Services requires a paid Subscription. Details of available plans, features, and pricing are available on our website and may be updated from time to time.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>5.2 Payment:</strong> You agree to pay all fees associated with your Subscription. Fees are charged in advance on a monthly or annual basis, depending on your chosen plan. All fees are in Australian Dollars (AUD) unless otherwise specified.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>5.3 GST:</strong> Unless otherwise stated, all fees are exclusive of GST. Where GST applies, it will be added to your invoice in accordance with the A New Tax System (Goods and Services Tax) Act 1999 (Cth).
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>5.4 Price Changes:</strong> We may change our fees at any time with at least 30 days' notice. Price changes will take effect at the start of your next billing cycle.
              </p>
              <p className="text-muted-foreground">
                <strong>5.5 Late Payment:</strong> If payment is not received by the due date, we may suspend or restrict access to your Account until payment is received. We reserve the right to charge interest on overdue amounts at the rate prescribed under the Penalty Interest Rates Act 1983 (Vic).
              </p>
            </section>

            {/* Cancellation and Refunds */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cancellation and Refunds</h2>
              <p className="text-muted-foreground mb-4">
                <strong>6.1 Cancellation by You:</strong> You may cancel your Subscription at any time through your Account settings or by contacting us. Cancellation will take effect at the end of your current billing period.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>6.2 Refunds:</strong> Unless required by the Australian Consumer Law, fees are non-refundable. We do not provide refunds or credits for partial subscription periods or unused features.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>6.3 Consumer Guarantees:</strong> Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred on you by the Australian Consumer Law or any other applicable law that cannot be excluded, restricted, or modified by agreement.
              </p>
              <p className="text-muted-foreground">
                <strong>6.4 Data After Cancellation:</strong> Upon cancellation, your access to the Services will cease at the end of your billing period. We will retain your data for 30 days after cancellation, during which time you may request an export of your data. After this period, your data may be permanently deleted.
              </p>
            </section>

            {/* Your Obligations */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Obligations</h2>
              <p className="text-muted-foreground mb-4">
                When using the Services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Comply with all applicable laws and regulations, including the Privacy Act 1988 (Cth) and the Spam Act 2003 (Cth)</li>
                <li>Not use the Services for any unlawful or fraudulent purpose</li>
                <li>Not upload or transmit any viruses, malware, or harmful code</li>
                <li>Not attempt to gain unauthorised access to the Services or other users' accounts</li>
                <li>Not interfere with or disrupt the integrity or performance of the Services</li>
                <li>Not copy, modify, or create derivative works of the Services</li>
                <li>Not reverse engineer, decompile, or disassemble any aspect of the Services</li>
                <li>Obtain all necessary consents from individuals whose personal information you upload to the Services</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                <strong>8.1 Our Intellectual Property:</strong> The Services, including all software, code, designs, text, graphics, logos, and trademarks, are owned by BMS Pro or our licensors and are protected by Australian and international intellectual property laws. We grant you a limited, non-exclusive, non-transferable licence to use the Services in accordance with these Terms.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>8.2 Your Content:</strong> You retain ownership of all Content you upload to the Services. By uploading Content, you grant us a worldwide, non-exclusive, royalty-free licence to use, store, copy, and display your Content solely for the purpose of providing the Services to you.
              </p>
              <p className="text-muted-foreground">
                <strong>8.3 Feedback:</strong> If you provide us with feedback, suggestions, or ideas about the Services, you grant us the right to use such feedback without any obligation or compensation to you.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Our collection, use, and disclosure of your personal information is governed by our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which forms part of these Terms.
              </p>
              <p className="text-muted-foreground">
                By using the Services, you consent to the collection and use of your personal information as described in our Privacy Policy.
              </p>
            </section>

            {/* Warranties and Disclaimers */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Warranties and Disclaimers</h2>
              <p className="text-muted-foreground mb-4">
                <strong>10.1 Service Availability:</strong> We will use reasonable endeavours to ensure the Services are available 24 hours a day, 7 days a week. However, we do not guarantee uninterrupted access and may suspend the Services for maintenance, updates, or due to circumstances beyond our control.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>10.2 No Warranty:</strong> To the maximum extent permitted by law, the Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="text-muted-foreground">
                <strong>10.3 Consumer Guarantees:</strong> If you are a "consumer" within the meaning of the Australian Consumer Law, you may have certain rights and remedies (such as a right to repair, replacement, or refund) that cannot be excluded, restricted, or modified by agreement. Nothing in these Terms is intended to exclude, restrict, or modify such rights.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                <strong>11.1 Exclusion:</strong> To the maximum extent permitted by law, BMS Pro, its directors, employees, agents, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, goodwill, or other intangible losses, arising out of or in connection with these Terms or your use of the Services.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>11.2 Cap on Liability:</strong> Subject to clause 11.3, our total liability to you for any claim arising out of or in connection with these Terms or the Services will not exceed the total fees paid by you in the 12 months preceding the claim.
              </p>
              <p className="text-muted-foreground">
                <strong>11.3 Non-Excludable Rights:</strong> Nothing in these Terms limits or excludes any liability that cannot be limited or excluded under applicable law, including the Australian Consumer Law. For services supplied to consumers, our liability for a failure to comply with a consumer guarantee is limited (at our election) to re-supplying the services or paying the cost of having them re-supplied.
              </p>
            </section>

            {/* Indemnity */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Indemnity</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless BMS Pro, its directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Services; (b) your breach of these Terms; (c) your violation of any applicable law or regulation; or (d) your Content or data uploaded to the Services.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Termination</h2>
              <p className="text-muted-foreground mb-4">
                <strong>13.1 Termination by Us:</strong> We may suspend or terminate your access to the Services immediately if you breach these Terms, engage in fraudulent or illegal activity, or if we are required to do so by law. We may also terminate these Terms for convenience by providing 30 days' written notice.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>13.2 Effect of Termination:</strong> Upon termination, your right to use the Services will immediately cease. Clauses that by their nature should survive termination will survive, including intellectual property provisions, disclaimers, limitations of liability, and indemnities.
              </p>
              <p className="text-muted-foreground">
                <strong>13.3 Data Export:</strong> Upon termination, you may request an export of your data within 30 days. After this period, we may delete your data permanently.
              </p>
            </section>

            {/* Disputes */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Disputes</h2>
              <p className="text-muted-foreground mb-4">
                <strong>14.1 Dispute Resolution:</strong> If a dispute arises between you and BMS Pro, we encourage you to first contact us to seek resolution. We will attempt to resolve any disputes through good faith negotiation.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>14.2 Mediation:</strong> If a dispute cannot be resolved through negotiation within 30 days, either party may refer the dispute to mediation administered by the Resolution Institute in accordance with its mediation rules. The mediation will be held in Melbourne, Victoria.
              </p>
              <p className="text-muted-foreground">
                <strong>14.3 Urgent Relief:</strong> Nothing in this clause prevents either party from seeking urgent interlocutory or injunctive relief from a court of competent jurisdiction.
              </p>
            </section>

            {/* General Provisions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">15. General Provisions</h2>
              <p className="text-muted-foreground mb-4">
                <strong>15.1 Governing Law:</strong> These Terms are governed by the laws of Victoria, Australia. You submit to the exclusive jurisdiction of the courts of Victoria and any courts that may hear appeals from those courts.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>15.2 Entire Agreement:</strong> These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and BMS Pro regarding the Services.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>15.3 Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>15.4 Waiver:</strong> Our failure to enforce any right or provision of these Terms will not constitute a waiver of such right or provision.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>15.5 Assignment:</strong> You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign our rights and obligations under these Terms without your consent.
              </p>
              <p className="text-muted-foreground">
                <strong>15.6 Force Majeure:</strong> We will not be liable for any delay or failure to perform our obligations under these Terms due to circumstances beyond our reasonable control, including natural disasters, acts of government, pandemic, or internet outages.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">16. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-secondary/50 rounded-xl p-6">
                <p className="text-foreground font-medium mb-2">BMS Pro Pty Ltd</p>
                <p className="text-muted-foreground text-sm">
                  ABN: 71 608 672 608<br />
                  Email: <a href="mailto:info@bmspros.com.au" className="text-primary hover:underline">info@bmspros.com.au</a><br />
                  Phone: <a href="tel:0387973795" className="text-primary hover:underline">03 8797 3795</a><br />
                  Address: 12 Stelvio Close, Lynbrook VIC 3975, Australia
                </p>
              </div>
            </section>

            {/* Back to Home */}
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

export default TermsOfService;
