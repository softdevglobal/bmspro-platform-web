import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { trackPage404 } from "@/lib/analytics";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    console.error("404 Error: User attempted to access non-existent route:", pagePath);
    trackPage404({
      page_path: location.pathname,
      page_location: pagePath,
      page_search: location.search || undefined,
      page_referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    });
  }, [location.pathname, location.search, location.hash]);

  return (
    <Layout>
      <section className="section-padding min-h-[calc(100vh-200px)] flex items-center">
        <div className="container-narrow text-center">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page not found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
