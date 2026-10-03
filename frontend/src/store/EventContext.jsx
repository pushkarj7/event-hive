/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { ALL_EVENTS } from "../member1/data/eventsData";
import ToastContainer from "../member1/components/ToastContainer";

const defaultWeekly = [
  { day: "Mon", value: 38 },
  { day: "Tue", value: 46 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 54 },
  { day: "Fri", value: 48 },
  { day: "Sat", value: 66 },
  { day: "Sun", value: 59 },
];

const EventContext = createContext(null);

export const useAppStore = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useAppStore must be inside AppProvider");
  return ctx;
};

export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    try {
      const s = localStorage.getItem("eh_events");
      return s ? JSON.parse(s) : ALL_EVENTS.slice(0, 6);
    } catch {
      return ALL_EVENTS.slice(0, 6);
    }
  });
  const isMockBooking = (b) => {
    if (!b) return true;
    const id = String(b.id || "").toLowerCase();
    const user = String(b.user || "").toLowerCase();
    const event = String(b.event || b.title || "").toLowerCase();
    if (["#001", "#002", "#003", "#004", "1", "2", "3", "4"].includes(id)) return true;
    if (["aman kumar", "priya sharma", "rahul verma", "neha singh"].includes(user)) return true;
    if (event.includes("tech conference") || event.includes("music fest") || event.includes("sports meetup")) return true;
    return false;
  };

  const [bookings, setBookings] = useState(() => {
    try {
      const s = localStorage.getItem("eh_bookings");
      if (s) {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) {
          const realOnly = parsed.filter((b) => !isMockBooking(b));
          localStorage.setItem("eh_bookings", JSON.stringify(realOnly));
          return realOnly;
        }
      }
      return [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const s = localStorage.getItem("eh_wishlist");
      return s ? JSON.parse(s) : ["evt-1", "evt-5"];
    } catch {
      return ["evt-1", "evt-5"];
    }
  });

  // Toast notification state
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Dark / Light Theme state
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("eh_theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("eh_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      showToast(next === "dark" ? "Dark Mode Enabled 🌙" : "Light Mode Enabled ☀️", "info");
      return next;
    });
  };

  // Sidebar visibility — shared by Sidebar and Topbar so either can toggle it.
  // Desktop collapses to an icon rail; mobile/tablet slides it in as a drawer.
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem("eh_sidebar");
      return saved === null ? true : saved === "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("eh_sidebar", String(sidebarOpen));
    } catch {
      /* storage unavailable — keep in-memory state only */
    }
  }, [sidebarOpen]);

  // Close the drawer when the viewport grows to desktop so the layout never
  // keeps an off-canvas sidebar that the desktop grid does not account for.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = (e) => e.matches && setSidebarOpen(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const [weekly] = useState(defaultWeekly);
  const [searchQuery, setSearchQuery] = useState("");

  const [authUser, setAuthUser] = useState(() => {
    try { const s = localStorage.getItem("eh_auth"); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const isAuthenticated = !!authUser;
  const user = authUser || { name: "Vivek Singh", role: "Event Organizer", initial: "V" };
  const notifications = 3;

  const login = (payload) => {
    // Prefer a real name, then the email local-part. A raw phone number is
    // deliberately not used as a name — 10 digits overflow every name slot.
    const explicit = (payload.name || "").trim();
    const fromEmail = payload.email?.split("@")[0]?.trim() || "";
    const raw = explicit || fromEmail || "Event Organizer";
    const name = raw.charAt(0).toUpperCase() + raw.slice(1);
    const u = {
      name,
      role: "Event Organizer",
      initial: name.charAt(0).toUpperCase(),
      email: payload.email || "",
      phone: payload.phone || "",
    };
    setAuthUser(u);
    localStorage.setItem("eh_auth", JSON.stringify(u));
    showToast(`Welcome back, ${u.name}! Logged in successfully ✓`, "success");
    return u;
  };
  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("eh_auth");
    showToast("Logged out successfully", "info");
  };
  const updateProfile = (patch) => {
    const next = { ...authUser, ...patch, initial: (patch.name || authUser.name).charAt(0).toUpperCase() };
    setAuthUser(next);
    localStorage.setItem("eh_auth", JSON.stringify(next));
    showToast("Profile updated successfully ✓", "success");
    return next;
  };

  useEffect(() => { localStorage.setItem("eh_events", JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem("eh_bookings", JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem("eh_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const toggleWishlist = (eventId) => {
    setWishlist((prev) => {
      const idStr = String(eventId);
      const exists = prev.some((id) => String(id) === idStr);
      if (exists) {
        showToast("Removed from Wishlist", "info");
        return prev.filter((id) => String(id) !== idStr);
      } else {
        showToast("Added to your Wishlist! ❤️", "wishlist");
        return [...prev, eventId];
      }
    });
  };

  const removeFromWishlist = (eventId) => {
    setWishlist((prev) => prev.filter((id) => String(id) !== String(eventId)));
    showToast("Removed from Wishlist", "info");
  };

  const isWishlisted = (eventId) => {
    return wishlist.some((id) => String(id) === String(eventId));
  };

  const addEvent = (ev) => {
    // createdByUser separates organizer-created events from the seeded demo
    // catalogue so "My Events" can show only what this user actually made.
    const newEv = {
      id: Date.now(),
      status: "Upcoming",
      rating: 4.5,
      formattedDate: ev.date || "Upcoming",
      city: (ev.location || "").split(",").pop()?.trim() || "India",
      createdByUser: true,
      ...ev,
    };
    setEvents((p) => [newEv, ...p]);
    return newEv;
  };

  // Only events this organizer created — never the seeded ALL_EVENTS catalogue.
  const myEvents = events.filter((e) => e.createdByUser);

  const addBooking = (bookingOrEventId, opts = {}) => {
    let nb;
    if (typeof bookingOrEventId === "object" && bookingOrEventId !== null) {
      const data = bookingOrEventId;
      const t = Number(data.tickets) || 1;
      const p = Number(data.price) || 999;
      const amtStr = typeof data.amount === "number"
        ? `₹${data.amount.toLocaleString("en-IN")}`
        : (data.amount || `₹${(p * t).toLocaleString("en-IN")}`);

      nb = {
        id: data.id || "#" + String(bookings.length + 1).padStart(3, "0"),
        eventId: data.eventId || data.id || Date.now(),
        event: data.event || data.title || data.eventTitle || "Special Event",
        image: data.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        location: data.location || data.venue || "Venue, India",
        price: p,
        user: data.user || data.fullName || user.name,
        attendeeEmail: data.email || data.attendeeEmail || user.email || "",
        attendeePhone: data.phone || data.attendeePhone || user.phone || "",
        date: data.date || data.formattedDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        tickets: t,
        amount: amtStr,
        paymentMethod: data.paymentMethod || "UPI",
        status: "Confirmed",
      };
    } else {
      const ev = events.find((e) => String(e.id) === String(bookingOrEventId)) || {};
      const tickets = opts.tickets || 1;
      const attendee = opts.attendeeName || opts.fullName || user.name;
      const price = ev.price || opts.price || 999;
      nb = {
        id: opts.id || "#" + String(bookings.length + 1).padStart(3, "0"),
        eventId: ev.id || bookingOrEventId,
        event: ev.title || opts.title || "Special Event",
        image: ev.image || opts.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        location: ev.location || opts.location || "Venue, India",
        price,
        user: attendee,
        attendeeEmail: opts.attendeeEmail || opts.email || user.email || "",
        attendeePhone: opts.attendeePhone || opts.phone || user.phone || "",
        date: opts.date || ev.date || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        tickets,
        amount: opts.amount
          ? (typeof opts.amount === "number" ? `₹${opts.amount.toLocaleString("en-IN")}` : opts.amount)
          : `₹${(price * tickets).toLocaleString("en-IN")}`,
        paymentMethod: opts.paymentMethod || "UPI",
        status: "Confirmed",
      };
    }
    setBookings((p) => [nb, ...p]);
    showToast("Ticket booked successfully! Confirmed in My Bookings 🎉", "success");
    return nb;
  };

  const cancelBooking = (id) => {
    setBookings((p) => p.map((b) => b.id === id ? { ...b, status: "Cancelled" } : b));
    showToast("Booking cancelled successfully", "info");
  };

  const filteredEvents = searchQuery.trim() === "" ? events : events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const realBookings = bookings.filter((b) => !isMockBooking(b));

  const filteredBookings = searchQuery.trim() === "" ? realBookings : realBookings.filter((b) =>
    (b.event || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.user || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalEvents: events.length,
    totalBookings: realBookings.length,
    totalAttendees: realBookings.reduce((a, b) => a + (b.tickets || 1), 0),
    totalRevenue: realBookings.reduce((a, b) => a + parseInt(String(b.amount).replace(/[^0-9]/g, "") || 0), 0),
  };

  return (
    <EventContext.Provider value={{
      events, bookings: realBookings, wishlist, toggleWishlist, removeFromWishlist, isWishlisted,
      theme, toggleTheme, toasts, showToast, removeToast,
      sidebarOpen, setSidebarOpen, toggleSidebar: () => setSidebarOpen((p) => !p),
      weekly, searchQuery, setSearchQuery, addEvent, myEvents, addBooking, cancelBooking,
      updateProfile, user, authUser, isAuthenticated, login, logout, notifications,
      stats, filteredEvents, filteredBookings
    }}>
      {children}
      <ToastContainer />
    </EventContext.Provider>
  );
};
