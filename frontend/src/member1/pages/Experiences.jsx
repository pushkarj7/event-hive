import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Star,
  CheckCircle2,
  Ticket,
  MessageSquare,
  ThumbsUp,
  Send,
  ShieldCheck,
  Award,
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Music,
  Laptop,
  Smile,
  Trophy,
  Utensils,
  Layers,
} from "lucide-react";
import { ALL_EVENTS } from "../data/eventsData";
import { useAppStore } from "../../store/EventContext";
import BookingModal from "../components/BookingModal";

// Initial verified reviews categorized by actual live platform events
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Aakash Mehta",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    city: "Mumbai",
    category: "Music",
    eventId: "evt-5",
    rating: 5,
    date: "2 days ago",
    timestamp: 1,
    experience: "Arijit Singh Symphony Live",
    comment:
      "Arijit's 40-piece symphony at DY Patil Stadium was truly goosebumps material. Entry with Event Hive QR code took less than 10 seconds. Sound engineering was world class and seating was super comfortable!",
    helpfulCount: 54,
  },
  {
    id: 2,
    name: "Tanvi Kapoor",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    city: "Delhi",
    category: "Music",
    eventId: "evt-1",
    rating: 5,
    date: "5 days ago",
    timestamp: 2,
    experience: "EDM Night 2026",
    comment:
      "The bass, lasers, and stage visuals by DJ Nova and Alex were absolutely insane! Crowd management was smooth and the digital passes via Event Hive made entry totally frictionless.",
    helpfulCount: 42,
  },
  {
    id: 3,
    name: "Siddharth Rao",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    city: "Noida",
    category: "Tech",
    eventId: "evt-2",
    rating: 5,
    date: "1 week ago",
    timestamp: 3,
    experience: "Tech Summit 2026",
    comment:
      "The AI and Web3 keynote sessions at India Expo Centre were packed with actionable insights. Great networking lounge and catering arrangements. Definitely attending next year!",
    helpfulCount: 37,
  },
  {
    id: 4,
    name: "Pooja Malhotra",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    city: "Delhi",
    category: "Arts",
    eventId: "evt-6",
    rating: 5,
    date: "2 weeks ago",
    timestamp: 4,
    experience: "Standup Comedy Special with Zakir",
    comment:
      "Zakir Khan had us in tears from laughing right from the start! Sirifort Auditorium was packed to capacity but Event Hive digital passes made gate entry completely hassle-free.",
    helpfulCount: 68,
  },
  {
    id: 5,
    name: "Kabir Sengupta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    city: "Goa",
    category: "Music",
    eventId: "evt-8",
    rating: 5,
    date: "2 weeks ago",
    timestamp: 5,
    experience: "Sunburn Beach Electronic Carnival",
    comment:
      "Vagator beach vibes, Arabian sea breeze, and headliner beats under the stars! Easily the best weekend festival experience in India. Can't wait for the next edition.",
    helpfulCount: 49,
  },
  {
    id: 6,
    name: "Rishi Sen",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    city: "Kolkata",
    category: "Sports",
    eventId: "evt-4",
    rating: 5,
    date: "3 weeks ago",
    timestamp: 6,
    experience: "Cricket League Finals",
    comment:
      "Nothing beats the thunderous roar of 65,000 fans at Eden Gardens! Digital tickets loaded instantly on my phone, security check was super fast, and the last-over thriller was pure euphoria.",
    helpfulCount: 62,
  },
  {
    id: 7,
    name: "Ananya Deshmukh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    city: "Jaipur",
    category: "Food",
    eventId: "evt-3",
    rating: 4.9,
    date: "1 month ago",
    timestamp: 7,
    experience: "Food & Wine Festival",
    comment:
      "Artisanal culinary stalls and sommelier masterclasses were brilliant. The live acoustic sets along Riverside Park during sunset created the most idyllic, magical weekend.",
    helpfulCount: 23,
  },
  {
    id: 8,
    name: "Arjun Nambiar",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    city: "Bengaluru",
    category: "Tech",
    eventId: "evt-9",
    rating: 4.8,
    date: "1 month ago",
    timestamp: 8,
    experience: "AI & Robotics Developer Conclave",
    comment:
      "Hands-on humanoid robotics showcase and live agent architecture demos at BIEC were truly futuristic. The hackathon mentoring and developer perks were top value.",
    helpfulCount: 28,
  },
  {
    id: 9,
    name: "Kunal Bansal",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    city: "Goa",
    category: "Arts",
    eventId: "evt-12",
    rating: 5,
    date: "1 month ago",
    timestamp: 9,
    experience: "Harsh Gujral - Jo Bolta Hai Wohi Hota Hai",
    comment:
      "Harsh's spontaneous crowd interaction was legendary. Never laughed this hard in my life. Smooth seating at Kala Academy and crisp audio quality throughout the 2 hours.",
    helpfulCount: 35,
  },
  {
    id: 10,
    name: "Sunita Deshpande",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80",
    city: "Pune",
    category: "Arts",
    eventId: "evt-15",
    rating: 5,
    date: "1 month ago",
    timestamp: 10,
    experience: "Mughal-E-Azam The Musical",
    comment:
      "A magnificent theatrical spectacle! The 350+ Kathak dancers, live classical singing, and Manish Malhotra's royal costumes took our breath away. Proud Indian theatre.",
    helpfulCount: 45,
  },
  {
    id: 11,
    name: "Meera Nair",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    city: "Mumbai",
    category: "Music",
    eventId: "evt-14",
    rating: 5,
    date: "2 months ago",
    timestamp: 11,
    experience: "Prateek Kuhad - Silhouettes Acoustic Tour",
    comment:
      "Royal Opera House was the ideal intimate venue for Prateek's acoustic set. 'Kasoor' and 'Cold/Mess' played live with string accompaniment had everyone singing along.",
    helpfulCount: 31,
  },
  {
    id: 12,
    name: "Rohan Vats",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    city: "Mumbai",
    category: "Music",
    eventId: "evt-10",
    rating: 5,
    date: "2 months ago",
    timestamp: 12,
    experience: "Sunidhi Chauhan - I Am Home World Tour",
    comment:
      "Sunidhi's vocal power is in a league of its own! 2.5 hours of pure non-stop energy, fireworks, and dazzling production. Event Hive entry lines were super fast.",
    helpfulCount: 27,
  },
];

