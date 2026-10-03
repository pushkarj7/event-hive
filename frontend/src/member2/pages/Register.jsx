import RegisterForm from "../../member1/components/RegisterForm";
import { Link } from "react-router-dom";
import EventHiveLogo from "../../member1/components/EventHiveLogo";

const Register = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-[80px]" />
        <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-violet-200/30 blur-[80px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-[80px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Left — branding (desktop only) */}
        <div className="hidden w-[46%] flex-col justify-between bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-700 p-12 text-white lg:flex relative overflow-hidden shadow-2xl">
          {/* Ambient background decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-900/40 blur-3xl" />

          {/* Official Event Hive Logo with light text */}
          <div className="relative z-10">
            <Link to="/" className="inline-block transition hover:opacity-90">
              <EventHiveLogo size={42} showText={true} lightText={true} />
            </Link>
          </div>

          <div className="relative z-10 my-auto py-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-md text-indigo-100 mb-4">
              Join India&apos;s Largest Live Platform
            </span>
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
              Join the hive.<br />Create, discover<br />&amp; celebrate.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-indigo-100/90 font-normal">
              Be part of 50 Lakh+ explorers finding their next unforgettable concert, standup show, and weekend festival.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/25">
                Music Tours
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/25">
                Workshops
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/25">
                Live Sports
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/25">
                VIP Experiences
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-indigo-200/80 border-t border-white/15 pt-5">
            <p>© 2026 Event Hive — 50 Lakh+ happy explorers</p>
            <Link to="/help" className="hover:text-white transition">Need help?</Link>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
