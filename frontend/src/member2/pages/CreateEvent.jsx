import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import { ArrowLeft, Sparkles, MapPin, CalendarDays, Tag, IndianRupee, Image, FileText, Check, LayoutDashboard, UserRound, Home, Upload, Loader2 } from "lucide-react";
import { CATEGORIES_DATA } from "../../member1/components/EventCategories";
import ThemeToggle from "../../member1/components/ThemeToggle";
import { createEventApi, uploadEventImageApi } from "../../api/apiClient";

const CreateEvent = () => {
  const { addEvent, refreshEvents, authUser } = useAppStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "Music",
    location: "",
    price: "",
    date: "",
    image: "",
    imageFileId: "",
    description: "",
    totalSeats: "100",
  });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const token = localStorage.getItem("token") || authUser?.token;

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!token) {
      setErr("Please log in as Admin/Organizer first to upload images to ImageKit.");
      return;
    }

    try {
      setIsUploadingImage(true);
      setErr("");
      const res = await uploadEventImageApi(file, token);
      if (res?.data?.url) {
        setForm((prev) => ({
          ...prev,
          image: res.data.url,
          imageFileId: res.data.fileId || "",
        }));
      }
    } catch (uploadErr) {
      console.error("Image upload failed:", uploadErr);
      setErr(uploadErr.message || "Failed to upload image to ImageKit CDN. You can still paste an image URL.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.price || !form.date) {
      setErr("Please fill all required fields *");
      return;
    }

    if (!token) {
      setErr("Authentication required: Please log in with an Admin or Organizer account so the event is saved to MongoDB Atlas.");
      return;
    }


    setErr("");
    setIsSubmitting(true);

    const ev = {
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      price: Number(form.price),
      date: form.date,
      totalSeats: Number(form.totalSeats) || 100,
      image: form.image?.trim() || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      imageFileId: form.imageFileId || "",
      description: form.description?.trim() || "New event created from dashboard",
    };

    try {
      const res = await createEventApi(ev, token);
      if (!res?.success) {
        throw new Error(res?.message || "Failed to create event on server");
      }

      addEvent(res.data || ev);
      if (refreshEvents) {
        await refreshEvents();
      }
      setOk(res.data || ev);
      setTimeout(() => navigate("/events"), 1400);
    } catch (apiErr) {
      console.error("Create event error:", apiErr);
      setErr(apiErr.message || "Unable to save event to database. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-130 w-130 rounded-full bg-linear-to-br from-indigo-200/30 via-violet-200/20 to-transparent blur-[80px] animate-pulse" style={{ animationDuration: "7s" }} />
        <div className="absolute top-[25%] right-0 h-105 w-105 rounded-full bg-linear-to-bl from-violet-200/20 via-indigo-100/15 to-transparent blur-[70px]" />
      </div>

      {/* Top bar */}
      <div className="relative border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 py-4 top-0 z-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => navigate("/")} className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"><Home size={14} /> Home</button>
            <button onClick={() => navigate("/profile")} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><UserRound size={14} /> Profile</button>
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-black"><LayoutDashboard size={14} /> Dashboard</button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-slate-900 via-indigo-950 to-violet-900 p-px shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <div className="rounded-[27px] bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 p-7 text-white relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20"><Sparkles size={16} /></span>
                  <span className="text-xs font-bold tracking-widest text-indigo-200">CREATE NEW EVENT</span>
                </div>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Bring your idea to life</h1>
                <p className="mt-1 text-sm text-indigo-100/80 max-w-lg">Add a new event — it will appear on Home, Events and Dashboard instantly. Live preview on the right.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-4 py-2 text-xs font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live preview
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5 lg:items-start">
          {/* Form */}
          <form onSubmit={submit} className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] lg:col-span-3">
            <div className="absolute inset-x-0 top-0 h-0.75 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600" />

            {ok ? (
              <div className="p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 animate-bounce">✓</div>
                <h3 className="mt-4 text-xl font-extrabold text-slate-900">Event Created!</h3>
                <p className="mt-1 text-sm font-medium text-slate-600">{ok.title} • {ok.location} • ₹{ok.price}</p>
                <p className="mt-2 text-xs text-emerald-600 font-semibold animate-pulse">Redirecting to Dashboard...</p>
              </div>
            ) : (
              <div className="p-6 sm:p-7">
                {err && <p className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"><span className="h-2 w-2 rounded-full bg-red-500" /> {err}</p>}

                {!token && (
                  <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 shadow-xs">
                    <div>
                      <span className="font-extrabold text-amber-950">Notice: Authentication Needed</span>
                      <p className="text-amber-800 mt-0.5">Please log in as Admin to save your created events directly into MongoDB Atlas.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="shrink-0 rounded-xl bg-amber-600 px-3.5 py-1.5 font-bold text-white shadow-xs hover:bg-amber-700 transition"
                    >
                      Log In as Admin
                    </button>
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-slate-700"><FileText size={12} className="text-indigo-600" /> Event Title *</label>
                  <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400" placeholder="e.g. Tech Conference 2026" />
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-slate-700"><Tag size={12} className="text-violet-600" /> Select Category *</label>
                  <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
                    {CATEGORIES_DATA.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = form.category === cat.name;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setForm({ ...form, category: cat.name })}
                          className={`group relative flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition-all duration-200 ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/30"
                              : "border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50"
                          } ${cat.bgHover}`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center transition-transform duration-200 group-hover:scale-110">
                            <Icon />
                          </div>
                          <span className={`mt-1.5 text-[11px] font-bold line-clamp-1 ${isSelected ? "text-primary" : "text-slate-700"}`}>
                            {cat.name}
                          </span>
                          {isSelected && (
                            <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white shadow-xs">
                              <Check size={9} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-slate-700"><IndianRupee size={12} className="text-emerald-600" /> Price (₹) *</label>
                    <input type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" placeholder="499" />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-slate-700"><CalendarDays size={12} className="text-indigo-600" /> Date *</label>
                    <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-slate-700"><MapPin size={12} className="text-red-500" /> Location *</label>
                  <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" placeholder="New Delhi" />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-slate-700">
                      <Image size={12} className="text-violet-600" /> Cover Image
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 px-2.5 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 transition shadow-2xs">
                      {isUploadingImage ? (
                        <>
                          <Loader2 size={12} className="animate-spin text-indigo-600" />
                          <span>Uploading to CDN...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={12} className="text-indigo-600" />
                          <span>Upload File (ImageKit)</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={isUploadingImage}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400"
                    placeholder="Upload image above or paste image URL (Unsplash / CDN)..."
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    {form.imageFileId ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <Check size={11} strokeWidth={3} /> Uploaded to ImageKit CDN successfully!
                      </span>
                    ) : (
                      "Supports direct file upload (JPEG/PNG/WebP up to 5MB) or external URL."
                    )}
                  </p>
                </div>


                <div className="mt-4">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-slate-700"><FileText size={12} className="text-slate-500" /> Description</label>
                  <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={4} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400" placeholder="What makes this event special? Who is it for?" />
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(79,70,229,0.35)] transition hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <Sparkles size={14} />
                    )}
                    {isSubmitting ? "Saving to Database..." : "Create Event"}
                  </button>
                  <button type="button" onClick={() => navigate(-1)} className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">Cancel</button>
                </div>
                <p className="mt-3 text-center text-[11px] text-slate-400">Instant — appears on Home, Events & Dashboard right away</p>
              </div>
            )}
          </form>

          {/* Live Preview */}
          <div className="lg:col-span-2 lg:sticky lg:top-22 space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-slate-500"><Sparkles size={12} className="text-indigo-600" /> LIVE PREVIEW</p>
              <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img src={form.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} alt="preview" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <span className="inline-flex rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700">{form.category}</span>
                  <h3 className="mt-2 text-base font-extrabold text-slate-900 line-clamp-1">{form.title || "Your Event Title"}</h3>
                  <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-1"><MapPin size={10} /> {form.location || "Location"}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-1"><CalendarDays size={10} /> {form.date || "Date"}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">{form.description || "Your event description will appear here. Make it exciting!"}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-slate-900">₹{form.price ? Number(form.price).toLocaleString("en-IN") : "—"}</span>
                    <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">Preview</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-slate-400">This is how it will look on Home & Events</p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-sm font-bold text-slate-900">Quick tips</p>
              <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">
                <li>• Use a clear, searchable title</li>
                <li>• Price 0 = Free event</li>
                <li>• High-quality Unsplash cover = more bookings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateEvent;
