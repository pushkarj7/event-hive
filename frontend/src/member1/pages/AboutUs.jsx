import { Link } from "react-router-dom";
import { Sparkles, Heart, ShieldCheck, Trophy, ArrowRight, Compass } from "lucide-react";
import EventHiveLogo from "../components/EventHiveLogo";

export default function AboutUs() {
  const milestones = [
    { year: "2023", title: "Inception & First 100 Gigs", desc: "Started with indie music fests and collegiate cultural competitions across Delhi and Mumbai." },
    { year: "2024", title: "Pan-India Expansion", desc: "Expanded to 25+ tier-1 and tier-2 cities, serving over 500,000 live concert enthusiasts." },
    { year: "2025", title: "Anti-Scalp QR Inventions", desc: "Introduced military-grade offline cryptographic ticket check-in preventing fake passes." },
    { year: "2026", title: "2 Million+ Strong Community", desc: "India's fastest-growing destination for live music, comedy specials, and curated nightlife." },
  ];

  const values = [
    { icon: Heart, title: "Fans First, Always", desc: "Transparent pricing without deceptive last-minute booking fees. What you see is what you pay." },
    { icon: ShieldCheck, title: "100% Guaranteed Entry", desc: "Every barcode is cryptographically backed. Say goodbye to black-market duplicate passes." },
    { icon: Trophy, title: "Empowering Local Creators", desc: "We give independent musicians, standup comics, and theatre troupes 97.5% net ticket revenue." },
    { icon: Compass, title: "Seamless Discovery", desc: "Curated recommendations based on actual genre preferences, not just highest advertising bidders." },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex justify-center mb-4">
            <EventHiveLogo size={48} showText={false} />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <Sparkles size={13} />
            <span>Our Mission & Story</span>
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Making Every Live Moment Count
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Event Hive was born out of a simple conviction: live experiences have the power to transform lives, forge lifelong bonds, and shape cultural movements.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">What Drives Event Hive</h2>
          <p className="mt-2 text-xs text-text-secondary">
            Built by die-hard music fans, tech pioneers, and event curators.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold text-text">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-text sm:text-3xl">Our Journey So Far</h2>
        <div className="mt-10 space-y-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex gap-4 sm:gap-6 rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs">
              <span className="font-mono text-xl sm:text-2xl font-black text-primary shrink-0 w-16">
                {m.year}
              </span>
              <div>
                <h3 className="text-base font-bold text-text">{m.title}</h3>
                <p className="mt-1 text-xs text-text-secondary leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Community CTA */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-accent p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl font-black sm:text-3xl">Ready to Experience Live Culture?</h2>
          <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-indigo-100">
            Join 2M+ fans exploring stadium concerts, intimate gigs, and festivals every weekend.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-primary shadow-sm hover:bg-slate-100 transition-colors"
            >
              <span>Explore Live Events</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
