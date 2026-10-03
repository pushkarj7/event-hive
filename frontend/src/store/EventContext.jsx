/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { initialEvents, initialBookings, weeklyBookings as defaultWeekly } from "../data/mockData";

const EventContext = createContext(null);

export const useAppStore = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useAppStore must be inside AppProvider");
  return ctx;
};

export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    try { const s = localStorage.getItem("eh_events"); return s ? JSON.parse(s) : initialEvents; } catch { return initialEvents; }
  });
  const [bookings, setBookings] = useState(() => {
    try { const s = localStorage.getItem("eh_bookings"); return s ? JSON.parse(s) : initialBookings; } catch { return initialBookings; }
  });
  const [weekly] = useState(defaultWeekly);
  const [searchQuery, setSearchQuery] = useState("");

  const [authUser, setAuthUser] = useState(() => {
    try { const s = localStorage.getItem("eh_auth"); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const isAuthenticated = !!authUser;
  const user = authUser || { name: "Vivek Singh", role: "Event Organizer", initial: "V" };
  const notifications = 3;

  const login = (payload) => {
    const name = payload.name || payload.email?.split("@")[0] || payload.phone || "Vivek Singh";
    const u = { name: name.charAt(0).toUpperCase() + name.slice(1), role: "Event Organizer", initial: name.charAt(0).toUpperCase(), email: payload.email || "", phone: payload.phone || "" };
    setAuthUser(u);
    localStorage.setItem("eh_auth", JSON.stringify(u));
    return u;
  };
  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("eh_auth");
  };
  const updateProfile = (patch) => {
    const next = { ...authUser, ...patch, initial: (patch.name || authUser.name).charAt(0).toUpperCase() };
    setAuthUser(next);
    localStorage.setItem("eh_auth", JSON.stringify(next));
    return next;
  };

  useEffect(() => { localStorage.setItem("eh_events", JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem("eh_bookings", JSON.stringify(bookings)); }, [bookings]);

  const addEvent = (ev) => {
    const newEv = { id: Date.now(), status: "Upcoming", rating: 4.5, ...ev };
    setEvents((p) => [newEv, ...p]);
    return newEv;
  };

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
    return nb;
  };

  const cancelBooking = (id) => {
    setBookings((p) => p.map((b) => b.id === id ? { ...b, status: "Cancelled" } : b));
  };

  const filteredEvents = searchQuery.trim() === "" ? events : events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = searchQuery.trim() === "" ? bookings : bookings.filter((b) =>
    b.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalEvents: events.length,
    totalBookings: bookings.length,
    totalAttendees: bookings.reduce((a, b) => a + (b.tickets || 1), 0) + 1276,
    totalRevenue: bookings.reduce((a, b) => a + parseInt(String(b.amount).replace(/[^0-9]/g, "") || 0), 0) + 124580 - 10800,
  };

  return (
    <EventContext.Provider value={{ events, bookings, weekly, searchQuery, setSearchQuery, addEvent, addBooking, cancelBooking, updateProfile, user, authUser, isAuthenticated, login, logout, notifications, stats, filteredEvents, filteredBookings }}>
      {children}
    </EventContext.Provider>
  );
};
