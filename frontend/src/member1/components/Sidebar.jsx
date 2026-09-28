import {
  Home,
  CalendarDays,
  PlusCircle,
  Ticket,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Plus,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center px-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Event <span className="text-indigo-500">Hive</span>
        </h1>
      </div>

    {/* Navigation */}
    <nav className="flex-p px-4">
        <div className="space-y-2">
        <button className="flex w-full items-center gap-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-600">
            <Home size={21}/>
            <span>Dashboard</span>
        </button>

        {/* My Events */}
        <button className="flex w-full items-center gap-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-600">
            <CalendarDays size={21} />
            <span> My Events</span>
        </button>
        
        {/* Create Event */}
        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            <PlusCircle size={21} />
            <span> Create Events</span>
            </button>
            {/* Bookings */}
          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            <Ticket size={21} />
            <span>Bookings</span>
          </button>

          {/* Attendees */}
          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            <Users size={21} />
            <span>Attendees</span>
          </button>

          {/* Messages */}
          <button className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            <div className="flex items-center gap-4">
              <MessageSquare size={21} />
              <span>Messages</span>
            </div>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              3
            </span>
          </button>

          {/* Analytics */}
          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            <BarChart3 size={21} />
            <span>Analytics</span>
          </button>

          {/* Settings */}
          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            <Settings size={21} />
            <span>Settings</span>
        </button>
        </div>
    </nav>

    {/* Create Event Card */}
    <div className="mx-4 mb-5 rounded-2xl bg-indigo-100 p-4">
        <h2 className="text-lg font\ leading-tight text-slate-900">
            Create Amazing 
            <br />
            Events
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-600">
            Bring people together with Event Hive !
        </p>
        <button className="mt-4 flex items-center gap-4 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50">
            <Plus size={18} />
            Create Event
        </button>
    </div>

    </aside>
  );
};

export default Sidebar;