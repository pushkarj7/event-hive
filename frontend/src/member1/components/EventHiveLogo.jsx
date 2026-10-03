export default function EventHiveLogo({ size = 32, showText = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Event Hive Logo"
      >
        <defs>
          <linearGradient id="logo-top" x1="60" y1="12" x2="60" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="logo-left" x1="16" y1="36" x2="60" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
          <linearGradient id="logo-right" x1="104" y1="36" x2="60" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient id="logo-inner" x1="40" y1="34" x2="80" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EEF2FF" />
          </linearGradient>
        </defs>

        {/* 3D Isometric Hexagon Prism */}
        <path d="M60 14 L100 37 L60 60 L20 37 Z" fill="url(#logo-top)" />
        <path d="M20 37 L60 60 L60 106 L20 83 Z" fill="url(#logo-left)" />
        <path d="M60 60 L100 37 L100 83 L60 106 Z" fill="url(#logo-right)" />

        {/* Central Core */}
        <path d="M60 38 L82 50.5 L82 75.5 L60 88 L38 75.5 L38 50.5 Z" fill="#0F172A" fillOpacity="0.22" />
        <path d="M60 41 L79 52 L79 73 L60 84 L41 73 L41 52 Z" fill="url(#logo-inner)" />

        {/* "H" Icon Graphic */}
        <path
          d="M49 56 L55 56 L55 61 L65 61 L65 56 L71 56 L71 70 L65 70 L65 65 L55 65 L55 70 L49 70 Z"
          fill="#4F46E5"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight text-text">
            Event <span className="text-primary">Hive</span>
          </span>
          <span className="text-[10px] font-medium tracking-widest text-text-secondary uppercase">
            Discover • Book • Experience
          </span>
        </div>
      )}
    </div>
  );
}
