import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ArrowLeft, FileText, Bell } from "lucide-react";

const placeholderPosts = [
  {
    title: "5 Ways to Streamline Your Service Business Operations",
    excerpt: "Discover proven strategies to improve efficiency and reduce administrative overhead in your service business.",
    category: "Business Tips",
    date: "Coming Soon",
  },
  {
    title: "The Complete Guide to Digital Booking Systems",
    excerpt: "Learn how digital booking systems can transform your customer experience and boost your bottom line.",
    category: "Technology",
    date: "Coming Soon",
  },
  {
    title: "Managing Field Teams: Best Practices for 2025",
    excerpt: "Expert insights on coordinating field staff, tracking jobs, and maintaining quality across your operations.",
    category: "Field Management",
    date: "Coming Soon",
  },
];

export default function Blog() {
  return (
    <Layout>
      <SEO
        title="Blog | BMS Pro Updates & Industry Insights"
        description="Product updates, customer stories, and insights for service businesses from the BMS Pro team."
        path="/blog"
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
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Insights & Resources
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tips, guides, and industry insights to help you run a more efficient service business. 
            Our blog is launching soon with expert content from the BMS Pro team.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <section className="mb-16 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Blog Coming Soon</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            We're working on bringing you valuable content about business management, 
            industry trends, and tips for growing your service business. Check back soon!
          </p>
        </section>

        {/* Preview Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Upcoming Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {placeholderPosts.map((post) => (
              <div key={post.title} className="p-6 rounded-lg border border-border bg-card opacity-75">
                <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded mb-4">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="text-center py-12 px-8 rounded-2xl bg-card border border-border">
          <Bell className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Want to be notified when our blog launches? Get in touch and we'll let you know 
            when new content is available.
          </p>
          <a
            href="mailto:info@bmspros.com.au?subject=Blog Subscription"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Notified
          </a>
        </section>
      </div>
    </Layout>
  );
}
