import { ArrowRight } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            How it all fits together
          </h2>
          <p className="text-lg text-muted-foreground">
            A modular system designed to grow with your business needs.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Architecture diagram */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Admin Layer */}
            <div className="md:col-span-3 card-elevated p-6 bg-secondary/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <h3 className="font-semibold text-foreground">Admin Dashboard</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Central command for all operations. Manage staff, view analytics, configure settings, and oversee all bookings.
              </p>
            </div>

            {/* Middle Layer */}
            <div className="card-elevated p-6 border-l-4 border-pink">
              <h3 className="font-semibold text-foreground mb-2">BMS Pro Pink</h3>
              <p className="text-sm text-muted-foreground mb-3">Appointment scheduling for salons & personal services</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" /> Feeds into Admin
              </div>
            </div>

            <div className="card-elevated p-6 border-l-4 border-blue">
              <h3 className="font-semibold text-foreground mb-2">BMS Pro Blue</h3>
              <p className="text-sm text-muted-foreground mb-3">Job management for trades & service businesses</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" /> Feeds into Admin
              </div>
            </div>

            <div className="card-elevated p-6 border-l-4 border-teal">
              <h3 className="font-semibold text-foreground mb-2">FieldFlow</h3>
              <p className="text-sm text-muted-foreground mb-3">Mobile operations for field teams</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1" /> Real-time sync
              </div>
            </div>

            {/* Booking Engine Layer */}
            <div className="md:col-span-3 card-elevated p-6 border-2 border-dashed border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <h3 className="font-semibold text-foreground">Booking Engine</h3>
                <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">Embeddable</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Customer-facing booking widget that integrates with any website. Connects to your availability, accepts payments, and syncs with your dashboard.
              </p>
            </div>
          </div>

          {/* Connection lines (decorative) */}
          <div className="hidden md:block absolute left-1/2 top-[140px] h-8 w-px bg-border" />
          <div className="hidden md:block absolute left-1/2 bottom-[140px] h-8 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}
