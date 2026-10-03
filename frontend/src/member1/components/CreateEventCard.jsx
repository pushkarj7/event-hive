import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CreateEventCard = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 p-6 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-indigo-100 shadow-sm"><Plus size={18} className="text-indigo-600" /></div>
      <h3 className="mt-3 text-sm font-bold text-slate-900">Create Amazing Events</h3>
      <p className="mt-1 text-xs text-slate-500">Bring people together with Event Hive</p>
      <button onClick={() => navigate("/create-event")} className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-black">Create Event</button>
    </div>
  );
};
export default CreateEventCard;
