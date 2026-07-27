import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { BlackPricingSection } from "@/components/pricing/BlackPricingSection";
import { BluePricingSection } from "@/components/pricing/BluePricingSection";
import { PinkPricingSection } from "@/components/pricing/PinkPricingSection";
import { cn } from "@/lib/utils";

type PricingProduct = "black" | "blue" | "pink";

const PRODUCTS: {
  id: PricingProduct;
  name: string;
  audience: string;
  icon: string;
  activeClass: string;
  ringClass: string;
}[] = [
  {
    id: "black",
    name: "Black",
    audience: "Workshops",
    icon: "/products/black/icon.png",
    activeClass: "bg-white text-[hsl(220_22%_10%)] shadow-lg",
    ringClass: "ring-white/40",
  },
  {
    id: "blue",
    name: "Blue",
    audience: "Trades",
    icon: "/products/blue/icon.png",
    activeClass: "bg-blue text-white shadow-lg shadow-blue/30",
    ringClass: "ring-blue/50",
  },
  {
    id: "pink",
    name: "Pink",
    audience: "Salons",
    icon: "/products/pink/icon.png",
    activeClass: "bg-pink text-white shadow-lg shadow-pink/30",
    ringClass: "ring-pink/50",
  },
];

function productFromHash(hash: string): PricingProduct {
  if (hash.includes("blue")) return "blue";
  if (hash.includes("pink")) return "pink";
  return "black";
}

function hashForProduct(product: PricingProduct): string {
  if (product === "blue") return "blue-plans";
  if (product === "pink") return "pink-plans";
  return "black-plans";
}

const Pricing = () => {
  const location = useLocation();
  const [product, setProduct] = useState<PricingProduct>(() =>
    productFromHash(location.hash)
  );

  useEffect(() => {
    setProduct(productFromHash(location.hash));
  }, [location.hash]);

  const selectProduct = (next: PricingProduct) => {
    setProduct(next);
    window.history.replaceState(null, "", `#${hashForProduct(next)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <SEO
        title="Pricing | BMS Pro Black, Blue & Pink"
        description="BMS Pro plans — Black for workshops, Blue for trades, Pink for salons. AUD pricing with clear features per tier."
        path="/pricing"
      />

      <div className="relative">
        {/* Floating product picker overlaid on the hero */}
        <div className="absolute inset-x-0 top-[4.75rem] sm:top-20 z-40 pointer-events-none">
          <div className="container-wide">
            <div
              className="pointer-events-auto mx-auto max-w-2xl rounded-2xl border border-white/15 bg-[hsl(220_22%_8%/0.75)] p-1.5 shadow-[0_16px_48px_-16px_hsl(220_22%_4%/0.65)] backdrop-blur-xl animate-fade-up"
              role="tablist"
              aria-label="Choose a product"
            >
              <div className="grid grid-cols-3 gap-1.5">
                {PRODUCTS.map((item) => {
                  const selected = product === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => selectProduct(item.id)}
                      className={cn(
                        "group flex flex-col sm:flex-row items-center gap-2 sm:gap-3 rounded-xl px-2 py-3 sm:px-3.5 sm:py-3 text-left transition-all duration-200",
                        selected
                          ? cn(item.activeClass, "ring-2", item.ringClass)
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        className={cn(
                          "h-9 w-9 sm:h-10 sm:w-10 rounded-lg object-cover shrink-0 transition-transform duration-200",
                          selected
                            ? "ring-1 ring-black/10"
                            : "ring-1 ring-white/20 group-hover:scale-105"
                        )}
                      />
                      <span className="min-w-0 text-center sm:text-left">
                        <span className="block font-display text-sm sm:text-base font-bold leading-tight tracking-tight">
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            "hidden sm:block text-xs font-medium mt-0.5",
                            selected ? "opacity-80" : "text-white/45"
                          )}
                        >
                          {item.audience}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {product === "black" && (
          <div role="tabpanel" id="black-plans">
            <BlackPricingSection offsetHeader overlayPicker />
          </div>
        )}
        {product === "blue" && (
          <div role="tabpanel" id="blue-plans">
            <BluePricingSection offsetHeader overlayPicker />
          </div>
        )}
        {product === "pink" && (
          <div role="tabpanel" id="pink-plans">
            <PinkPricingSection offsetHeader overlayPicker />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Pricing;
