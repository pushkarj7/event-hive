import { NavLink, Link } from "react-router-dom";
import logo from "../assets/Event_Hive_Icon.svg";

function Navbar() {
  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 text-sm ${
      isActive
        ? "font-semibold text-primary"
        : "text-text-secondary hover:text-primary"
    }`;
  return (
    <nav className="border-b border-border bg-surface sticky ">
      <div className="mx-auto flex  w-full max-w-350px items-center gap-8 px-6 py-4">
        {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Event Hive" className="h-8 w-auto" />
          <span className="text-xl font-bold text-text">
            Event <span className="text-primary">Hive</span>
          </span>
        </Link>
           {/* Navigation Links */}
        <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          <NavLink to="/" end className={linkClasses}>Home</NavLink>
          <NavLink to="/events" className={linkClasses}>Events</NavLink>
          <NavLink to="/venues" className={linkClasses}>Venues</NavLink>
          <NavLink to="/artists" className={linkClasses}>Artists</NavLink>
          <NavLink to="/experiences" className={linkClasses}>Experiences</NavLink>
          <NavLink to="/organizers" className={linkClasses}>For Organizers</NavLink>
        </div>
        {/* Inline Search Bar — center */}
        <div
          className="flex flex-1  bg-background items-center gap-2 rounded-xl border px-3 py-2 mx-4 transition-shadow duration-200 focus-within:shadow-md"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4 shrink-0 text-text-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            />
          </svg>
          {/* Input */}
          <input
            type="text"
            placeholder="Search events, artists, experiences..."
            className="min-w-0 flex-1  text-sm outline-none text-text bg-background"
          />
          {/* Search Button */}
          <button
            className="shrink-0 rounded-lg px-4 py-1.5 text-sm  text-primary font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            Search
          </button>
        </div>
        {/* Authentication */}
          <Link
            to="/login"
            className="hidden rounded-lg px-3 py-2  font-medium text-text transition-colors duration-200 hover:text-primary sm:block"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className=" hidden rounded-lg  bg-primary px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-primary-dark sm:block" >
            Sign Up
          </Link>
        </div>
    </nav>
  );
}

export default Navbar;