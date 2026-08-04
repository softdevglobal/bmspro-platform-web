import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Briefcase, Heart, Zap, Globe, Coffee, GraduationCap, MapPin, Clock } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellbeing",
    description: "Comprehensive health insurance and wellness programs for you and your family.",
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours to suit your lifestyle.",
  },
  {
    icon: Globe,
    title: "Work From Anywhere",
    description: "Freedom to work from home, office, or anywhere in Australia.",
  },
  {
    icon: Coffee,
    title: "Team Culture",
    description: "Regular team events, Friday lunches, and a supportive work environment.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Annual learning budget and opportunities for professional growth.",
  },
  {
    icon: Briefcase,
    title: "Competitive Salary",
    description: "Above-market compensation with equity options for key roles.",
  },
];

// No open positions at the moment - re-enable when hiring resumes.
// const jobOpenings = [
//   {
//     title: "DevOps Engineer",
//     department: "Engineering",
//     location: "Melbourne / Remote",
//     type: "Full-time",
//     description: "Design, implement, and maintain our cloud infrastructure and CI/CD pipelines to ensure seamless deployment and scalability.",
//   },
//   {
//     title: "IT Technician",
//     department: "IT Support",
//     location: "Melbourne",
//     type: "Full-time",
//     description: "Provide technical support and maintain IT systems, ensuring smooth operations across all departments.",
//   },
//   {
//     title: "Cloud Support Engineer",
//     department: "Engineering",
//     location: "Melbourne / Remote",
//     type: "Full-time",
//     description: "Support and troubleshoot cloud-based solutions, helping customers maximize the value of our platform.",
//   },
//   {
//     title: "AI Engineer",
//     department: "Engineering",
//     location: "Melbourne / Remote",
//     type: "Full-time",
//     description: "Develop and integrate AI/ML solutions to enhance our product suite and deliver intelligent automation features.",
//   },
//   {
//     title: "Sales Representative",
//     department: "Sales",
//     location: "Melbourne",
//     type: "Full-time",
//     description: "Drive business growth by building relationships with potential clients and showcasing our product solutions.",
//   },
// ];
const jobOpenings: {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}[] = [];

const hiringProcess = [
  { step: 1, title: "Apply Online", description: "Submit your resume and cover letter via email." },
  { step: 2, title: "Initial Chat", description: "A brief call to learn about you and share more about us." },
  { step: 3, title: "Technical Interview", description: "Role-specific assessment to showcase your skills." },
  { step: 4, title: "Team Meet", description: "Meet the team you'll be working with." },
  { step: 5, title: "Offer", description: "Receive your offer and join the BMS Pro family!" },
];

export default function Careers() {
  return (
    <Layout>
      <SEO
        title="Careers at BMS Pro | Open Roles"
        description="Join the BMS Pro team. View current openings and learn about benefits, culture, and how we work in Lynbrook, Victoria."
        path="/careers"
      />
      <div className="container-wide py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join Our Team
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Help us build the future of business management software. We're always looking for 
            talented, passionate people to join our growing team in Melbourne.
          </p>
        </div>

        {/* Why Join Us */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Why Work at BMS Pro?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-lg border border-border bg-card">
                <benefit.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Open Positions</h2>
          {jobOpenings.length === 0 ? (
            <div className="p-8 rounded-lg border border-border bg-card text-center">
              <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No open positions right now</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                We don&apos;t have any openings at the moment. Check back soon, or send your resume
                to{" "}
                <a
                  href="mailto:info@bmspros.com.au?subject=General Application"
                  className="text-primary hover:underline"
                >
                  info@bmspros.com.au
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobOpenings.map((job) => (
                <div key={job.title} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                        <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          {job.department}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`mailto:info@bmspros.com.au?subject=Application: ${job.title}`}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Hiring Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Our Hiring Process</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {hiringProcess.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="p-6 rounded-lg border border-border bg-card h-full">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < hiringProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-12 px-8 rounded-2xl bg-primary/5 border border-primary/10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Want to learn more about working at BMS Pro? Get in touch with our team.
          </p>
          <a
            href="mailto:info@bmspros.com.au?subject=Career Question"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </section>
      </div>
    </Layout>
  );
}
