import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Ticket,
  QrCode,
  Zap,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  X,
  PartyPopper,
} from "lucide-react";

export default function ForOrganisers() {
  // Revenue Calculator state
  const [ticketPrice, setTicketPrice] = useState(999);
  const [attendees, setAttendees] = useState(1500);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // List Event Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: "",
    category: "Music",
    city: "Mumbai",
    venue: "",
    date: "",
    time: "",
    price: 999,
    vipPrice: 1999,
    capacity: 1000,
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
  });
  const [isPublished, setIsPublished] = useState(false);

  // Calculations
  const grossSales = ticketPrice * attendees;
  const platformFee = Math.round(grossSales * 0.025);
  const netEarnings = grossSales - platformFee;

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublishSubmit = (e) => {
    e.preventDefault();
    setIsPublished(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setIsPublished(false);
  };

  const faqs = [
    {
      q: "When and how do payouts get credited to my bank account?",
      a: "Event Hive processes rapid daily or 48-hour settlements directly to your registered bank account via NEFT/IMPS. For high-volume festivals and trusted partners, same-day advance payouts are also available.",
    },
    {
      q: "How does gate entry and attendee QR code scanning work?",
      a: "Organizers get access to the free Event Hive Scanner app for iOS and Android. Your team can scan digital and printed QR codes in under 0.5 seconds, even with spotty or no internet connection thanks to encrypted offline caching.",
    },
    {
      q: "Can I offer discount codes, group passes, and early-bird tickets?",
      a: "Yes! You can configure tiered pricing (Early Bird, Phase 1, VIP, Backstage), set percentage or flat discount coupon codes, and set limited quantity caps that automatically roll over when sold out.",
    },
    {
      q: "Are free events really 100% free to host on Event Hive?",
      a: "Absolutely. If you are hosting a free community meetup, student workshop, or open mic with ₹0 ticket price, you pay 0% fees. Event Hive is dedicated to supporting cultural communities.",
    },
    {
      q: "What marketing assistance does Event Hive offer for my event?",
      a: "Your event is automatically surfaced across relevant category feeds, city filters, and search. Additionally, we provide featured hero spotlight banners, targeted email announcements, and Instagram promotional pushes for premier shows.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* 1. Hero Section matching Brand Theme & Reference Banner */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-16 text-white sm:py-24">
        {/* Ambient violet & indigo backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/35 via-accent/25 to-transparent opacity-90" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                <Sparkles size={14} />
                <span>The Premier Ticketing & Event Management Platform</span>
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Host Unforgettable Events &amp; Sell Out in Record Time
              </h1>

              <p className="mt-4 text-base text-slate-300 sm:text-lg max-w-2xl leading-relaxed">
                From college fests and mega concerts to tech conferences, comedy tours, and culinary festivals. Publish your event in 2 minutes, reach 2 Million+ passionate attendees, and maximize your revenue with the lowest platform fees.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Ticket size={17} />
                  <span>List Your Event Now</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="#calculator"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <DollarSign size={16} />
                  <span>Calculate Revenue</span>
                </a>
              </div>

              {/* Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Zero upfront setup cost</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>2.5% lowest platform fee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Rapid 48-hr bank payouts</span>
                </div>
              </div>
            </div>

            {/* Right Column: Platform Capabilities Showcase (Official Product Preview) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                      Organizer Platform Suite
                    </span>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
                    Feature Preview
                  </span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {/* Revenue Tracker Simulation */}
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Real-Time Sales Velocity</span>
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                        Live Payout Ready
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-2xl font-black text-white sm:text-3xl">
                        ₹18,45,200
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        +28.4% Sellout Pace
                      </span>
                    </div>
                  </div>

                  {/* Dual Capability Indicators */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3.5">
                      <span className="text-[11px] text-slate-400">Ticket Inventory</span>
                      <p className="mt-1 text-base font-bold text-white">92% Sold Out</p>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-700/60">
                        <div className="h-1.5 w-[92%] rounded-full bg-primary" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/25 p-3.5">
                      <span className="text-[11px] text-slate-400">Smart QR Turnstile</span>
                      <p className="mt-1 text-base font-bold text-white">0.4s Fast Scan</p>
                      <span className="text-[10px] text-emerald-400 font-medium">Offline Cached</span>
                    </div>
                  </div>

                  {/* Security & Payout Assurance */}
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <ShieldCheck size={16} className="text-emerald-400" />
                      <span>Encrypted Anti-Scalp Turnstile</span>
                    </div>
                    <span className="font-semibold text-emerald-400">Protected</span>
                  </div>

                  {/* Quick Action Link */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                    <span className="text-slate-400">Scale your event with Event Hive</span>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="font-semibold text-primary hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>Start Hosting</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip (Matching Reference Image: 10K+ Events, 2M+ Users, 500+ Cities, 4.8 Rating) */}
      <section className="border-y border-slate-200 bg-surface py-8 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 text-center">
            <div>
              <p className="text-2xl font-black text-primary sm:text-3xl lg:text-4xl">
                10K+
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wider text-text-secondary uppercase">
                Events Hosted
              </p>
            </div>

            <div>
              <p className="text-2xl font-black text-primary sm:text-3xl lg:text-4xl">
                2M+
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wider text-text-secondary uppercase">
                Happy Users
              </p>
            </div>

            <div>
              <p className="text-2xl font-black text-primary sm:text-3xl lg:text-4xl">
                500+
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wider text-text-secondary uppercase">
                Cities Covered
              </p>
            </div>

            <div>
              <p className="text-2xl font-black text-primary sm:text-3xl lg:text-4xl">
                4.8 ★
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wider text-text-secondary uppercase">
                Organizer Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Event Hive - 6 Core Features */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            Comprehensive Organizer Toolkit
          </span>
          <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl lg:text-4xl">
            Everything You Need to Run World-Class Events
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Built from the ground up for modern event directors, festival curators, corporate managers, and independent creators.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Ticket size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text">
              Dynamic Tiered Ticketing
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Create General, VIP, Student, Group Passes, and Early-Bird tiers with automated quantity countdowns and custom coupon codes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <QrCode size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text">
              High-Speed QR Entry App
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Check in thousands of attendees seamlessly. Our free scanner app works offline, eliminates entry bottlenecks, and prevents fake tickets.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Zap size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text">
              Lowest Fees & Rapid Payouts
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Keep more of what you earn with our transparent 2.5% platform fee. Receive direct bank settlements within 48 hours or daily rolling transfers.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <TrendingUp size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text">
              2M+ Built-in Audience Reach
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Instant organic discovery! Your event is featured across city guides, category carousels, and search recommendations from day one.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <BarChart3 size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text">
              Live Sales & Traffic Analytics
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Track conversion funnels, buyer demographics, peak purchasing hours, and referral sources with intuitive visual charts.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <ShieldCheck size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text">
              24/7 Dedicated Support
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Get direct phone & WhatsApp access to dedicated event coordinators who assist with on-ground coordination and ticket changes.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Interactive Revenue & Earnings Calculator */}
      <section id="calculator" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-surface p-8 sm:p-12 shadow-md">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Sliders on Left */}
            <div className="lg:col-span-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Transparent Pricing
              </span>
              <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">
                Estimate Your Event Revenue
              </h2>
              <p className="mt-1 text-xs text-text-secondary">
                Slide the parameters below to see your projected earnings and minimal platform fee.
              </p>

              {/* Slider 1: Average Ticket Price */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text uppercase tracking-wider">
                    Average Ticket Price
                  </label>
                  <span className="text-base font-bold text-primary">
                    ₹{ticketPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary"
                />
                <div className="mt-1.5 flex justify-between text-[11px] text-text-secondary">
                  <span>₹100</span>
                  <span>₹2,500</span>
                  <span>₹5,000</span>
                </div>
              </div>

              {/* Slider 2: Expected Attendees */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text uppercase tracking-wider">
                    Expected Attendees / Tickets
                  </label>
                  <span className="text-base font-bold text-primary">
                    {attendees.toLocaleString("en-IN")} tickets
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary"
                />
                <div className="mt-1.5 flex justify-between text-[11px] text-text-secondary">
                  <span>50</span>
                  <span>5,000</span>
                  <span>10,000+</span>
                </div>
              </div>
            </div>

            {/* Calculations Card on Right */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
                <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                  Projected Financials
                </h3>

                <div className="mt-4 space-y-3 border-b border-slate-200 pb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Estimated Gross Ticket Sales:</span>
                    <span className="font-bold text-text">
                      ₹{grossSales.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">
                      Event Hive Platform Fee (2.5%):
                    </span>
                    <span className="font-semibold text-text-secondary">
                      - ₹{platformFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Net Organizer Payout */}
                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-text-secondary">Your Net Take-Home Earnings</span>
                    <p className="text-2xl font-black text-emerald-600 sm:text-3xl">
                      ₹{netEarnings.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                    97.5% Payout
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
                >
                  List This Event &amp; Start Selling
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Plans Comparison */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Clear & Simple
          </span>
          <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">
            Choose Your Publishing Tier
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {/* Plan 1 */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs">
            <div>
              <span className="text-xs font-bold text-text-secondary uppercase">
                Community
              </span>
              <h3 className="mt-1 text-2xl font-black text-text">₹0 Free</h3>
              <p className="mt-1 text-xs text-text-secondary">
                For free meetups, workshops, and student community gatherings.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-text">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Unlimited RSVP Registrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Digital QR Attendee Badges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Basic Check-in Scanner App</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-text hover:border-primary hover:text-primary transition-colors"
            >
              Host Free Event
            </button>
          </div>

          {/* Plan 2: Pro (Featured) */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-primary bg-surface p-6 shadow-md">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-primary uppercase">
                Growth / Pro
              </span>
              <h3 className="mt-1 text-2xl font-black text-text">2.5%</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Per ticket sold. Zero upfront costs, zero monthly subscription fees.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-text">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Everything in Community</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Tiered & VIP Passes with Promo Codes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Rapid 48-hour Bank Settlements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Featured City Discovery Algorithm</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark transition-colors"
            >
              Get Started Now
            </button>
          </div>

          {/* Plan 3 */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs">
            <div>
              <span className="text-xs font-bold text-text-secondary uppercase">
                Enterprise & Festivals
              </span>
              <h3 className="mt-1 text-2xl font-black text-text">Custom</h3>
              <p className="mt-1 text-xs text-text-secondary">
                For stadium concerts, multi-day music festivals, and international summits.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-text">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>On-site turnstiles & RFID wristbands</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Dedicated On-Ground Event Manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Custom Seat Map Reservation System</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-text hover:border-primary hover:text-primary transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Got Questions?
          </span>
          <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-slate-200 bg-surface transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-text hover:text-primary transition-colors"
              >
                <span className="text-sm">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4 text-xs leading-relaxed text-text-secondary">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom CTA Banner (Matching Reference Banner: Make Every Moment Count) */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 sm:p-12 text-white shadow-xl">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
              Make Every Moment Count
            </h2>
            <p className="mt-2 text-sm text-indigo-100 sm:text-base">
              Host your next big event with Event Hive and connect with millions of excited fans.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-primary shadow-sm hover:bg-slate-100 transition-colors"
              >
                List Your Event →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive "List Your Event" Wizard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-base font-bold text-text">
                  {isPublished ? "Event Submitted!" : "List Your Event on Event Hive"}
                </h3>
                {!isPublished && (
                  <p className="text-xs text-text-secondary">
                    Step {step} of 3 • Basic event details & ticketing
                  </p>
                )}
              </div>
              <button
                onClick={resetModal}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            {isPublished ? (
              /* Success / Event Published Confirmation */
              <div className="p-8 text-center sm:p-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
                  <PartyPopper size={32} />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-text">
                  Event Submitted for Verification! 🎉
                </h3>
                <p className="mt-2 text-xs text-text-secondary max-w-md mx-auto">
                  Congratulations, <span className="font-semibold text-text">{eventData.organizerName}</span>! Your event{" "}
                  <span className="font-semibold text-text">"{eventData.title}"</span> has been scheduled and our publishing team will activate the ticket sale page within 2 hours.
                </p>

                <div className="mx-auto mt-6 max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Category:</span>
                    <span className="font-semibold text-text">{eventData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">City & Venue:</span>
                    <span className="font-semibold text-text">{eventData.venue}, {eventData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Ticket Starting:</span>
                    <span className="font-semibold text-primary">₹{eventData.price}</span>
                  </div>
                </div>

                <button
                  onClick={resetModal}
                  className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark"
                >
                  Done & Back to Portal
                </button>
              </div>
            ) : (
              /* Multi-step form */
              <form onSubmit={step === 3 ? handlePublishSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
                <div className="p-6 space-y-4">
                  {step === 1 && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-text">
                          Event Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          value={eventData.title}
                          onChange={handleInputChange}
                          placeholder="e.g. Neon Horizon Music Festival 2026"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-text">
                            Category *
                          </label>
                          <select
                            name="category"
                            value={eventData.category}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm text-text outline-none focus:border-primary"
                          >
                            <option value="Music">Music</option>
                            <option value="Tech">Tech</option>
                            <option value="Food">Food</option>
                            <option value="Sports">Sports</option>
                            <option value="Arts">Arts</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Theatre">Theatre</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-text">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={eventData.city}
                            onChange={handleInputChange}
                            placeholder="e.g. Mumbai"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text">
                          Venue Location *
                        </label>
                        <input
                          type="text"
                          name="venue"
                          required
                          value={eventData.venue}
                          onChange={handleInputChange}
                          placeholder="e.g. Jio World Convention Centre"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                        />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-text">
                            Event Date *
                          </label>
                          <input
                            type="date"
                            name="date"
                            required
                            value={eventData.date}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text">
                            Start Time *
                          </label>
                          <input
                            type="time"
                            name="time"
                            required
                            value={eventData.time}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-text">
                            General Ticket Price (₹) *
                          </label>
                          <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            value={eventData.price}
                            onChange={handleInputChange}
                            placeholder="999"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text">
                            VIP Pass Price (₹)
                          </label>
                          <input
                            type="number"
                            name="vipPrice"
                            min="0"
                            value={eventData.vipPrice}
                            onChange={handleInputChange}
                            placeholder="1999"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text">
                          Total Ticket Capacity
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          value={eventData.capacity}
                          onChange={handleInputChange}
                          placeholder="1000"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                        />
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-text">
                          Organizer / Organization Name *
                        </label>
                        <input
                          type="text"
                          name="organizerName"
                          required
                          value={eventData.organizerName}
                          onChange={handleInputChange}
                          placeholder="e.g. Hive Entertainment Pvt Ltd"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text">
                          Official Contact Email *
                        </label>
                        <input
                          type="email"
                          name="organizerEmail"
                          required
                          value={eventData.organizerEmail}
                          onChange={handleInputChange}
                          placeholder="organizer@events.com"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text">
                          Phone Number (for Payout Verification) *
                        </label>
                        <input
                          type="tel"
                          name="organizerPhone"
                          required
                          value={eventData.organizerPhone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text outline-none focus:border-primary"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="rounded-lg border border-slate-200 bg-surface px-4 py-2 text-xs font-semibold text-text hover:bg-slate-100"
                    >
                      Back
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark transition-colors"
                  >
                    {step === 3 ? "Publish Event →" : "Continue"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
