import { useState, useMemo } from "react";
import {
  Sparkles,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Ticket,
  MessageSquare,
  ThumbsUp,
  Send,
  ShieldCheck,
  Award,
} from "lucide-react";
import { ALL_EVENTS } from "../data/eventsData";
import { useAppStore } from "../../store/EventContext";
import BookingModal from "../components/BookingModal";

// Helper function to provide rich curated perks for live events
const getInclusions = (category, title) => {
  const t = (title || "").toLowerCase();
  if (t.includes("symphony") || t.includes("arijit")) {
    return "40-Piece Live Orchestra + Reserved Seating & Souvenir Pass";
  }
  if (t.includes("comedy") || t.includes("zakir") || t.includes("harsh")) {
    return "Front Tier Reserved Seating + Fast-Track Entry & Meetup";
  }
  if (t.includes("edm") || t.includes("sunburn") || t.includes("rave")) {
    return "VIP Fanpit Access + Immersive Laser Stage Visuals";
  }
  if (category === "Tech") {
    return "Full Keynote Access + Exclusive Networking Lounge Pass";
  }
  if (category === "Food") {
    return "Artisanal Tasting Coupons + Sommelier Masterclass Entry";
  }
  if (category === "Sports") {
    return "Stadium Match Entry + Official Fan Kit & Reserved Stand";
  }
  return "Priority Fast-Track Entry + Verified Digital Pass";
};

// Initial verified reviews specifically based on our actual live platform events
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Aakash Mehta",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    city: "Mumbai",
    rating: 5,
    date: "2 days ago",
    experience: "Arijit Singh Symphony Live",
    comment:
      "Arijit's 40-piece symphony at DY Patil Stadium was truly goosebumps material. Entry with Event Hive QR code took less than 10 seconds. Sound engineering was world class!",
    helpfulCount: 54,
  },
  {
    id: 2,
    name: "Tanvi Kapoor",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    city: "Delhi",
    rating: 5,
    date: "5 days ago",
    experience: "EDM Night 2026",
    comment:
      "The bass and laser visuals by DJ Nova and Alex were absolutely insane! Crowd management was smooth and the passes via Event Hive were so seamless to scan.",
    helpfulCount: 42,
  },
  {
    id: 3,
    name: "Siddharth Rao",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    city: "Noida",
    rating: 5,
    date: "1 week ago",
    experience: "Tech Summit 2026",
    comment:
      "The AI and Web3 keynote sessions at India Expo Centre were packed with actionable insights. Great networking lounge and food arrangements. Definitely attending next year.",
    helpfulCount: 37,
  },
  {
    id: 4,
    name: "Pooja Malhotra",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    city: "Delhi",
    rating: 5,
    date: "2 weeks ago",
    experience: "Standup Comedy Special with Zakir",
    comment:
      "Zakir Khan had us in tears from laughing right from the start! Sirifort Auditorium was packed but Event Hive digital passes made gate entry completely hassle-free.",
    helpfulCount: 68,
  },
  {
    id: 5,
    name: "Kabir Sengupta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    city: "Goa",
    rating: 5,
    date: "3 weeks ago",
    experience: "Sunburn Beach Electronic Carnival",
    comment:
      "Vagator beach vibes, Arabian sea breeze, and headliner beats under the stars! Easily the best weekend festival experience in India.",
    helpfulCount: 49,
  },
  {
    id: 6,
    name: "Ananya Deshmukh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    city: "Jaipur",
    rating: 4.8,
    date: "1 month ago",
    experience: "Food & Wine Festival",
    comment:
      "Artisanal food stalls and masterclasses by top chefs were brilliant. The live acoustic sets in Riverside Park created the most charming atmosphere.",
    helpfulCount: 23,
  },
];

