import { Calendar, Phone, CheckCircle2, Clock, Wrench, Sparkles, Hammer } from "lucide-react";

/** Split-screen bundle visual: booking software UI + real human receptionist */
export function HeroBundleVisual() {
  const bookings = [
    {
      time: "9:00",
      name: "Oil service, Bay 2",
      tag: "Workshop",
      color: "bg-product-black text-white",
      icon: Wrench,
      vibe: "Workshop",
    },
    {
      time: "10:30",
      name: "Colour & cut, Mia",
      tag: "Salon",
      color: "bg-pink text-white",
      icon: Sparkles,
      vibe: "Salon floor",
    },
    {
      time: "1:00",
      name: "Emergency plumbing call-out",
      tag: "Trade",
      color: "bg-blue text-white",
      icon: Hammer,
      vibe: "Job site",
    },
  ];

  return (
    <div className="relative grid sm:grid-cols-2 gap-3 sm:gap-4 animate-fade-up delay-300">
      {/* Software side - industry-tagged schedule */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-border/60 bg-card shadow-elevated overflow-hidden min-h-[300px] sm:min-h-[360px]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/40">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[hsl(40_80%_55%)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-teal" />
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground tracking-wide uppercase">
            BMS Pro · Live
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Today across industries</p>
              <p className="text-sm font-semibold text-foreground">Workshop · Salon · Trades</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
          </div>

          {/* Mini industry tabs */}
          <div className="flex gap-1.5">
            <span className="flex-1 text-center text-[10px] font-bold uppercase tracking-wide rounded-lg py-1.5 bg-product-black text-white">
              Mech
            </span>
            <span className="flex-1 text-center text-[10px] font-bold uppercase tracking-wide rounded-lg py-1.5 bg-pink text-white">
              Salon
            </span>
            <span className="flex-1 text-center text-[10px] font-bold uppercase tracking-wide rounded-lg py-1.5 bg-blue text-white">
              Trade
            </span>
          </div>

          <div className="space-y-2">
            {bookings.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.time + row.name}
                  className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/80 px-3 py-2.5"
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${row.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">{row.time}</span>
                      <span className="text-[10px] text-muted-foreground/80 truncate">{row.vibe}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground truncate font-medium">{row.name}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${row.color}`}>
                    {row.tag}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal shrink-0" />
            Receptionist booked workshop, salon &amp; trade jobs today
          </div>
        </div>
      </div>

      {/* Human receptionist side */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[360px] shadow-elevated">
        <img
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&fit=crop&crop=faces"
          alt="Professional human receptionist on a headset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_22%_8%/0.88)] via-[hsl(220_22%_8%/0.3)] to-transparent" />

        {/* Industry chips on photo */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-product-black/90 text-white text-[10px] font-bold px-2.5 py-1">
            Workshop calls
          </span>
          <span className="rounded-full bg-pink/95 text-white text-[10px] font-bold px-2.5 py-1">
            Salon bookings
          </span>
          <span className="rounded-full bg-blue/95 text-white text-[10px] font-bold px-2.5 py-1">
            Trade jobs
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
            </span>
            <span className="text-[11px] font-semibold text-white tracking-wide">Live · On call</span>
          </div>
          <p className="text-white font-semibold text-base sm:text-lg leading-snug">
            Real human receptionist
          </p>
          <p className="text-white/70 text-xs sm:text-sm mt-1 flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            Answering · Booking · Filtering  every industry
          </p>
        </div>
        <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 shadow-md">
          <Clock className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold text-foreground">Front desk live</span>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex">
        <span className="rounded-full bg-foreground text-background text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 shadow-lg">
          Software + Humans
        </span>
      </div>
    </div>
  );
}
