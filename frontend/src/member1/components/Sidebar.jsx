import {
  Home, CalendarDays, PlusCircle, Ticket, Users, MessageSquare, BarChart3,
  Settings, Plus, Heart, PanelLeftClose, X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppStore } from "../../store/EventContext";

const NAV_ITEMS = [
  { label: "Dashboard", Icon: Home, path: "/dashboard" },
  { label: "My Events", Icon: CalendarDays, path: "/my-events" },
  { label: "Wishlist", Icon: Heart, path: "/wishlist", badge: "wishlist" },
  { label: "Create Event", Icon: PlusCircle, path: "/create-event" },
  { label: "Bookings", Icon: Ticket, path: "/my-bookings" },
  { label: "Attendees", Icon: Users, path: "/dashboard" },
  { label: "Messages", Icon: MessageSquare, path: "/dashboard", badge: "notifications" },
  { label: "Analytics", Icon: BarChart3, path: "/dashboard" },
  { label: "Settings", Icon: Settings, path: "/profile" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, wishlist, sidebarOpen, setSidebarOpen } = useAppStore();

  const isActive = (path) => location.pathname === path;
  const badgeValue = (kind) =>
    kind === "wishlist" ? (wishlist?.length > 0 ? wishlist.length : null) : notifications;

  // Auto-close the mobile drawer on navigation, otherwise it covers the page.
  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) setSidebarOpen(false);
  }, [location.pathname, setSidebarOpen]);

  const go = (path) => {
    navigate(path);
    if (window.matchMedia("(max-width: 1023px)").matches) setSidebarOpen(false);
  };

  return (
    <>
      {/* Scrim — mobile/tablet only, dims the page while the drawer is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Off-canvas below lg, icon rail vs full panel on desktop */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white transition-[width,transform] duration-300 ease-out ${
          sidebarOpen ? "w-64" : "lg:w-20"
        } w-72 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between gap-2 px-4 lg:px-6">
          <button
            type="button"
            onClick={() => go("/")}
            aria-label="Event Hive home"
            className="cursor-pointer overflow-hidden whitespace-nowrap text-2xl font-bold text-slate-900"
          >
            Event <span className="text-indigo-500">Hive</span>
          </button>

          {/* Close (mobile) / Collapse (desktop) */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Hide sidebar"
            title="Hide sidebar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={18} className="lg:hidden" />
            <PanelLeftClose size={18} className="hidden lg:block" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 lg:px-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ label, Icon, path, badge }) => {
              const active = isActive(path);
              const count = badge ? badgeValue(badge) : null;

              return (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => go(path)}
                    title={label}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-indigo-50 font-semibold text-indigo-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={20} className="shrink-0" />
                      {/* Label collapses with the rail on desktop, always shown on mobile */}
                      <span
                        className={`whitespace-nowrap transition-opacity duration-200 ${
                          sidebarOpen ? "opacity-100" : "lg:opacity-0"
                        }`}
                      >
                        {label}
                      </span>
                    </span>

                    {count ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                        {count}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Promo card */}
        <div
          className={`mx-4 mb-5 shrink-0 overflow-hidden rounded-2xl bg-indigo-100 transition-all duration-300 ${
            sidebarOpen ? "p-4" : "hidden lg:mx-3 lg:block lg:p-2"
          }`}
        >
          <div className={sidebarOpen ? "block" : "hidden lg:hidden"}>
            <h2 className="text-lg font-semibold leading-tight text-slate-900">
              Create Amazing
              <br />
              Events
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Bring people together with Event Hive !
            </p>
          </div>
          <button
            type="button"
            onClick={() => go("/create-event")}
            title="Create Event"
            className={`flex items-center rounded-xl bg-white text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50 ${
              sidebarOpen ? "mt-4 gap-2 px-4 py-2.5" : "lg:mx-auto lg:justify-center lg:p-2.5"
            }`}
          >
            <Plus size={18} className="shrink-0" />
            {sidebarOpen && <span className="whitespace-nowrap">Create Event</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;