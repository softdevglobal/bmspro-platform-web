export function AudienceSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative overflow-hidden rounded-3xl min-h-[320px] sm:min-h-[420px] border border-border/40 shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900&h=700&fit=crop"
              alt="Busy service business day"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_22%_6%/0.75)] via-[hsl(220_22%_6%/0.2)] to-transparent" />
          </div>

          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Does running the day feel harder than it should?
            </h2>

            <div className="space-y-3 text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              <p>A customer calls while you’re already working.</p>
              <p>A quote still needs following up.</p>
              <p>Someone on your team is asking where the next job is.</p>
              <p>Another customer wants to know whether you’re still coming.</p>
              <p>
                And the information you need is spread across messages, emails, calendars and
                handwritten notes.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-[hsl(220_14%_97%)] p-5 sm:p-6">
              <p className="text-foreground leading-relaxed mb-3">
                You’re not necessarily disorganised.
                <br />
                Your business may have simply outgrown the way you’re managing it.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                BMS Pro brings the important parts together so you can see what is happening and what
                needs to happen next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
