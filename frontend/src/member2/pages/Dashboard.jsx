import Sidebar from "../../member1/components/Sidebar";
import Topbar from "../../member1/components/Topbar";
import StatCard from "../../member1/components/StatCard";
import BookingsOverview from "../../member1/components/BookingsOverview";
import UpcomingEvents from "../../member1/components/UpcomingEvents";
import LatestBookings from "../../member1/components/LatestBookings";
import { CalendarDays, Ticket, Users, IndianRupee } from "lucide-react";
import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { stats, user, sidebarOpen } = useAppStore();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      {/* Off-canvas below lg; collapses to an icon rail on desktop */}
      <main
        className={`transition-[margin] duration-300 ease-out ${
          sidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-20"
        }`}
      >
        <Topbar />
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Welcome back,</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900">{user.name.split(" ")[0]} <span>👋</span></h1>
              <p className="mt-1 text-sm text-slate-500">Here's a quick overview of your events and activity.</p>
            </div>
            <button onClick={() => navigate("/create-event")} className="w-full shrink-0 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto">+ Create Event</button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={CalendarDays} title="Total Events" value={String(stats.totalEvents)} growth="↑ 2" growthText="this month" />
            <StatCard icon={Ticket} title="Total Bookings" value={String(stats.totalBookings)} growth="↑ 18%" growthText="from last month" />
            <StatCard icon={Users} title="Total Attendees" value={String(stats.totalAttendees).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} growth="↑ 25%" growthText="from last month" />
            <StatCard icon={IndianRupee} title="Total Revenue" value={`₹${String(stats.totalRevenue).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} growth="↑ 28%" growthText="from last month" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="lg:col-span-2"><BookingsOverview /></div>
            <div><UpcomingEvents /></div>
          </div>

          <div className="mt-6"><LatestBookings /></div>
        </section>
      </main>
    </div>
  );
};
export default Dashboard;
