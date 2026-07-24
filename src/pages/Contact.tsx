import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    product: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        product: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Contact BMS Pro | Book a Demo"
        description="Talk to the BMS Pro team. Book a demo, ask about pricing, or get help choosing the right product. Based in Lynbrook, Victoria."
        path="/contact"
      />
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column - Info */}
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Us</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-6">
                Let's talk about your business
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Whether you want a demo, have questions about pricing, or need help choosing the right product — we're here to help.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-secondary">
                    <Mail className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email us</p>
                    <a href="mailto:admin@bmspros.com.au" className="text-muted-foreground hover:text-primary transition-colors">
                      admin@bmspros.com.au
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-secondary">
                    <Phone className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Call us</p>
                    <a href="tel:0387973795" className="text-muted-foreground hover:text-primary transition-colors">
                      03 8797 3795
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-secondary">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Visit us</p>
                    <p className="text-muted-foreground">12 Stelvio Close, Lynbrook VIC 3975</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border border-border mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.8876!2d145.2563!3d-38.0558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad61513f6ec0c9f%3A0x4e25c5c5c5c5c5c5!2s12%20Stelvio%20Cl%2C%20Lynbrook%20VIC%203975!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BMS Pro Office Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="p-6 rounded-2xl bg-secondary/50">
                <h3 className="font-semibold text-foreground mb-2">Looking for support?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Existing customers can reach our support team directly through the dashboard or at admin@bmspros.com.au
                </p>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="card-elevated p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Book a Demo</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Smith" 
                      required 
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@company.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company name</Label>
                  <Input 
                    id="company" 
                    placeholder="Acme Inc" 
                    required 
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product">Product interest</Label>
                  <select
                    id="product"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.product}
                    onChange={handleChange}
                  >
                    <option value="">Select a product</option>
                    <option value="black">BMS Pro Black</option>
                    <option value="pink">BMS Pro Pink</option>
                    <option value="blue">BMS Pro Blue</option>
                    <option value="fieldflow">BMS Pro FieldFlow</option>
                    <option value="booking-engine">Booking Engine</option>
                    <option value="all">Full Platform</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your business needs..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Request Demo"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
