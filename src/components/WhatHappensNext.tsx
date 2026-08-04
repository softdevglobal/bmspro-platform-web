const STEPS = [
  {
    number: "1",
    title: "Tell us your business type",
    body: "Workshop, trade crew or salon, so we prepare the right product.",
  },
  {
    number: "2",
    title: "We show the relevant workflow",
    body: "A normal day on the day board, bookings and job handoffs. Not a feature dump.",
  },
  {
    number: "3",
    title: "You decide whether it fits",
    body: "No pressure to sign up on the call. Take the information away and decide in your own time.",
  },
] as const;

type WhatHappensNextProps = {
  /** Visual variant for light pages vs dark marketing bands */
  variant?: "light" | "dark";
  className?: string;
};

export function WhatHappensNext({ variant = "light", className }: WhatHappensNextProps) {
  const isDark = variant === "dark";

  return (
    <div className={className}>
      <div className={isDark ? "mb-8" : "max-w-2xl mx-auto text-center mb-10"}>
        <h2
          className={
            isDark
              ? "font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3"
              : "font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground"
          }
        >
          What happens next
        </h2>
        <p
          className={
            isDark
              ? "font-sans text-lg text-white/65 leading-relaxed"
              : "font-sans text-lg text-muted-foreground leading-relaxed"
          }
        >
          The walkthrough is low pressure: three simple steps, then you decide.
        </p>
      </div>

      <ol className="max-w-3xl mx-auto space-y-3">
        {STEPS.map((step) => (
          <li
            key={step.number}
            className={
              isDark
                ? "flex gap-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5"
                : "flex gap-4 rounded-2xl border border-border bg-white p-5 sm:px-6"
            }
          >
            <span
              className={
                isDark
                  ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[hsl(220_22%_10%)] font-display font-bold"
                  : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background font-display font-bold"
              }
            >
              {step.number}
            </span>
            <div>
              <h3
                className={
                  isDark
                    ? "font-semibold text-lg mb-1 text-white"
                    : "font-semibold text-lg mb-1 text-foreground"
                }
              >
                {step.title}
              </h3>
              <p
                className={
                  isDark
                    ? "text-sm text-white/65 leading-relaxed"
                    : "text-sm text-muted-foreground leading-relaxed"
                }
              >
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
