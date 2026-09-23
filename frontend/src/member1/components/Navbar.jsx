import { NavLink, Link } from "react-router-dom";
import logo from "../assets/Event_Hive_Logo.svg";

function Navbar() {
  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "font-semibold text-[var(--color-primary)]"
        : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
    }`;

  return (
    <nav className="border-b border-(--color-border) bg-(--color-surface)">
      <div className="flex w-full items-center justify-between px-6 md:px-8 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Event Hive" className="h-12 w-auto object-contain" />
          <span className="text-2xl font-bold text-(--color-text)">
            Event <span className="text-(--color-primary)">Hive</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-7">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>

          <NavLink to="/events" className={linkClasses}>
            Events
          </NavLink>

          <NavLink to="/venues" className={linkClasses}>
            Venues
          </NavLink>

          <NavLink to="/artists" className={linkClasses}>
            Artists
          </NavLink>

          <NavLink to="/experiences" className={linkClasses}>
            Experiences
          </NavLink>

          <NavLink to="/organizers" className={linkClasses}>
            For Organizers
          </NavLink>
        </div>

        {/* Authentication */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 font-medium text-(--color-text) transition-colors duration-200 hover:text-(--color-primary)"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-(--color-primary) px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-(--color-primary-dark)"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;