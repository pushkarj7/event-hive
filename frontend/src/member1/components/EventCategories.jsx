import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "../data/eventsData";

// `eventCategory` maps a browse tile onto a real `ALL_EVENTS.category` value.
// Tiles without one (Workshops, Kids, More, ...) are not filterable yet and
// navigate to the full listing instead of a category that has no data.
const EVENT_CATEGORY_BY_ID = CATEGORIES.reduce((acc, cat) => {
  if (cat.id !== "all") acc[cat.id] = cat.label;
  return acc;
}, {});

// 3D-styled custom vibrant SVG icons matching the Event Hive design kit
function MusicIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="musicGrad" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818CF8" />
          <stop offset="0.5" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <filter id="musicGlow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d="M18 36c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.32 0 2.535.426 3.522 1.147L16 12l22-5v19.147C36.98 25.426 35.765 25 34.445 25c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6V6L18 11.5v24.5z"
        fill="url(#musicGrad)"
      />
      <circle cx="12" cy="36" r="4" fill="#C7D2FE" opacity="0.6" />
      <circle cx="34" cy="31" r="4" fill="#DDD6FE" opacity="0.6" />
      <path d="M18 11.5L40 6v4L18 15.5v-4z" fill="#A5B4FC" />
    </svg>
  );
}

function ComedyIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="comedyHead" cx="35%" cy="30%" r="65%">
          <stop stopColor="#FDE047" />
          <stop offset="0.7" stopColor="#EAB308" />
          <stop offset="1" stopColor="#CA8A04" />
        </radialGradient>
        <linearGradient id="comedySmile" x1="16" y1="26" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#991B1B" />
          <stop offset="1" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#comedyHead)" />
      <ellipse cx="17" cy="18" rx="2.5" ry="3.5" fill="#78350F" />
      <ellipse cx="31" cy="18" rx="2.5" ry="3.5" fill="#78350F" />
      <circle cx="16" cy="16.5" r="1" fill="#FFFFFF" />
      <circle cx="30" cy="16.5" r="1" fill="#FFFFFF" />
      <path d="M14 13c1.5-1.5 4-1.5 5.5 0" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M28.5 13c1.5-1.5 4-1.5 5.5 0" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M15 25c1.5 7 16.5 7 18 0"
        stroke="url(#comedySmile)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#991B1B"
      />
      <path d="M18 25h12c0 2-2.5 4.5-6 4.5S18 27 18 25z" fill="#FFFFFF" />
      <ellipse cx="11" cy="24" rx="2" ry="1.5" fill="#F87171" opacity="0.7" />
      <ellipse cx="37" cy="24" rx="2" ry="1.5" fill="#F87171" opacity="0.7" />
    </svg>
  );
}

function TheatreIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="theatreBlue" x1="8" y1="10" x2="30" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.6" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="theatrePurple" x1="20" y1="12" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="0.7" stopColor="#7E22CE" />
          <stop offset="1" stopColor="#581C87" />
        </linearGradient>
      </defs>
      {/* Back Mask (Purple/Tragedy) */}
      <g transform="translate(14, 6) scale(0.75)">
        <rect x="6" y="4" width="26" height="34" rx="13" fill="url(#theatrePurple)" />
        <ellipse cx="14" cy="17" rx="2.5" ry="3.5" fill="#FFFFFF" />
        <ellipse cx="24" cy="17" rx="2.5" ry="3.5" fill="#FFFFFF" />
        <path d="M14 30c2.5-3 8-3 10 0" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Front Mask (Blue/Comedy) */}
      <rect x="6" y="10" width="26" height="32" rx="13" fill="url(#theatreBlue)" />
      <path d="M12 18c.5-1.5 2-2 3.5-1.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 18c.5-1.5 2-2 3.5-1.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="14" cy="22" rx="2.5" ry="3" fill="#0C4A6E" />
      <ellipse cx="24" cy="22" rx="2.5" ry="3" fill="#0C4A6E" />
      <path
        d="M13 29c2 4 10 4 12 0"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="#0C4A6E"
      />
    </svg>
  );
}

function SportsIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="soccerBall" cx="35%" cy="30%" r="65%">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.7" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#94A3B8" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#soccerBall)" />
      {/* Center Pentagram */}
      <polygon points="24,17 30,22 28,29 20,29 18,22" fill="#1E293B" />
      {/* Surrounding Patches */}
      <polygon points="24,6 20,10 28,10" fill="#334155" />
      <polygon points="38,15 36,22 41,20" fill="#334155" />
      <polygon points="34,36 33,30 38,32" fill="#334155" />
      <polygon points="14,36 15,30 10,32" fill="#334155" />
      <polygon points="10,15 12,22 7,20" fill="#334155" />
      {/* Connecting Seam Lines */}
      <line x1="24" y1="17" x2="24" y2="10" stroke="#64748B" strokeWidth="1.2" />
      <line x1="30" y1="22" x2="36" y2="22" stroke="#64748B" strokeWidth="1.2" />
      <line x1="28" y1="29" x2="33" y2="30" stroke="#64748B" strokeWidth="1.2" />
      <line x1="20" y1="29" x2="15" y2="30" stroke="#64748B" strokeWidth="1.2" />
      <line x1="18" y1="22" x2="12" y2="22" stroke="#64748B" strokeWidth="1.2" />
    </svg>
  );
}

function WorkshopsIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="easelWood" x1="10" y1="8" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="canvasGrad" x1="12" y1="10" x2="36" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F1F5F9" />
        </linearGradient>
      </defs>
      {/* Easel Legs */}
      <line x1="24" y1="6" x2="12" y2="42" stroke="url(#easelWood)" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="6" x2="36" y2="42" stroke="url(#easelWood)" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="6" x2="24" y2="42" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="30" x2="38" y2="30" stroke="url(#easelWood)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Canvas */}
      <rect x="13" y="10" width="22" height="18" rx="2" fill="url(#canvasGrad)" stroke="#CBD5E1" strokeWidth="1" />
      {/* Paint strokes on canvas */}
      <circle cx="19" cy="17" r="3" fill="#EC4899" />
      <circle cx="27" cy="18" r="3.5" fill="#3B82F6" />
      <circle cx="23" cy="23" r="2.5" fill="#10B981" />
      <path d="M16 23c2-1 6 3 8 0" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FestivalsIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="tentRed" x1="10" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="tentGold" x1="12" y1="14" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="1" stopColor="#EAB308" />
        </linearGradient>
      </defs>
      {/* Tent Flag */}
      <path d="M24 4v8h6l-6-8z" fill="#EF4444" />
      <line x1="24" y1="4" x2="24" y2="12" stroke="#78350F" strokeWidth="2" />
      {/* Tent Body */}
      <path d="M24 12L7 38h34L24 12z" fill="#FFFFFF" />
      {/* Striped Canopy */}
      <path d="M24 12L17 38h7L24 12z" fill="url(#tentRed)" />
      <path d="M24 12L31 38h-7L24 12z" fill="url(#tentRed)" />
      <path d="M24 12L7 38h5L24 12z" fill="url(#tentGold)" />
      <path d="M24 12L41 38h-5L24 12z" fill="url(#tentGold)" />
      {/* Tent Entrance */}
      <path d="M21 38a3 3 0 0 1 6 0z" fill="#450A0A" />
      {/* Base Scallop */}
      <path d="M7 38q3 3 6 0t6 0t6 0t6 0t6 0t4 0" stroke="#EAB308" strokeWidth="2" fill="none" />
    </svg>
  );
}

function FoodDrinksIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="cupGrad" x1="24" y1="18" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="1" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="popcornGrad" x1="8" y1="18" x2="26" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
      </defs>
      {/* Popcorn Tub */}
      <path d="M10 22l3 18h12l3-18H10z" fill="url(#popcornGrad)" />
      <path d="M13 22l1 18h3l-1-18h-3zm6 0l0 18h3l0-18h-3z" fill="#FFFFFF" />
      {/* Popcorn Pieces */}
      <circle cx="12" cy="19" r="3.5" fill="#FEF08A" />
      <circle cx="16" cy="16" r="4" fill="#FDE047" />
      <circle cx="21" cy="15" r="3.5" fill="#FEF08A" />
      <circle cx="25" cy="18" r="4" fill="#FDE047" />
      <circle cx="18" cy="20" r="3" fill="#CA8A04" />
      {/* Beverage Cup */}
      <path d="M28 24l2 16h10l2-16H28z" fill="url(#cupGrad)" />
      <ellipse cx="35" cy="24" rx="7" ry="2" fill="#FDA4AF" />
      {/* Straw */}
      <line x1="35" y1="24" x2="40" y2="10" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="10" x2="43" y2="13" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ArtsCultureIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="starGold" cx="35%" cy="30%" r="65%">
          <stop stopColor="#FDE047" />
          <stop offset="0.6" stopColor="#EAB308" />
          <stop offset="1" stopColor="#B45309" />
        </radialGradient>
        <linearGradient id="starRibbon" x1="16" y1="28" x2="32" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="1" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      {/* Ribbons */}
      <path d="M19 28l-5 14 8-4 4 4-2-14z" fill="url(#starRibbon)" />
      <path d="M29 28l5 14-8-4-4 4 2-14z" fill="#B91C1C" />
      {/* 3D Gold Star */}
      <polygon
        points="24,8 28.5,17 38.5,18.5 31,25.5 33,35.5 24,30.5 15,35.5 17,25.5 9.5,18.5 19.5,17"
        fill="url(#starGold)"
        stroke="#CA8A04"
        strokeWidth="1"
      />
      <polygon points="24,8 28.5,17 24,30.5 19.5,17" fill="#FEF08A" opacity="0.6" />
      <polygon points="24,8 38.5,18.5 24,30.5" fill="#D97706" opacity="0.25" />
    </svg>
  );
}

function KidsIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="kidFace" cx="40%" cy="35%" r="60%">
          <stop stopColor="#FED7AA" />
          <stop offset="0.8" stopColor="#FDBA74" />
          <stop offset="1" stopColor="#FB923C" />
        </radialGradient>
        <linearGradient id="capBlue" x1="14" y1="8" x2="34" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* Face */}
      <circle cx="24" cy="27" r="14" fill="url(#kidFace)" />
      {/* Cap */}
      <path d="M12 24c0-7 5.5-13 12-13s12 6 12 13H12z" fill="url(#capBlue)" />
      <path d="M22 17c5-1 14 0 17 3.5-3 1.5-12 1.5-17-3.5z" fill="#0369A1" />
      <circle cx="24" cy="11" r="2" fill="#F59E0B" />
      {/* Eyes */}
      <circle cx="19" cy="26" r="2" fill="#451A03" />
      <circle cx="29" cy="26" r="2" fill="#451A03" />
      <circle cx="18.5" cy="25.5" r="0.6" fill="#FFFFFF" />
      <circle cx="28.5" cy="25.5" r="0.6" fill="#FFFFFF" />
      {/* Cheeks */}
      <ellipse cx="16" cy="30" rx="2" ry="1.2" fill="#F43F5E" opacity="0.6" />
      <ellipse cx="32" cy="30" rx="2" ry="1.2" fill="#F43F5E" opacity="0.6" />
      {/* Smile */}
      <path d="M20 31c1.5 2.5 6.5 2.5 8 0" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TechBusinessIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="screenGrad" x1="11" y1="12" x2="37" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="baseGrad" x1="6" y1="33" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBD5E1" />
          <stop offset="0.5" stopColor="#94A3B8" />
          <stop offset="1" stopColor="#64748B" />
        </linearGradient>
      </defs>
      {/* Laptop Screen Border */}
      <rect x="9" y="10" width="30" height="21" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
      {/* Screen Display */}
      <rect x="11" y="12" width="26" height="17" rx="1.5" fill="url(#screenGrad)" />
      {/* Code / Charts on screen */}
      <line x1="14" y1="16" x2="24" y2="16" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="20" x2="20" y2="20" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 25l4-5 3 2 4-6" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Laptop Base */}
      <path d="M5 33h38l-3 4H8L5 33z" fill="url(#baseGrad)" />
      <line x1="20" y1="34" x2="28" y2="34" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg className="h-10 w-10 drop-shadow-md" viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="balloonGrad" cx="35%" cy="30%" r="65%">
          <stop stopColor="#F472B6" />
          <stop offset="0.4" stopColor="#818CF8" />
          <stop offset="0.8" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#6366F1" />
        </radialGradient>
      </defs>
      {/* Hot air balloon envelope */}
      <path
        d="M24 6c-8.5 0-14 6.5-14 14 0 6 5 10 11 14.5l1 1.5h4l1-1.5c6-4.5 11-8.5 11-14.5 0-7.5-5.5-14-14-14z"
        fill="url(#balloonGrad)"
      />
      {/* Balloon Stripes */}
      <path d="M24 6c-4 0-7 6.5-7 14 0 5.5 3 9.5 7 14 4-4.5 7-8.5 7-14 0-7.5-3-14-7-14z" fill="#FDE047" opacity="0.6" />
      <path d="M24 6c-1.5 0-2.5 6.5-2.5 14 0 5.5 1 9.5 2.5 14 1.5-4.5 2.5-8.5 2.5-14 0-7.5-1-14-2.5-14z" fill="#EF4444" opacity="0.7" />
      {/* Ropes */}
      <line x1="21" y1="36" x2="20" y2="40" stroke="#78350F" strokeWidth="1" />
      <line x1="27" y1="36" x2="28" y2="40" stroke="#78350F" strokeWidth="1" />
      {/* Basket */}
      <rect x="19" y="40" width="10" height="5" rx="1.5" fill="#D97706" />
    </svg>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const CATEGORIES_DATA = [
  {
    id: "music",
    eventCategory: "Music",
    name: "Music",
    icon: MusicIcon,
    bgHover: "[@media(hover:hover)]:hover:border-indigo-300 active:border-indigo-300",
  },
  {
    id: "comedy",
    eventCategory: "Comedy",
    name: "Comedy",
    icon: ComedyIcon,
    bgHover: "[@media(hover:hover)]:hover:border-amber-300 active:border-amber-300",
  },
  {
    id: "theatre",
    eventCategory: "Theatre",
    name: "Theatre",
    icon: TheatreIcon,
    bgHover: "[@media(hover:hover)]:hover:border-blue-300 active:border-blue-300",
  },
  {
    id: "sports",
    eventCategory: "Sports",
    name: "Sports",
    icon: SportsIcon,
    bgHover: "[@media(hover:hover)]:hover:border-emerald-300 active:border-emerald-300",
  },
  {
    id: "workshops",
    eventCategory: null,
    name: "Workshops",
    icon: WorkshopsIcon,
    bgHover: "[@media(hover:hover)]:hover:border-orange-300 active:border-orange-300",
  },
  {
    id: "festivals",
    eventCategory: null,
    name: "Festivals",
    icon: FestivalsIcon,
    bgHover: "[@media(hover:hover)]:hover:border-red-300 active:border-red-300",
  },
  {
    id: "food-drinks",
    eventCategory: "Food",
    name: "Food & Drinks",
    icon: FoodDrinksIcon,
    bgHover: "[@media(hover:hover)]:hover:border-rose-300 active:border-rose-300",
  },
  {
    id: "arts-culture",
    eventCategory: "Arts",
    name: "Arts & Culture",
    icon: ArtsCultureIcon,
    bgHover: "[@media(hover:hover)]:hover:border-yellow-300 active:border-yellow-300",
  },
  {
    id: "kids",
    eventCategory: null,
    name: "Kids",
    icon: KidsIcon,
    bgHover: "[@media(hover:hover)]:hover:border-sky-300 active:border-sky-300",
  },
  {
    id: "tech-business",
    eventCategory: "Tech",
    name: "Tech & Business",
    icon: TechBusinessIcon,
    bgHover: "[@media(hover:hover)]:hover:border-cyan-300 active:border-cyan-300",
  },
  {
    id: "more",
    eventCategory: null,
    name: "More",
    icon: MoreIcon,
    bgHover: "[@media(hover:hover)]:hover:border-purple-300 active:border-purple-300",
  },
];

