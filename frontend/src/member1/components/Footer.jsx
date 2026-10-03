import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";
import EventHiveLogo from "./EventHiveLogo";

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XTwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Events", to: "/events" },
    { label: "Artists", to: "/artists" },
    { label: "Experiences", to: "/experiences" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "FAQs", to: "/faqs" },
  ];

  const supportLinks = [
    { label: "Help Center", to: "/help" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Refund Policy", to: "/refund" },
  ];

  const socialLinks = [
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: XTwitterIcon, href: "https://x.com", label: "X" },
    { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: YouTubeIcon, href: "https://youtube.com", label: "YouTube" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#0B0F19] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Brand & Socials Column */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9">
                  <EventHiveLogo size={36} showText={false} />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-white">
                    Event <span className="text-primary">Hive</span>
                  </span>
                  <p className="text-[10px] tracking-widest text-slate-400 uppercase">
                    Discover • Book • Experience
                  </p>
                </div>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              India's premier platform for live concerts, comedy tours, tech conferences, and curated nightlife experiences. Join over 2 Million attendees making every moment count.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-800/80 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Get Tour Alerts
            </h3>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              Subscribe to get secret pre-sale passes, exclusive discount codes, and weekly gig alerts in your city.
            </p>

            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>You're subscribed! Keep an eye on your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-2">
                <div className="flex rounded-xl border border-slate-700 bg-slate-800/90 p-1 focus-within:border-primary">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-1.5 text-xs text-white outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    <Send size={12} />
                    <span>Join</span>
                  </button>
                </div>
                <span className="block text-[11px] text-slate-500">
                  No spam ever. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 Event Hive Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
