import Sidebar from "../../member1/components/Sidebar";
import Topbar from "../../member1/components/Topbar";
import StatCard from "../../member1/components/StatCard";
import {
  CalendarDays,
  Ticket,
  Users,
  IndianRupee,
} from "lucide-react";
const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="ml-64">
                {/* Topbar */}
                <Topbar />

                {/* Dashboard Content */}
                <section className="p-6">
                    {/* Welcome Section */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Welcome back,
                            </p>
                            
                            <h1 className="mt-1 text-3xl font-bold text-slate-900">
                                Vivek 👋
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Here's a quick overview of your events and activity.
                            </p>
                        </div>

                        <button className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600">
                            + Create Event
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;