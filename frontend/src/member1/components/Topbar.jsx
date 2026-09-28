import { Search, Bell, ChevronDown } from "lucide-react";
const Topbar = () => {
    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-2200 bg-white px-8">
            {/* Search */}
            <div className="relative w-full max-w-xl">
                <Search size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input 
                type="text"
                placeholder="Search events , bookings ...."
                className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
            </div>
            {/* Right Side */}
            <div className="ml-8 flex items-center gap-6">
                {/* Notification */}
                <button
                type="button"
                aria-label="Notifications"
                className="relative text-slate-600 transition hover:text-indigo-600">

                    <Bell size={24} />

                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                        3
                    </span>
                </button>

                {/* Divider */}
                <button
                type="button"
                className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                        v
                    </div>
                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-semibold text-slate-900">
                        Vivek Singh
                        </p>

                        <p className="text-xs text-slate-500">
                        Event Organizer
                        </p>
                    </div>

                    <ChevronDown
                        size={18}
                        className="text-slate-500"
                    />
                </button>
            </div>
        </header>
    );
};
export default Topbar;