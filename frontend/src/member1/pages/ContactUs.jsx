import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Ticketing & Booking Issue",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <MessageSquare size={13} />
            <span>We're Here to Help</span>
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Get in Touch with Event Hive
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-300">
            Have a question about your booking, venue entry, or hosting a show? Our support team typically responds within 30 minutes.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Contact Details Card */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs">
              <h3 className="text-base font-bold text-text">Customer Support Desk</h3>
              <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                Whether you need ticket re-issuance, refund assistance, or organizer queries, reach out through our official channels.
              </p>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="font-semibold text-text">Email Support</span>
                    <p className="text-text-secondary">support@eventhive.in</p>
                    <p className="text-[11px] text-slate-400">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="font-semibold text-text">Toll-Free Helpline</span>
                    <p className="text-text-secondary">+91 (800) 425-HIVE (4483)</p>
                    <p className="text-[11px] text-slate-400">Mon - Sun: 9:00 AM – 11:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-semibold text-text">Headquarters</span>
                    <p className="text-text-secondary">
                      Hive Tower, 4th Floor, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-xs text-text-secondary">
              <span className="font-bold text-primary block mb-1">⚡ Organizer Hotline</span>
              Hosting an event tonight with an urgent entry query? Use our live organizer emergency bridge in your dashboard or WhatsApp our 24/7 on-call manager.
            </div>
          </div>

          {/* Contact Form wrapped in semantic form tag */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-surface p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-text">Send Us a Direct Message</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Fill in your details below and we will route your ticket to the specialized department.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-50 p-6 text-center text-xs">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-text">Message Received!</h4>
                  <p className="mt-1 text-text-secondary">
                    Thank you, <span className="font-semibold">{formData.name}</span>. A support executive will email you at <span className="font-semibold">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "Ticketing & Booking Issue", message: "" });
                    }}
                    className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-text">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Verma"
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-text outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-text outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text">Inquiry Topic *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-surface px-3 py-2 text-xs text-text outline-none focus:border-primary"
                    >
                      <option value="Ticketing & Booking Issue">Ticketing &amp; Booking Issue</option>
                      <option value="Refund & Cancellation Request">Refund &amp; Cancellation Request</option>
                      <option value="Event Organizer Partnership">Event Organizer Partnership</option>
                      <option value="Artist Verification & Tour Listing">Artist Verification &amp; Tour Listing</option>
                      <option value="Corporate / Bulk Bookings">Corporate / Bulk Bookings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text">Message / Issue Details *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include your Booking Reference ID (e.g. EH-XXXXXX) if this relates to an existing ticket..."
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-text outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark transition-colors"
                  >
                    <Send size={13} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
