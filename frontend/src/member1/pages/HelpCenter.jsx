import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, HelpCircle, Ticket, CreditCard, QrCode, RotateCcw, MessageSquare, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const helpTopics = [
    {
      icon: Ticket,
      title: "Booking & Passes",
      description: "How to book, find your QR e-tickets, transfer tickets, or download PDF passes.",
      link: "/faqs",
    },
    {
      icon: CreditCard,
      title: "Payments & Invoicing",
      description: "UPI failures, card authorization issues, GST invoices, and payment receipts.",
      link: "/faqs",
    },
    {
      icon: RotateCcw,
      title: "Refunds & Cancellations",
      description: "Rules for cancelled shows, rescheduling, refund timelines, and refund protection.",
      link: "/refund",
    },
    {
      icon: QrCode,
      title: "Venue & Entry Guidelines",
      description: "Gate scanning, age restrictions, allowed items, parking, and security protocols.",
      link: "/faqs",
    },
    {
      icon: ShieldCheck,
      title: "Account & Security",
      description: "Updating mobile numbers, password reset, two-factor authentication, and privacy.",
      link: "/privacy",
    },
    {
      icon: MessageSquare,
      title: "Organizer Support",
      description: "Event approvals, attendee check-in app, revenue payouts, and scanner hardware.",
      link: "/for-organisers",
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-linear-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <HelpCircle size={13} />
            <span>24/7 Attendee & Organizer Support</span>
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Event Hive Help Center
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-300">
            Search our knowledge base or pick a topic below for instant assistance with your bookings.
          </p>

          {/* Search Form wrapped in form tag */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-6 flex max-w-md items-center rounded-xl bg-surface p-1 shadow-lg"
          >
            <Search size={16} className="ml-3 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles, e.g. 'refund timeline', 'download ticket'..."
              className="w-full bg-transparent px-3 py-2 text-xs text-text outline-none"
            />
          </form>
        </div>
      </section>

      {/* Help Topics Grid */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <Link
                key={idx}
                to={topic.link}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-text group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary">
                  <span>View Details</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-surface p-8 shadow-xs text-center sm:p-10">
          <h2 className="text-xl font-bold text-text sm:text-2xl">Still Need Help?</h2>
          <p className="mt-2 text-xs text-text-secondary max-w-md mx-auto">
            Our support desk is operational 7 days a week from 9:00 AM to 11:00 PM IST.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark transition-colors"
            >
              <Mail size={14} />
              <span>Contact Support Desk</span>
            </Link>
            <a
              href="tel:18004254483"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-6 py-2.5 text-xs font-semibold text-text hover:bg-slate-50 transition-colors"
            >
              <Phone size={14} className="text-primary" />
              <span>Call Helpline (Toll-Free)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
