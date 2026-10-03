import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Event_Hive_Icon.svg";
import { useAppStore } from "../../store/EventContext";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, isAuthenticated, user, logout } = useAppStore();
  const [open, setOpen] = useState(false);
  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 text-sm ${
      isActive
        ? "font-semibold text-primary"
        : "text-text-secondary hover:text-primary"
    }`;
  return (
    <nav className="border-b border-border bg-surface sticky top-0 z-40">
      <div className="mx-auto flex w-full max-w-350px items-center gap-8 px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Event Hive" className="h-8 w-auto" />
          <span className="text-xl font-bold text-text">
            Event <span className="text-primary">Hive</span>
          </span>
        </Link>
        {/* Navigation Links - ORIGINAL, no Dashboard */}
        <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          <NavLink to="/" end className={linkClasses}>Home</NavLink>
          <NavLink to="/events" className={linkClasses}>Events</NavLink>
          <NavLink to="/venues" className={linkClasses}>Venues</NavLink>
          <NavLink to="/artists" className={linkClasses}>Artists</NavLink>
          <NavLink to="/experiences" className={linkClasses}>Experiences</NavLink>
          <NavLink to="/organizers" className={linkClasses}>For Organizers</NavLink>
        </div>
        {/* Inline Search Bar — center */}
        <div className="flex flex-1 bg-background items-center gap-2 rounded-xl border px-3 py-2 mx-4 transition-shadow duration-200 focus-within:shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-4 w-4 shrink-0 text-text-secondary">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/events'); }}
            type="text"
            placeholder="Search events, artists, experiences..."
            className="min-w-0 flex-1 text-sm outline-none text-text bg-background"
          />
          <button onClick={() => navigate('/events')} className="shrink-0 rounded-lg px-4 py-1.5 text-sm text-primary font-medium transition-all duration-200 hover:opacity-90 active:scale-95">Search</button>
        </div>
        {/* Auth area - Log In / Sign Up when logged out, Profile avatar when logged in */}
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hidden rounded-lg px-3 py-2 font-medium text-text transition-colors duration-200 hover:text-primary sm:block">Log In</Link>
            <Link to="/register" className="hidden rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-primary-dark sm:block">Sign Up</Link>
          </>
        ) : (
          <div className="relative hidden sm:block">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">{user.initial}</span>
              <span className="text-sm font-semibold text-slate-900">{user.name}</span>
              <svg className={`h-4 w-4 text-slate-500 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {open && (
              <div className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email || user.phone || user.role}</p>
                </div>
                <hr className="my-1" />
                <button onClick={() => { setOpen(false); navigate("/profile"); }} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">My Profile</button>
                <button onClick={() => { setOpen(false); navigate("/dashboard"); }} className="w-full px-4 py-2 text-left text-sm font-medium text-indigo-600 hover:bg-indigo-50">Dashboard →</button>
                <button onClick={() => { setOpen(false); navigate("/my-bookings"); }} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">My Bookings</button>
                <button onClick={() => { setOpen(false); navigate("/create-event"); }} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50">Create Event</button>
                <hr className="my-1" />
                <button onClick={() => { logout(); setOpen(false); navigate("/"); }} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
