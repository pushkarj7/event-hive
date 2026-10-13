
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import { useState } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, notifications, user, sidebarOpen, setSidebarOpen } = useAppStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-3 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
      {/* Show/hide the sidebar on every breakpoint */}
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
        aria-expanded={sidebarOpen}
        title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
      >
        <Menu size={20} />
      </button>

      <div className="relative w-full max-w-xl">
        <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 sm:left-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events, bookings..."
          className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:h-11 sm:pl-11"
        />
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-5 lg:gap-6">
        {/* Theme Toggle in Dashboard */}
        <ThemeToggle />

        <button onClick={() => navigate("/dashboard")} className="relative text-slate-600 transition hover:text-indigo-600">
          <Bell size={22} />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">{notifications}</span>
        </button>
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">{user.initial}</div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <ChevronDown size={18} className="text-slate-500" />
          </button>
          {open && (
            <div className="absolute right-0 top-12 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
              <button onClick={() => { setOpen(false); navigate("/profile"); }} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">Profile</button>
              <button onClick={() => { setOpen(false); navigate("/my-bookings"); }} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">My Bookings</button>
              <button onClick={() => { setOpen(false); navigate("/dashboard"); }} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">Dashboard</button>
              <hr className="my-1" />
              <button onClick={() => { localStorage.clear(); setOpen(false); navigate("/login"); }} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Topbar;
