import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, MapPin, Star, Sparkles } from "lucide-react";

export default function HomeCta() {
  const stats = [
    {
      icon: Calendar,
      value: "10K+",
      label: "Events",
    },
    {
      icon: Users,
      value: "2M+",
      label: "Happy Users",
    },
    {
      icon: MapPin,
      value: "500+",
      label: "Cities",
    },
    {
      icon: Star,
      value: "4.8",
      label: "User Rating",
    },
  ];

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#4338CA] px-6 py-10 shadow-2xl sm:px-10 md:py-12 lg:px-14">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200 backdrop-blur-md">
                <Sparkles size={13} className="text-yellow-400" />
                <span>Join India's Largest Event Community</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Make Every Moment Count
              </h2>

              <p className="mt-2.5 text-sm leading-6 text-indigo-100 sm:text-base">
                Host your event with Event Hive and reach thousands of passionate people looking for unique experiences.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  to="/for-organisers"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl"
                >
                  <span>List Your Event</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                >
                  Explore Events
                </Link>
              </div>
            </div>

            {/* Right: Stats Grid & Stylized Tag */}
            <div className="flex flex-col items-center gap-6 lg:items-end">
              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 lg:gap-3.5 xl:grid-cols-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-center backdrop-blur-md transition-all hover:bg-white/15 sm:px-5"
                    >
                      <div className="mb-1 flex items-center gap-1.5 text-white">
                        <Icon size={16} className="text-indigo-300" />
                        <span className="text-lg font-bold sm:text-xl">{stat.value}</span>
                      </div>
                      <span className="text-xs font-medium text-indigo-200">{stat.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Stylized Creative Motto */}
              <div className="hidden rounded-full border border-indigo-400/20 bg-indigo-900/40 px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-200 backdrop-blur sm:flex items-center gap-2">
                <span>Create</span>
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>Share</span>
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>Belong</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
