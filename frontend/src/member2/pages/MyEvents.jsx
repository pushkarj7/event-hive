import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays, MapPin, IndianRupee, LayoutDashboard, PlusCircle,
  Sparkles, Ticket, Users, Home, ImageOff, Trash2, Edit3, X,
  AlertTriangle, Shield,

} from "lucide-react";
import { useAppStore } from "../../store/EventContext";
import Sidebar from "../../member1/components/Sidebar";
import { updateEventApi, deleteEventApi } from "../../api/apiClient";
import { CATEGORIES_DATA } from "../../member1/components/EventCategories";

export default function MyEvents() {
  const navigate = useNavigate();
  const { myEvents, events, authUser, showToast, refreshEvents, setEvents } = useAppStore();

  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editError, setEditError] = useState("");

  const token = localStorage.getItem("token") || authUser?.token;
  const isAdmin = authUser?.role === "admin";


  // If user is Admin or has created events, show them. Otherwise fallback to all available events
  const displayedEvents = (myEvents && myEvents.length > 0) ? myEvents : events;
  const totalRevenue = displayedEvents.reduce((sum, e) => sum + (Number(e.price) || 0), 0);

  // Handle Event Update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingEvent.title?.trim() || !editingEvent.location?.trim()) {
      setEditError("Title and location are required.");
      return;
    }

    if (!token) {
      setEditError("You must be logged in as Admin to update events. Please log in first.");
      return;
    }

    setIsUpdating(true);
    setEditError("");

    try {
      const updates = {
        title: editingEvent.title.trim(),
        category: editingEvent.category,
        location: editingEvent.location.trim(),
        price: Number(editingEvent.price) || 0,
        totalSeats: Number(editingEvent.totalSeats) || 100,
        description: editingEvent.description?.trim() || "",
        status: editingEvent.status || "upcoming",
      };

      if (editingEvent.date) {
        updates.date = editingEvent.date;
      }
      if (editingEvent.image) {
        updates.image = editingEvent.image.trim();
      }

      const targetId = editingEvent._id || editingEvent.id;
      const res = await updateEventApi(targetId, updates, token);
      if (!res?.success) {
        throw new Error(res?.message || "Failed to update event.");
      }

      showToast("Event updated successfully in MongoDB! ✨", "success");
      setEditingEvent(null);
      if (refreshEvents) {
        await refreshEvents();
      }
    } catch (err) {
      console.error("Update event error:", err);
      setEditError(err.message || "Failed to update event. Please check permissions.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Event Delete
  const handleDeleteConfirm = async () => {
    if (!deletingEvent) return;

    if (!token) {
      showToast("You must be logged in as Admin to delete events.", "error");
      return;
    }

    setIsDeleting(true);

    try {
      const targetId = deletingEvent._id || deletingEvent.id;
      const res = await deleteEventApi(targetId, token);
      if (!res?.success) {
        throw new Error(res?.message || "Failed to delete event.");
      }

      showToast("Event deleted successfully from MongoDB!", "info");
      setDeletingEvent(null);

      // Instantly remove from local state
      setEvents((prev) => prev.filter((e) => String(e._id || e.id) !== String(targetId)));
      if (refreshEvents) {
        await refreshEvents();
      }
    } catch (err) {
      console.error("Delete event error:", err);
      showToast(err.message || "Could not delete event.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="transition-[margin] duration-300 ease-out ml-0 lg:ml-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Organizer Dashboard
                </span>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-extrabold text-indigo-700">
                    <Shield size={12} /> Admin Mode (All Events)
                  </span>
                )}
              </div>
              <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md">
                  <CalendarDays size={18} />
                </span>
                My Events
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                {isAdmin
                  ? "Manage, edit, or delete any event across the entire platform."
                  : "Manage the events you have created."}
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <button
                onClick={() => navigate("/create-event")}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:from-indigo-700 hover:to-violet-700 sm:flex-none"
              >
                <PlusCircle size={16} /> Create Event
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:flex-none"
              >
                <LayoutDashboard size={15} /> Dashboard
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Active Events", value: displayedEvents.length, Icon: Ticket, tone: "text-indigo-600 bg-indigo-50" },
              { label: "Total Value", value: `₹${totalRevenue.toLocaleString("en-IN")}`, Icon: IndianRupee, tone: "text-emerald-600 bg-emerald-50" },
              { label: "Categories", value: new Set(displayedEvents.map((e) => e.category)).size, Icon: Sparkles, tone: "text-amber-600 bg-amber-50" },
            ].map(({ label, value, Icon, tone }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>
                    <Icon size={14} />
                  </span>
                  {label}
                </div>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {displayedEvents.length === 0 ? (
            <div className="mt-8 rounded-[28px] border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200">
                <ImageOff size={24} className="text-slate-400" />
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-slate-900">No events found</h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Create an event to see it here and manage it in your organizer dashboard.
              </p>
              <button
                onClick={() => navigate("/create-event")}
                className="mt-6 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:from-indigo-700 hover:to-violet-700"
              >
                <PlusCircle size={16} className="mr-1.5 inline" />
                Create your first event
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {event.category || "General"}
                    </span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <CalendarDays size={13} className="text-primary" />
                      {event.formattedDate || event.date || "Upcoming"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-primary">
                      {event.title}
                    </h3>

                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={13} className="shrink-0 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                      {event.description || "No description provided."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] text-slate-500">Ticket price</span>
                        <p className="text-base font-extrabold text-slate-900">
                          ₹{Number(event.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Management Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingEvent({ ...event })}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-slate-300"
                        >
                          <Edit3 size={13} className="text-indigo-600" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingEvent(event)}
                          className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100 shadow-xs"
                          title="Delete Event"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/event/${event.id}`)}
                          className="inline-flex items-center justify-center rounded-xl bg-slate-900 p-2 text-white shadow-xs transition hover:bg-black"
                          title="View Live Page"
                        >
                          <Users size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <Home size={14} /> Back to Home
          </button>
        </div>
      </main>

      {/* 1. Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Edit3 size={16} />
                </span>
                <h3 className="text-lg font-bold text-slate-900">Edit Event</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {editError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                {editError}
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  value={editingEvent.title || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingEvent.category || "Music"}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 bg-white"
                  >
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingEvent.status || "upcoming"}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 bg-white"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    value={editingEvent.price ?? ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, price: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Seats</label>
                  <input
                    type="number"
                    min="1"
                    value={editingEvent.totalSeats || 100}
                    onChange={(e) => setEditingEvent({ ...editingEvent, totalSeats: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location *</label>
                <input
                  type="text"
                  value={editingEvent.location || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingEvent.image || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingEvent.description || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700 disabled:opacity-60 transition"
                >
                  {isUpdating ? "Saving to MongoDB..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Delete Confirmation Modal */}
      {deletingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={28} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Delete Event?</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Are you sure you want to permanently delete <strong className="text-slate-800">"{deletingEvent.title}"</strong>?
              This will remove it completely from MongoDB Atlas.
            </p>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 disabled:opacity-60 transition"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                type="button"
                onClick={() => setDeletingEvent(null)}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}