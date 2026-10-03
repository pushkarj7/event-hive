import { Sun, Moon } from "lucide-react";
import { useAppStore } from "../../store/EventContext";

/**
 * Shared light/dark switch. Works on every page because theme state
 * lives in the store (src/store/EventContext.jsx) and the palette is
 * driven by the `html.dark` overrides in src/index.css.
 */
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useAppStore();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      aria-pressed={isDark}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 hover:text-indigo-600 dark:border-[#223253] dark:bg-[#151F33] dark:text-slate-200 dark:hover:bg-[#1C2942] dark:hover:text-indigo-300 ${className}`}
    >
      {isDark ? (
        <Sun size={17} className="text-amber-400" />
      ) : (
        <Moon size={17} className="text-slate-600" />
      )}
    </button>
  );
};

export default ThemeToggle;