import { ArrowRight, Headphones } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[hsl(220_22%_8%)]" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 45% 55% at 15% 30%, hsl(210 65% 38% / 0.28), transparent 60%),
            radial-gradient(ellipse 40% 50% at 85% 70%, hsl(340 60% 42% / 0.22), transparent 55%)
          `,
        }}
      />

      <div className="container-wide relative section-padding">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4 tracking-tight">
            Software + humans, one operation
          </h2>
          <p className="text-lg text-white/65">
            Your industry product, a live calendar, and a real receptionist working as one front desk.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            <div className="md:col-span-3 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Headphones className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-lg">Human Reception Desk</h3>
              </div>
              <p className="text-sm text-white/65 max-w-2xl">
                Real people answer calls, book appointments into BMS Pro, handle reschedules, and filter
                what reaches your team — no AI voicebots.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-product-black p-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Black</span>
              <h3 className="font-semibold text-lg mt-1 mb-2">Mechanic shops</h3>
              <p className="text-sm text-white/60 mb-4">Efficiency &amp; call filtering</p>
              <div className="flex items-center text-xs text-white/45">
                <ArrowRight className="h-3 w-3 mr-1" /> Synced with reception
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-blue p-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Blue</span>
              <h3 className="font-semibold text-lg mt-1 mb-2">Trades</h3>
              <p className="text-sm text-white/80 mb-4">Jobs booked without interrupting the tools</p>
              <div className="flex items-center text-xs text-white/70">
                <ArrowRight className="h-3 w-3 mr-1" /> Synced with reception
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-pink p-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Pink</span>
              <h3 className="font-semibold text-lg mt-1 mb-2">Salons</h3>
              <p className="text-sm text-white/80 mb-4">Calendar filled while you&apos;re with clients</p>
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
