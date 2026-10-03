import { useState } from "react";
import { Search, ChevronDown, HelpCircle, Ticket, CreditCard, QrCode, RotateCcw } from "lucide-react";

export default function Faqs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      category: "Ticketing & Booking",
      icon: Ticket,
      items: [
        {
          q: "How do I receive my tickets after completing payment?",
          a: "Immediately upon successful payment, your digital e-ticket containing a high-contrast encrypted QR code is displayed on screen and sent to your registered email address and WhatsApp number.",
        },
        {
          q: "Can I transfer my ticket or pass to a friend?",
          a: "Yes! You can transfer standard passes to a friend's name and email through your Event Hive account under 'My Bookings' up to 4 hours before gate opening.",
        },
        {
          q: "Do I need to carry a printed physical copy of the ticket?",
          a: "No physical printout is necessary. Our optical laser scanners scan digital QR codes directly from your smartphone screen even in offline mode with screen brightness at 50%+.",
        },
      ],
    },
    {
      category: "Payments & Charges",
      icon: CreditCard,
      items: [
        {
          q: "What payment methods are supported on Event Hive?",
          a: "We support UPI (Google Pay, PhonePe, Paytm, Cred UPI), all major Indian & International Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, and popular digital wallets.",
        },
        {
          q: "Are there hidden convenience or processing fees?",
          a: "No. Unlike other portals that add surprise fees on the final checkout screen, Event Hive displays transparent all-inclusive pricing upfront.",
        },
      ],
    },
    {
      category: "Gate Entry & QR Scanning",
      icon: QrCode,
      items: [
        {
          q: "What documents do I need to present at the venue gate?",
          a: "Along with your digital Event Hive QR pass, please carry a valid government-issued photo ID (Aadhaar Card, Driver's License, or Passport) matching the primary attendee name.",
        },
        {
          q: "What happens if my phone battery dies at the venue?",
          a: "Visit the Event Hive Box Office desk at the venue entrance. Our support executives can verify your booking using your registered mobile number and government ID to issue a replacement entry wristband.",
        },
      ],
    },
    {
      category: "Cancellations & Refunds",
      icon: RotateCcw,
      items: [
        {
          q: "What is Event Hive's refund policy if an event is cancelled or postponed?",
          a: "If an organizer reschedules or cancels a show, you are entitled to a 100% full refund directly to your original payment method within 5 to 7 banking days.",
        },
        {
          q: "Can I cancel my ticket if I am unable to attend?",
          a: "Tickets with 'Refund Protection' added at checkout can be cancelled up to 24 hours prior to the event for an instant 80% refund.",
        },
      ],
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <HelpCircle size={13} />
            <span>Got Questions? We Have Answers</span>
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-300">
            Find instant answers to common questions regarding ticket booking, entry procedures, payments, and cancellations.
          </p>

          {/* Search Bar wrapped in form */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-6 flex max-w-md items-center rounded-xl bg-surface p-1 shadow-lg"
          >
            <Search size={16} className="ml-3 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. refunds, QR code, entry rules..."
              className="w-full bg-transparent px-3 py-2 text-xs text-text outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mr-2 text-xs text-slate-400 hover:text-text"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </section>

      {/* FAQs List */}
      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {faqData.map((section, sIdx) => {
            const Icon = section.icon;
            const filteredItems = section.items.filter(
              (item) =>
                item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={sIdx}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={15} />
                  </div>
                  <h2 className="text-base font-bold text-text">{section.category}</h2>
                </div>

                <div className="space-y-3">
                  {filteredItems.map((item, iIdx) => {
                    const uniqueKey = `${sIdx}-${iIdx}`;
                    const isOpen = openFaq === uniqueKey;

                    return (
                      <div
                        key={uniqueKey}
                        className="overflow-hidden rounded-xl border border-slate-200 bg-surface transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : uniqueKey)}
                          className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-text hover:text-primary transition-colors"
                        >
                          <span>{item.q}</span>
                          <ChevronDown
                            size={16}
                            className={`shrink-0 ml-3 text-slate-400 transition-transform ${
                              isOpen ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="border-t border-slate-100 bg-slate-50/50 p-4 text-xs leading-relaxed text-text-secondary">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
