import { ArrowRight } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4 tracking-tight">
            Software + humans, one operation
          </h2>
          <p className="text-lg text-muted-foreground">
            Your industry product, a live calendar, and a real receptionist working as one front desk.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            <div className="md:col-span-3 rounded-2xl border border-border/60 bg-card p-6 sm:p-7 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                <h3 className="font-semibold text-foreground">Human Reception Desk</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Real people answer calls, book appointments into BMS Pro, handle reschedules, and filter what reaches your team — no AI voicebots.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-product-black text-product-black-foreground p-6 border-l-4 border-l-white/40">
              <h3 className="font-semibold mb-2">BMS Pro Black</h3>
              <p className="text-sm text-white/65 mb-3">Mechanic shops — efficiency &amp; call filtering</p>
              <div className="flex items-center text-xs text-white/45">
                <ArrowRight className="h-3 w-3 mr-1" /> Synced with reception
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-blue text-blue-foreground p-6 border-l-4 border-l-white/40">
              <h3 className="font-semibold mb-2">BMS Pro Blue</h3>
              <p className="text-sm text-white/80 mb-3">Trades — jobs booked without interrupting the tools</p>
              <div className="flex items-center text-xs text-white/70">
                <ArrowRight className="h-3 w-3 mr-1" /> Synced with reception
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-pink text-pink-foreground p-6 border-l-4 border-l-white/40">
              <h3 className="font-semibold mb-2">BMS Pro Pink</h3>
              <p className="text-sm text-white/80 mb-3">Salons — calendar filled while you&apos;re with clients</p>
              <div className="flex items-center text-xs text-white/70">
                <ArrowRight className="h-3 w-3 mr-1" /> Synced with reception
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
