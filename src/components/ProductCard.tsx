import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { productKeyFromPath, trackProductClick } from "@/lib/analytics";

export type ProductVariant = "pink" | "blue" | "teal" | "slate" | "black";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
  variant: ProductVariant;
  icon: LucideIcon;
  cta: string;
  className?: string;
}

const variantStyles: Record<
  ProductVariant,
  { badge: string; icon: string; accent: string; button: "pink" | "blue" | "teal" | "black" | "default" }
> = {
  pink: {
    badge: "bg-pink-light text-pink",
    icon: "bg-pink/10 text-pink",
    accent: "group-hover:border-pink/40 group-hover:shadow-[0_16px_40px_-12px_hsl(var(--pink)/0.35)]",
    button: "pink",
  },
  blue: {
    badge: "bg-blue-light text-blue",
    icon: "bg-blue/10 text-blue",
    accent: "group-hover:border-blue/40 group-hover:shadow-[0_16px_40px_-12px_hsl(var(--blue)/0.35)]",
    button: "blue",
  },
  teal: {
    badge: "bg-teal-light text-teal",
    icon: "bg-teal/10 text-teal",
    accent: "group-hover:border-teal/40 group-hover:shadow-[0_16px_40px_-12px_hsl(var(--teal)/0.35)]",
    button: "teal",
  },
  slate: {
    badge: "bg-slate-light text-slate-foreground",
    icon: "bg-secondary text-foreground",
    accent: "group-hover:border-slate/30",
    button: "default",
  },
  black: {
    badge: "bg-product-black-light text-product-black",
    icon: "bg-product-black/10 text-product-black",
    accent: "group-hover:border-product-black/50 group-hover:shadow-[0_16px_40px_-12px_hsl(var(--product-black)/0.4)]",
    button: "black",
  },
};

export function ProductCard({
  name,
  tagline,
  description,
  features,
  href,
  variant,
  icon: Icon,
  cta,
  className,
}: ProductCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "group card-elevated p-6 sm:p-8 flex flex-col h-full border-2 border-transparent",
        styles.accent,
        className
      )}
    >
      <div className="flex items-start justify-between mb-5">
        <div className={cn("p-3 rounded-xl transition-transform duration-300 group-hover:scale-105", styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-label font-medium", styles.badge)}>
          {tagline}
        </span>
      </div>

      <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-tight">
        {name}
      </h3>
      <p className="font-sans text-muted-foreground text-sm mb-5 flex-grow leading-relaxed">
        {description}
      </p>

      <ul className="space-y-2.5 mb-8">
        {features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={styles.button} className="w-full rounded-full group/btn" asChild>
        <Link
          to={href}
          onClick={() =>
            trackProductClick(productKeyFromPath(href), "products_page")
          }
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}
