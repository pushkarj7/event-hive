import { RotateCcw, CheckCircle2 } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-18">
        <div className="absolute inset-0 bg-linear-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <RotateCcw size={13} />
            <span>Fair &amp; Transparent Terms</span>
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Clear guidelines on ticket refunds, cancellations, and rescheduled events
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-surface p-6 sm:p-10 shadow-xs text-xs sm:text-sm text-text-secondary leading-relaxed">
          {/* Highlight Card */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/70 p-5 text-emerald-900">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <CheckCircle2 size={18} />
              <span>100% Refund Guarantee for Cancelled Events</span>
            </div>
            <p className="mt-1 text-xs text-emerald-700">
              If an event is cancelled by the organizer or government authorities, you are entitled to a full 100% refund of the face value of the ticket directly to your original source of payment.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">1. Rescheduled &amp; Postponed Events</h2>
            <p>
              If an event date or venue is postponed, your tickets will automatically remain valid for the new rescheduled date. If you are unable to attend the new rescheduled date, you can claim a full refund by notifying our support desk within 7 calendar days of the postponement announcement.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">2. Attendee Voluntary Cancellations &amp; Refund Protection</h2>
            <p>
              Standard event tickets are generally non-refundable for personal changes of plans, as organizers cap venue capacities and allocate seating. However, if you purchased <strong>Refund Protection</strong> during checkout, you can cancel your tickets up to 24 hours before gate opening for an instant 80% refund without questions asked.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">3. Refund Processing Timelines</h2>
            <div className="grid gap-3 sm:grid-cols-3 mt-3">
              <div className="rounded-xl border border-slate-200 bg-background p-3 text-center">
                <span className="text-[11px] text-text-secondary">UPI Payments</span>
                <p className="mt-1 font-bold text-text text-sm">24 – 48 Hours</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-background p-3 text-center">
                <span className="text-[11px] text-text-secondary">Net Banking</span>
                <p className="mt-1 font-bold text-text text-sm">3 – 5 Working Days</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-background p-3 text-center">
                <span className="text-[11px] text-text-secondary">Credit / Debit Cards</span>
                <p className="mt-1 font-bold text-text text-sm">5 – 7 Banking Days</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">4. How to Request a Refund</h2>
            <p>
              To initiate a refund request, send an email to{" "}
              <a href="mailto:refunds@eventhive.in" className="text-primary font-semibold hover:underline">
                refunds@eventhive.in
              </a>{" "}
              with your <strong>Booking Reference ID</strong> (e.g. EH-XXXXXX) or use the live chat in the Help Center.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