// Attach live counts from CATEGORIES so a tile never shows a stale/blank number.
CATEGORIES_DATA.forEach((item) => {
  const match = item.eventCategory
    ? EVENT_CATEGORY_BY_ID[item.eventCategory]
    : null;
  item.count = match
    ? CATEGORIES.find((c) => c.label === match)?.count ?? 0
    : null;
});

export default function EventCategories({ selectedCategory, onSelectCategory }) {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  // Touch devices never fire :hover, so a plain CSS hover effect is invisible on
  // phones. This mirrors "hover" into React state: pointer devices set it on
  // enter/leave, touch devices set it on press and clear it after a beat so the
  // effect is actually seen instead of vanishing on the same tap that navigates.
  const [hoveredId, setHoveredId] = useState(null);
  const touchTimer = useRef(null);

  useEffect(() => () => clearTimeout(touchTimer.current), []);

  const startTouchHover = (id) => {
    clearTimeout(touchTimer.current);
    setHoveredId(id);
  };

  const endTouchHover = () => {
    clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setHoveredId(null), 320);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header matching the reference design */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text sm:text-2xl lg:text-3xl">
              Event Categories
            </h2>
            <p className="mt-1 text-xs text-text-secondary sm:text-sm">
              Find something you'll love.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll navigation arrows for touch/smaller screens */}
            <div className="hidden items-center gap-1 sm:flex lg:hidden">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:text-primary active:border-primary active:text-primary"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:text-primary active:border-primary active:text-primary"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* View All link */}
            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark sm:text-sm"
            >
              <span>View All</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Categories Carousel/Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth [-ms-overflow-style:none] scrollbar-none xl:grid xl:grid-cols-11 xl:gap-2.5"
        >
          {CATEGORIES_DATA.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.id;
            // JS-driven hover mirror (works on touch, where CSS :hover never fires)
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onPointerEnter={(e) => {
                  if (e.pointerType !== "touch") setHoveredId(item.id);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== "touch") setHoveredId(null);
                }}
                onPointerDown={(e) => {
                  if (e.pointerType === "touch") startTouchHover(item.id);
                }}
                onPointerUp={(e) => {
                  if (e.pointerType === "touch") endTouchHover();
                }}
                onPointerCancel={(e) => {
                  if (e.pointerType === "touch") endTouchHover();
                }}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(item.id);
                  navigate(
                    item.eventCategory
                      ? `/events?category=${encodeURIComponent(item.eventCategory)}`
                      : "/events"
                  );
                }}
                className={`group flex min-w-23 shrink-0 flex-col items-center justify-center rounded-2xl border bg-surface p-3 text-center transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-md active:-translate-y-1 active:shadow-md sm:min-w-25.5 sm:p-3.5 xl:min-w-0 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20"
                    : `border-slate-100 shadow-[0_2px_8px_rgba(15,23,42,0.04)] ${
                        isHovered
                          ? "border-primary/60 shadow-xl"
                          : "[@media(hover:hover)]:hover:border-primary/40"
                      }`
                } ${
                  isHovered ? "-translate-y-2 shadow-[0_12px_28px_-6px_rgba(79,70,229,0.45)]" : ""
                } ${item.bgHover}`}
              >
                {/* 3D-styled Vibrant Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-110 sm:h-13 sm:w-13 ${
                    isHovered ? "scale-[1.18] drop-shadow-lg" : ""
                  }`}
                >
                  <Icon />
                </div>

                {/* Category Title */}
                <span
                  // Only one of text-text / text-primary is applied: both are
                  // single-class selectors, so stacking them lets whichever comes
                  // later in the stylesheet win regardless of this order.
                  className={`mt-2.5 text-xs font-semibold transition-colors sm:text-[13px] ${
                    isHovered
                      ? "text-primary"
                      : "text-text [@media(hover:hover)]:group-hover:text-primary"
                  }`}
                >
                  {item.name}
                </span>

                {/* Events Count — only shown for tiles backed by real data */}
                {item.count !== null && (
                  <span className="mt-0.5 text-[11px] font-normal text-text-secondary">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
