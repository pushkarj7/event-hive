import { useState } from "react";
import { useAppStore } from "../../store/EventContext";
import { Save, UserRound, Mail, Phone, Check, ShieldCheck } from "lucide-react";

const ProfileForm = ({ onSaved }) => {
  const { user, updateProfile } = useAppStore();
  const [form, setForm] = useState({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Name is required"); return; }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Invalid email"); return; }
    setError("");
    updateProfile({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
    setSaved(true);
    onSaved?.();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md"><UserRound size={16} /></span>
        <div>
          <h3 className="text-base font-extrabold tracking-tight text-slate-900">Edit Profile</h3>
          <p className="text-xs text-slate-500">Update your personal information</p>
        </div>
        {saved && <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-sm"><Check size={12} /> Saved</span>}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><UserRound size={12} className="text-slate-400" /> Full Name *</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" required />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><Mail size={12} className="text-slate-400" /> Email</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="you@example.com" className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" />
          <p className="mt-1 text-[11px] text-slate-400">We&apos;ll send receipts here</p>
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700"><Phone size={12} className="text-slate-400" /> Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10 digit number" className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" />
        </div>
        {error && <p className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-semibold text-red-600">{error}</p>}
      </div>

      <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-black hover:-translate-y-0.5 active:translate-y-0">
        <Save size={16} /> Save Changes
      </button>
      <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-slate-400"><ShieldCheck size={12} className="text-emerald-500" /> Your info is encrypted & secure</p>
    </form>
  );
};
export default ProfileForm;
