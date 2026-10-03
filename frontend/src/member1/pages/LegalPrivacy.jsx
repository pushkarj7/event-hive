import { Lock } from "lucide-react";

export default function LegalPrivacy() {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-18">
        <div className="absolute inset-0 bg-linear-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <Lock size={13} />
            <span>Data Protection &amp; Privacy</span>
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Effective Date: January 1, 2026 • Your personal data is encrypted and safeguarded
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-surface p-6 sm:p-10 shadow-xs text-xs sm:text-sm text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-text mb-2">1. Overview &amp; Commitment</h2>
            <p>
              At Event Hive, protecting your personal data and privacy is paramount. This policy describes how we collect, store, utilize, and protect your information when using our web services, mobile apps, and ticket booking APIs.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong className="text-text">Contact Information:</strong> Full name, verified email address, and mobile phone number for ticket issuance and WhatsApp booking confirmations.</li>
              <li><strong className="text-text">Transaction Records:</strong> Order IDs, amounts paid, ticket categories, and timestamp. (Note: We do NOT store credit/debit card CVV numbers or banking PINs; all transactions are processed via RBI-compliant, PCI-DSS Level 1 payment gateways).</li>
              <li><strong className="text-text">Device &amp; Location Analytics:</strong> IP address, device type, and city selection to serve accurate nearby gig recommendations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">3. How We Use Your Data</h2>
            <p>
              Your data is utilized solely for issuing your electronic tickets, facilitating venue gate entry, communicating critical event updates or venue changes, and preventing fraudulent black-market ticket purchases. We strictly NEVER sell your personal data to third-party telemarketers or advertisers.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">4. 256-Bit SSL Encryption &amp; Security Standards</h2>
            <p>
              All data transmitted between your browser and our servers is secured using SHA-256 with RSA encryption. Access to user records is strictly restricted to authorized customer support personnel under signed non-disclosure agreements.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-text mb-2">5. Attendee Rights &amp; Data Deletion Requests</h2>
            <p>
              You have the right to request a complete copy of your personal data or request permanent account and data deletion by emailing{" "}
              <a href="mailto:privacy@eventhive.in" className="text-primary font-semibold hover:underline">
                privacy@eventhive.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