const categoryIcons = {
  All: Layers,
  Music: Music,
  Tech: Laptop,
  Arts: Smile,
  Sports: Trophy,
  Food: Utensils,
};

export default function Experiences() {
  const { events: customEvents } = useAppStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("helpful"); // 'helpful' | 'newest' | 'rating'
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [helpfulLiked, setHelpfulLiked] = useState({});
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);

  // Combine platform events with custom events
  const liveEvents = useMemo(() => {
    const combined = [...ALL_EVENTS];
    if (Array.isArray(customEvents)) {
      customEvents.forEach((ce) => {
        const exists = combined.some(
          (e) => String(e.id) === String(ce.id) || e.title.toLowerCase() === ce.title?.toLowerCase()
        );
        if (!exists && ce.title) {
          combined.push({
            id: ce.id || Date.now(),
            title: ce.title,
            category: ce.category || "General",
            date: ce.date || "2026-12-01",
            formattedDate: ce.formattedDate || ce.date || "Upcoming",
            location: ce.location || "Venue, India",
            venue: ce.location || "Main Arena",
            city: ce.location?.split(",")?.[1]?.trim() || "India",
            price: Number(ce.price) || 999,
            rating: ce.rating || 4.8,
            image: ce.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
            description: ce.description || "Live event on Event Hive",
          });
        }
      });
    }
    return combined;
  }, [customEvents]);

  // Review Form state
  const [reviewFormData, setReviewFormData] = useState({
    name: "",
    city: "Mumbai",
    experience: ALL_EVENTS[0]?.title || "EDM Night 2026",
    rating: 5,
    comment: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Available categories list
  const categories = ["All", "Music", "Tech", "Arts", "Sports", "Food"];

  // Category review counts
  const categoryCounts = useMemo(() => {
    const counts = { All: reviews.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = reviews.filter((r) => r.category === cat).length;
      }
    });
    return counts;
  }, [reviews]);

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((r) => r.category === activeCategory);
    }

    // Filter by Search Keyword
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      result = result.filter(
        (r) =>
          r.experience.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q)
      );
    }

    // Sort reviews
    if (sortBy === "helpful") {
      result.sort((a, b) => {
        const hA = a.helpfulCount + (helpfulLiked[a.id] ? 1 : 0);
        const hB = b.helpfulCount + (helpfulLiked[b.id] ? 1 : 0);
        return hB - hA;
      });
    } else if (sortBy === "newest") {
      result.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [reviews, activeCategory, searchKeyword, sortBy, helpfulLiked]);

  const handleHelpfulClick = (reviewId) => {
    setHelpfulLiked((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewFormData.name.trim() || !reviewFormData.comment.trim()) return;

    // Find category from selected event
    const matchedEv = liveEvents.find((e) => e.title === reviewFormData.experience);
    const category = matchedEv?.category || "Music";

    const newReview = {
      id: Date.now(),
      name: reviewFormData.name,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      city: reviewFormData.city,
      category,
      eventId: matchedEv?.id || "evt-1",
      rating: Number(reviewFormData.rating),
      date: "Just now",
      timestamp: 0, // newest
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
    <div className="min-h-screen bg-background pb-20 font-sans">
      {/* 1. Header / Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0E1A] py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-transparent opacity-85" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Sparkles size={14} />
              <span>Verified Attendee Experiences</span>
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Fan Reviews &amp; Experiences
            </h1>
            <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
              Real stories and honest ratings from verified fans who attended live concerts, tech conclaves, comedy specials, and stadium events across India.
            </p>
          </div>

          {/* Quick Stats Strip */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">4.8 / 5 Overall Rating</span>
              <span className="text-slate-400">({reviews.length}+ Curated Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <ShieldCheck size={15} className="text-emerald-400" />
              <span>100% Verified Ticket Holders</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Award size={15} className="text-primary" />
              <span>Authentic Live Feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Filter & Search Bar */}
      <section className="sticky top-16 z-30 border-b border-slate-200/80 bg-surface/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const IconComponent = categoryIcons[cat] || Layers;
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-primary text-white shadow-sm ring-2 ring-primary/20"
                        : "border border-slate-200 bg-background text-text-secondary hover:border-slate-300 hover:text-text"
                    }`}
                  >
                    <IconComponent size={14} className={isSelected ? "text-white" : "text-primary"} />
                    <span>{cat}</span>
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isSelected
                          ? "bg-white/25 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
              {/* Search input */}
              <div className="relative flex-1 sm:w-64 sm:flex-none">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search reviews or events..."
                  className="w-full rounded-full border border-slate-200 bg-background py-1.5 pl-8 pr-7 text-xs text-text placeholder:text-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-text"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-background px-3 py-1.5 text-xs text-text">
                <SlidersHorizontal size={13} className="text-primary" />
                <span className="text-[11px] text-text-secondary font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-text outline-none cursor-pointer"
                >
                  <option value="helpful">Most Helpful</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rating (5★)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content: Reviews Grid & Left Sidebar */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Satisfaction Stats & Write a Review Form */}
          <div className="space-y-6 lg:col-span-4">
            {/* Scorecard */}
            <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs">
              <h3 className="text-sm font-bold text-text">Attendee Satisfaction</h3>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Ratings aggregated across all verified bookings
              </p>

              <div className="mt-4 flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="text-center">
                  <span className="text-3xl font-black text-text">4.8</span>
                  <div className="mt-1 flex items-center justify-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-text-secondary">Overall Score</span>
                </div>

                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">Sound &amp; Audio</span>
                    <span className="font-bold text-text">4.9 / 5</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 w-[98%] rounded-full bg-primary" />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">Entry Speed &amp; QR</span>
                    <span className="font-bold text-text">4.9 / 5</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 w-[98%] rounded-full bg-primary" />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">Value for Money</span>
                    <span className="font-bold text-text">4.7 / 5</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 w-[94%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>

              {/* Category Quick Filter Pills */}
              <div className="mt-3">
                <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                  Browse By Category
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                        activeCategory === c
                          ? "bg-primary text-white font-bold"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {c} ({categoryCounts[c]})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive "Write a Review" Form */}
            <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                <h3 className="text-sm font-bold text-text">Share Your Experience</h3>
              </div>
              <p className="mt-0.5 text-xs text-text-secondary">
                Attended an event recently? Help other fans discover great shows.
              </p>

              {reviewSubmitted && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Thank you! Your verified review has been published.</span>
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="mt-3.5 space-y-3">
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

                <div className="grid grid-cols-2 gap-2.5">
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
                      <option value="5">★★★★★ (5/5)</option>
                      <option value="4">★★★★☆ (4/5)</option>
                      <option value="3">★★★☆☆ (3/5)</option>
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
                        [{ev.category || "Event"}] {ev.title} ({ev.city || "India"})
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
                    placeholder="Tell other attendees about the music, entry speed, crowd vibe, and sound..."
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

          {/* Right Column: All Reviews Stream */}
          <div className="space-y-4 lg:col-span-8">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-base font-bold text-text">
                  {activeCategory === "All"
                    ? "All Attendee Reviews"
                    : `${activeCategory} Reviews`}
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Showing {filteredReviews.length} verified reviews
                  {searchKeyword ? ` matching "${searchKeyword}"` : ""}
                </p>
              </div>

              {activeCategory !== "All" && (
                <button
                  onClick={() => setActiveCategory("All")}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Show All Reviews
                </button>
              )}
            </div>

            {/* Empty state */}
            {filteredReviews.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Filter size={20} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-text">No reviews found</h3>
                <p className="mt-1 text-xs text-text-secondary">
                  No attendee reviews match your current filters.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchKeyword("");
                  }}
                  className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Review Cards */}
            <div className="space-y-4">
              {filteredReviews.map((rev) => {
                // Find event matching this review
                const matchedEvent = liveEvents.find(
                  (e) => e.title === rev.experience || e.id === rev.eventId
                );

                return (
                  <div
                    key={rev.id}
                    className="group rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md"
                  >
                    {/* Top Row: Author & Rating */}
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
                            size={14}
                            className={
                              i < Math.floor(rev.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Event Tag Chip with Category */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {rev.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        Attended: {rev.experience}
                      </span>
                    </div>

                    {/* Comment body */}
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                      "{rev.comment}"
                    </p>

                    {/* Bottom Action Bar */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-text-secondary">
                      {/* Helpful Button */}
                      <button
                        type="button"
                        onClick={() => handleHelpfulClick(rev.id)}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-colors ${
                          helpfulLiked[rev.id]
                            ? "bg-primary/10 text-primary font-bold"
                            : "hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        <ThumbsUp size={13} />
                        <span>Helpful ({rev.helpfulCount + (helpfulLiked[rev.id] ? 1 : 0)})</span>
                      </button>

                      {/* Event link or Book button */}
                      {matchedEvent ? (
                        <button
                          type="button"
                          onClick={() => setSelectedEventForBooking(matchedEvent)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary shadow-xs"
                        >
                          <Ticket size={13} />
                          <span>Book Passes for this Event →</span>
                        </button>
                      ) : (
                        <Link
                          to={`/events?q=${encodeURIComponent(rev.experience)}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          <span>View Similar Events →</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal in case attendee clicks "Book Passes for this Event" */}
      {selectedEventForBooking && (
        <BookingModal
          event={selectedEventForBooking}
          isOpen={!!selectedEventForBooking}
          onClose={() => setSelectedEventForBooking(null)}
        />
      )}
    </div>
  );
}
