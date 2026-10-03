import { CheckCircle2, Clock3, XCircle, Sparkles } from "lucide-react";

const map = {
  Confirmed: { label: "Confirmed", bg: "bg-emerald-500 text-white shadow-emerald-200", ring: "ring-emerald-100", icon: CheckCircle2, dot: "bg-white", sub: "You're all set" },
  Pending:   { label: "Pending",   bg: "bg-amber-400 text-white shadow-amber-100", ring: "ring-amber-100", icon: Clock3, dot: "bg-white", sub: "Awaiting confirmation" },
  Cancelled: { label: "Cancelled", bg: "bg-red-500 text-white shadow-red-100", ring: "ring-red-100", icon: XCircle, dot: "bg-white", sub: "Booking cancelled" },
};

const BookingStatus = ({ status = "Confirmed", size = "md", showSub = false, className = "" }) => {
  const cfg = map[status] || map.Confirmed;
  const Icon = cfg.icon;
  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-extrabold shadow-sm ring-1 ${cfg.bg} ${cfg.ring} ${sizes[size]} ${className}`}>
      <Icon size={14} className="shrink-0" />
      {cfg.label}
      {showSub && <span className="hidden sm:inline font-medium opacity-90">• {cfg.sub}</span>}
      {status === "Confirmed" && <Sparkles size={10} className="opacity-80" />}
    </span>
  );
};

export const BookingStatusDot = ({ status = "Confirmed" }) => {
  const cfg = map[status] || map.Confirmed;
  return <span className={`h-2 w-2 rounded-full ${cfg.bg.split(" ")[0]} animate-pulse`} />;
};

export default BookingStatus;
