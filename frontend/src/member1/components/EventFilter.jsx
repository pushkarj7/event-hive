import { SlidersHorizontal, RotateCcw } from "lucide-react";

export default function EventFilter({
  categories = [],
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedDate,
  onDateChange,
  onResetFilters,
  totalResults = 0,
}) {
  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-surface p-5 shadow-xs">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Filter Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-primary" />
            <h3 className="text-base font-bold text-text">Filter</h3>
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-text-secondary transition-colors hover:text-primary"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>

        {/* Category Checkboxes */}
        <div className="mt-5 border-b border-slate-100 pb-5">
          <h4 className="text-xs font-bold tracking-wider text-text uppercase">
            Category
          </h4>
          <div className="mt-3.5 space-y-2.5">
            {categories.map((cat) => {
              const isChecked =
                cat.id === "all"
                  ? selectedCategory === "all"
                  : selectedCategory === cat.label;

              return (
                <label
                  key={cat.id}
                  className="group flex cursor-pointer items-center justify-between text-sm transition-colors hover:text-primary"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        if (cat.id === "all") {
                          onSelectCategory("all");
                        } else {
                          onSelectCategory(isChecked ? "all" : cat.label);
                        }
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-primary accent-primary focus:ring-primary/20"
                    />
                    <span
                      className={`${
                        isChecked
                          ? "font-semibold text-primary"
                          : "text-text group-hover:text-primary"
                      }`}
                    >
                      {cat.label}
                    </span>
                  </div>
                  {cat.count !== undefined && (
                    <span className="text-xs text-text-secondary">
                      {cat.count}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Range Slider */}
        <div className="mt-5 border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold tracking-wider text-text uppercase">
              Price Range
            </h4>
            <span className="text-xs font-bold text-primary">
              ₹0 – ₹{priceRange.toLocaleString("en-IN")}+
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="5000"
            step="250"
            value={priceRange}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary"
          />

          <div className="mt-2 flex justify-between text-[11px] text-text-secondary">
            <span>₹0</span>
            <span>₹2,500</span>
            <span>₹5,000+</span>
          </div>
        </div>

        {/* Date Filter */}
        <div className="mt-5">
          <h4 className="text-xs font-bold tracking-wider text-text uppercase">
            Date
          </h4>
          <div className="mt-3">
            <select
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-background px-3 py-2 text-sm text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="all">Any Date</option>
              <option value="today">Today</option>
              <option value="weekend">This Weekend</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Results Count Footer */}
        <div className="mt-6 rounded-xl bg-slate-50 p-3 text-center text-xs text-text-secondary">
          Showing <span className="font-bold text-text">{totalResults}</span> active events
        </div>
      </form>
    </aside>
  );
}
