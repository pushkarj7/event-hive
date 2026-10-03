import { useAppStore } from "../../store/EventContext";
import { useNavigate } from "react-router-dom";
const ProfileCard = () => {
  const { user, stats } = useAppStore();
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-white font-bold text-lg">{user.initial}</div>
      <p className="mt-3 text-sm font-bold text-slate-900">{user.name}</p>
      <p className="text-xs text-slate-500">{user.role}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div><p className="text-sm font-bold text-slate-900">{stats.totalEvents}</p><p className="text-[11px] text-slate-500">Events</p></div>
        <div><p className="text-sm font-bold text-slate-900">{stats.totalBookings}</p><p className="text-[11px] text-slate-500">Bookings</p></div>
        <div><p className="text-sm font-bold text-slate-900">{stats.totalAttendees}</p><p className="text-[11px] text-slate-500">Attendees</p></div>
      </div>
      <button onClick={() => navigate("/profile")} className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-black">View Profile</button>
    </div>
  );
};
export default ProfileCard;