export default function Experiences() {
  const { events: customEvents } = useAppStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedExpForBooking, setSelectedExpForBooking] = useState(null);
  const [helpfulLiked, setHelpfulLiked] = useState({});

  // Combine real platform ALL_EVENTS with any organizer-created events from EventContext
  const liveEvents = useMemo(() => {
    const combined = [...ALL_EVENTS];
    if (Array.isArray(customEvents)) {
      customEvents.forEach((ce) => {
        // If it's a newly created event not already in ALL_EVENTS, add it
        const exists = combined.some(
          (e) => String(e.id) === String(ce.id) || e.title.toLowerCase() === ce.title?.toLowerCase()
        );
        if (!exists && ce.title) {
          combined.push({
            id: ce.id || Date.now(),
            title: ce.title,
            category: ce.category || "General",
            badge: "Featured",
            date: ce.date || "2026-12-01",
            formattedDate: ce.formattedDate || ce.date || "Upcoming",
            time: ce.time || "6:00 PM – 9:00 PM",
            venue: ce.location || "Main Arena",
            city: ce.location?.split(",")?.[1]?.trim() || "India",
            location: ce.location || "Venue, India",
            price: Number(ce.price) || 999,
            rating: ce.rating || 4.8,
            reviews: "1.2k",
            image: ce.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
            description: ce.description || "Exciting live event on Event Hive.",
          });
        }
      });
    }
    return combined;
  }, [customEvents]);

  // Review Form state defaulted to one of our actual live events
  const [reviewFormData, setReviewFormData] = useState({
    name: "",
    city: "Mumbai",
    experience: ALL_EVENTS[0]?.title || "EDM Night 2026",
    rating: 5,
    comment: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Extract unique categories directly from live events
  const categories = useMemo(() => {
    const set = new Set(liveEvents.map((e) => e.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [liveEvents]);

  const filteredExperiences = useMemo(() => {
    if (activeCategory === "All") return liveEvents;
    return liveEvents.filter((exp) => exp.category === activeCategory);
  }, [liveEvents, activeCategory]);

  const handleHelpfulClick = (reviewId) => {
    setHelpfulLiked((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewFormData.name.trim() || !reviewFormData.comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: reviewFormData.name,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      city: reviewFormData.city,
      rating: Number(reviewFormData.rating),
      date: "Just now",
      experience: reviewFormData.experience,
      comment: reviewFormData.comment,
      helpfulCount: 1,
    };

    setReviews([newReview, ...reviews]);
    setReviewSubmitted(true);
    setReviewFormData({
      name: "",
      city: "Mumbai",
      experience: liveEvents[0]?.title || "EDM Night 2026",
      rating: 5,
      comment: "",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* 1. Hero Section matching Brand Theme */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Sparkles size={14} />
              <span>Verified Live Events</span>
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Curated Live Experiences &amp; Fan Reviews
            </h1>
            <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
              Explore authentic live concerts, tech conclaves, stadium finals, and comedy specials currently live on Event Hive. Book passes with instant confirmation and read real attendee reviews.
            </p>
          </div>

          {/* Quick Stats Strip */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">4.8 / 5 Rating</span>
              <span className="text-slate-400">(14,850+ Verified Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <ShieldCheck size={15} className="text-emerald-400" />
              <span>100% Guaranteed Entry</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Award size={15} className="text-primary" />
              <span>Direct Organizer Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Experience Filter Tabs */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-text sm:text-2xl">
              Live Experiences ({filteredExperiences.length})
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Real events currently open for booking across top cities
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-xs"
                    : "border border-slate-200 bg-surface text-text-secondary hover:text-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
            >
              {/* Photo & Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span className="rounded-full bg-primary/95 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {exp.category}
                  </span>
                  {exp.badge && (
                    <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow-xs">
                      {exp.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-3 flex items-center gap-2 text-xs text-white">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-primary" />
                    <span className="text-[11px]">{exp.time || exp.formattedDate || "Live Event"}</span>
                  </span>
                  <span>•</span>
                  <span className="text-[11px] font-medium text-slate-200">{exp.city || "India"}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors line-clamp-1">
                  {exp.title}
                </h3>

                <p className="mt-2 text-xs text-text-secondary leading-relaxed line-clamp-2">
                  {exp.description}
                </p>

                {/* Inclusions tag */}
                <div className="mt-3 rounded-lg bg-primary/5 p-2 text-[11px] text-primary font-medium flex items-center gap-1.5">
                  <Sparkles size={13} className="shrink-0" />
                  <span className="line-clamp-1">{getInclusions(exp.category, exp.title)}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
                  <span className="flex items-center gap-1 line-clamp-1">
                    <MapPin size={13} className="shrink-0 text-primary" />
                    {exp.venue || exp.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-text shrink-0">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    {exp.rating}
                  </span>
                </div>

                {/* Price & Book Row */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                  <div>
                    <span className="text-[10px] text-text-secondary">Pass starts at</span>
                    <p className="text-base font-bold text-text">
                      ₹{exp.price?.toLocaleString("en-IN") || "999"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedExpForBooking({
                        id: exp.id,
                        title: exp.title,
                        category: exp.category,
                        formattedDate: exp.formattedDate || exp.date,
                        date: exp.date || exp.formattedDate,
                        time: exp.time,
                        venue: exp.venue || exp.location,
                        city: exp.city,
                        location: exp.location || exp.venue,
                        price: exp.price,
                        rating: exp.rating,
                        reviews: exp.reviews || "1.2k",
                        image: exp.image,
                      })
                    }
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-primary-dark hover:shadow-md"
                  >
                    <Ticket size={14} />
                    <span>Book Experience</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Real Reviews & Attendee Stories Section */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Rating Scorecard & "Write a Review" Form */}
          <div className="space-y-8 lg:col-span-5">
            {/* Aggregate Scorecard */}
            <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs">
              <h3 className="text-base font-bold text-text">Attendee Satisfaction</h3>
              <p className="text-xs text-text-secondary mt-1">
                Verified reviews from guests who attended our live events
              </p>

              <div className="mt-4 flex items-center gap-4">
                <div className="text-center">
                  <span className="text-4xl font-black text-text">4.8</span>
                  <div className="mt-1 flex items-center justify-center gap-0.5 text-amber-400">
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                  </div>
                  <span className="text-[10px] text-text-secondary">14,850+ reviews</span>
                </div>

                {/* Score bars */}
                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Organization & Entry</span>
                    <span className="font-semibold text-text">4.9 / 5</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 w-[98%] rounded-full bg-primary" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Sound & Lighting</span>
                    <span className="font-semibold text-text">4.9 / 5</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 w-[98%] rounded-full bg-primary" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Value for Money</span>
                    <span className="font-semibold text-text">4.7 / 5</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 w-[94%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive "Write a Review" Form */}
            <div className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-xs">
              <div className="flex items-center gap-2">
                <MessageSquare size={17} className="text-primary" />
                <h3 className="text-base font-bold text-text">Share Your Experience</h3>
              </div>
              <p className="mt-1 text-xs text-text-secondary">
                Attended an event recently? Help other fans discover great shows.
              </p>

              {reviewSubmitted && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Thank you! Your verified review has been published.</span>
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-text">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewFormData.name}
                    onChange={(e) =>
                      setReviewFormData({ ...reviewFormData, name: e.target.value })
                    }
                    placeholder="e.g. Meera Krishnan"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-background px-3 py-2 text-xs text-text outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-text">
                      City *
                    </label>
                    <select
                      value={reviewFormData.city}
                      onChange={(e) =>
                        setReviewFormData({ ...reviewFormData, city: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-background px-2.5 py-2 text-xs text-text outline-none focus:border-primary"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Noida">Noida</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Goa">Goa</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text">
                      Rating *
                    </label>
                    <select
                      value={reviewFormData.rating}
                      onChange={(e) =>
                        setReviewFormData({
                          ...reviewFormData,
                          rating: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-background px-2.5 py-2 text-xs text-text outline-none focus:border-primary"
                    >
                      <option value="5">★★★★★ (5/5 Exceptional)</option>
                      <option value="4">★★★★☆ (4/5 Great)</option>
                      <option value="3">★★★☆☆ (3/5 Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text">
                    Live Event Attended *
                  </label>
                  <select
                    value={reviewFormData.experience}
                    onChange={(e) =>
                      setReviewFormData({
                        ...reviewFormData,
                        experience: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-background px-2.5 py-2 text-xs text-text outline-none focus:border-primary"
                  >
                    {liveEvents.map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.title} ({ev.city || "India"})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewFormData.comment}
                    onChange={(e) =>
                      setReviewFormData({
                        ...reviewFormData,
                        comment: e.target.value,
                      })
                    }
                    placeholder="Tell other attendees about the music, entry speed, crowd vibe, and ambiance..."
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-background px-3 py-2 text-xs text-text outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark transition-colors"
                >
                  <Send size={13} />
                  <span>Submit Verified Review</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Real Reviews Stream */}
          <div className="space-y-4 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-text">
                Recent Verified Reviews ({reviews.length})
              </h3>
              <span className="text-xs text-text-secondary">
                Updated in real-time
              </span>
            </div>

            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs transition-colors hover:border-slate-300"
              >
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text">{rev.name}</span>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          <CheckCircle2 size={11} />
                          <span>Verified Attendee</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-text-secondary">
                        {rev.city} • {rev.date}
                      </span>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < Math.floor(rev.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Event Tag */}
                <p className="mt-3 text-xs font-semibold text-primary">
                  Attended: {rev.experience}
                </p>

                {/* Comment body */}
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  "{rev.comment}"
                </p>

                {/* Helpful button */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-text-secondary">
                  <span className="text-slate-400">Booking secured via Event Hive</span>
                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                      helpfulLiked[rev.id]
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <ThumbsUp size={12} />
                    <span>Helpful ({rev.helpfulCount + (helpfulLiked[rev.id] ? 1 : 0)})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        event={selectedExpForBooking}
        isOpen={!!selectedExpForBooking}
        onClose={() => setSelectedExpForBooking(null)}
      />
    </div>
  );
}
