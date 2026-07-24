import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductVariant = "pink" | "blue" | "teal" | "slate";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
  variant: ProductVariant;
  icon: LucideIcon;
  cta: string;
}

const variantStyles: Record<ProductVariant, { badge: string; icon: string; button: "pink" | "blue" | "teal" | "default" }> = {
  pink: {
    badge: "bg-pink-light text-pink",
    icon: "bg-pink/10 text-pink",
    button: "pink",
  },
  blue: {
    badge: "bg-blue-light text-blue",
    icon: "bg-blue/10 text-blue",
    button: "blue",
  },
  teal: {
    badge: "bg-teal-light text-teal",
    icon: "bg-teal/10 text-teal",
    button: "teal",
  },
  slate: {
    badge: "bg-slate-light text-slate-foreground",
    icon: "bg-secondary text-foreground",
    button: "default",
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
}: ProductCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className="group card-elevated p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium", styles.badge)}>
          {tagline}
        </span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={styles.button} className="w-full group/btn" asChild>
        <Link to={href}>
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}
