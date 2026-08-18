import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const SEEN_KEY = "bms_pro_acknowledgement_seen";

export function AcknowledgementOfCountry() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    setOpen(true);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      sessionStorage.setItem(SEEN_KEY, "1");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-lg border-0 rounded-3xl p-0 overflow-hidden bg-[hsl(220_22%_8%)] text-white shadow-2xl [&>button]:text-white/70 [&>button]:hover:text-white [&>button]:hover:bg-white/10 [&>button]:rounded-full [&>button]:h-8 [&>button]:w-8 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:top-5 [&>button]:right-5 [&>button]:opacity-100"
      >
        <DialogTitle className="sr-only">Acknowledgement of Country</DialogTitle>

        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          aria-hidden
          style={{
            background: `
              radial-gradient(ellipse 55% 60% at 12% 12%, hsl(210 65% 38% / 0.3), transparent 60%),
              radial-gradient(ellipse 45% 50% at 90% 85%, hsl(172 55% 30% / 0.22), transparent 55%)
            `,
          }}
        />

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15"
            aria-hidden
          >
            <svg
              viewBox="0 0 48 48"
              className="h-7 w-7 text-[hsl(210_75%_65%)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="24" cy="24" r="7" />
              <circle cx="24" cy="24" r="13" strokeOpacity="0.55" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI) / 4;
                const x1 = 24 + Math.cos(angle) * 18;
                const y1 = 24 + Math.sin(angle) * 18;
                const x2 = 24 + Math.cos(angle) * 22;
                const y2 = 24 + Math.sin(angle) * 22;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
            </svg>
          </div>

          <p className="font-label text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[hsl(210_75%_72%)] mb-4">
            Acknowledgement of Country
          </p>

          <p className="font-sans text-sm sm:text-base text-white/85 leading-relaxed max-w-md mx-auto">
            BMS Pro acknowledges the Traditional Owners of Country throughout Australia and
            acknowledges their continuing connection to land, waters and community. We pay our
            respects to the people, the cultures and the Elders past and present.
          </p>

          <p className="font-sans text-xs sm:text-sm text-white/55 leading-relaxed max-w-md mx-auto mt-5">
            Aboriginal and Torres Strait Islander people should be aware that this website may
            contain images, voices and names of deceased persons.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
