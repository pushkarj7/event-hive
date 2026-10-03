import { FileText } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-18">
        <div className="absolute inset-0 bg-linear-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <FileText size={13} />
            <span>Legal Agreement</span>
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Last Updated: January 1, 2026 • Please read carefully before purchasing passes
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-surface p-6 sm:p-10 shadow-xs text-xs sm:text-sm text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-text mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing the services of Event Hive (website, mobile platforms, and related ticketing portals), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any portion of these terms, please refrain from using the platform.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">2. Ticket Purchasing &amp; QR Code Authenticity</h2>
            <p>
              Event Hive acts as an authorized ticketing service provider on behalf of event organizers, venues, and artists. Each ticket issued carries a unique encrypted cryptographic QR code. Duplication, illegal reselling, unauthorized scalp distribution, or counterfeiting of tickets is strictly prohibited and will result in instant cancellation of passes and blacklisting without refund.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">3. Venue Entry, Identity Verification &amp; Code of Conduct</h2>
            <p>
              All attendees must present a valid government-issued photo ID (Aadhaar, Passport, or Voter ID) matching the registered attendee name at the venue entry turnstiles. Organizers and venue management reserve the right to refuse admission or eject any individual engaging in disorderly conduct, intoxication, or violation of venue regulations.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">4. Event Rescheduling, Artist Lineup Changes &amp; Force Majeure</h2>
            <p>
              Organizers reserve the right to modify event schedules, speaker lineups, or supporting acts due to unforeseen circumstances, illness, or travel logistics. In the event of total cancellation or date postponement by the organizer, refunds will be processed in accordance with our standard Refund Policy.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">5. Intellectual Property &amp; Brand Usage</h2>
            <p>
              All trademarks, logos, audio-visual content, and software code on Event Hive are protected under Indian copyright and intellectual property laws. Unauthorized reproduction or scraping is prohibited.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-6 text-xs text-text-secondary">
            For legal inquiries or corporate contracts, please contact{" "}
            <a href="mailto:legal@eventhive.in" className="text-primary font-semibold hover:underline">
              legal@eventhive.in
            </a>
            .
          </div>
        </div>
      </section>
    </div>
  );
}
