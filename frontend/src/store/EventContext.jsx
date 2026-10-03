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

  const addBooking = (eventId, opts = {}) => {
    const ev = events.find((e) => String(e.id) === String(eventId));
    if (!ev) return null;
    const tickets = opts.tickets || 1;
    const attendee = opts.attendeeName || user.name;
    const nb = {
      id: "#" + String(bookings.length + 1).padStart(3, "0"),
      eventId: ev.id,
      event: ev.title,
      image: ev.image,
      location: ev.location,
      price: ev.price,
      user: attendee,
      attendeeEmail: opts.attendeeEmail || user.email || "",
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      tickets,
      amount: "₹" + (ev.price * tickets).toLocaleString("en-IN"),
      status: "Confirmed",
    };
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
