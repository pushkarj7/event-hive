import { ArrowUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, growth, growthText }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
            <Icon size={23} className="text-indigo-600" />
        </div>
        {/* Content */}
        <div className="mt-4">
            <p className="text-sm text-slate-500">
                {title}
            </p>
            
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {value}
                </h2>

                {/* Growth */}
                <div className="mt-2 flex items-center gap-1 text-sm">
                <ArrowUp size={15} className="text-emerald-500" />

                <span className="font-medium text-emerald-500">
                    {growth}
                </span>

                <span className="text-slate-500">
                    {growthText}
                </span>
            </div>
        </div>
    </div>
  );
};

export default StatCard;