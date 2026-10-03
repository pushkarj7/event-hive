import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, User, LayoutDashboard, Ticket, PlusCircle, LogOut } from "lucide-react";
import EventHiveLogo from "./EventHiveLogo";
import { useAppStore } from "../../store/EventContext";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Artists", to: "/artists" },
  { label: "Experiences", to: "/experiences" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery, isAuthenticated, user, logout } = useAppStore();
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 text-sm font-medium ${
      isActive
        ? "font-semibold text-primary"
        : "text-text-secondary hover:text-primary"
    }`;

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?q=${encodeURIComponent(searchQuery.trim())}`);
      closeMobileMenu();
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={closeMobileMenu}
        >
          <EventHiveLogo size={36} showText={true} />
        </Link>

        {/* Navigation Links */}
        <div className="hidden flex-1 items-center justify-center gap-6 xl:flex">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClasses}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden min-w-0 flex-1 max-w-md items-center rounded-xl border border-border bg-background px-3 py-1.5 transition-shadow duration-200 focus-within:border-primary focus-within:shadow-sm lg:flex"
        >
          <Search
            className="h-4 w-4 shrink-0 text-text-secondary mr-2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, artists, concerts..."
            className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-secondary"
            aria-label="Search events, artists, experiences"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Search
          </button>
        </form>

        {/* Authentication area */}
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-text transition-colors hover:text-primary"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-primary-dark"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-xs transition hover:bg-slate-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                  {user?.initial || user?.name?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                  {user?.name || "User"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-12 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl z-50 animate-in fade-in"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || user?.phone || "Member"}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <User size={15} className="text-slate-400" /> My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    <LayoutDashboard size={15} className="text-indigo-600" /> Dashboard
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Ticket size={15} className="text-slate-400" /> My Bookings
                  </Link>
                  <Link
                    to="/create-event"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <PlusCircle size={15} className="text-slate-400" /> Create Event
                  </Link>

                  <div className="my-1 border-t border-slate-100" />
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle Button */}
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-primary/10 xl:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-border bg-surface px-4 py-4 shadow-lg xl:hidden z-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
              {/* Mobile Search */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center rounded-xl border border-border bg-background px-3 py-2 lg:hidden mb-2"
              >
                <Search className="h-4 w-4 shrink-0 text-text-secondary mr-2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, artists..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white"
                >
                  Go
                </button>
              </form>

              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-text hover:bg-background hover:text-primary"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="mt-3 border-t border-border pt-4 sm:hidden">
                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="rounded-lg border border-border px-3 py-2 text-center text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={closeMobileMenu}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-bookings"
                      onClick={closeMobileMenu}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      My Bookings
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                        navigate("/");
                      }}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
