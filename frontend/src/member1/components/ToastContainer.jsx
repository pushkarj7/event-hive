import { CheckCircle2, Heart, Info, AlertCircle, X } from "lucide-react";
import { useAppStore } from "../../store/EventContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-99999 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0">
      {toasts.map((t) => {
        const isSuccess = t.type === "success";
        const isWishlist = t.type === "wishlist";
        const isError = t.type === "error";

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl p-4 shadow-xl border backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
              isWishlist
                ? "bg-rose-950/90 text-rose-100 border-rose-500/40 shadow-rose-900/20"
                : isSuccess
                ? "bg-slate-900/90 text-white border-emerald-500/40 shadow-emerald-950/20"
                : isError
                ? "bg-red-950/90 text-red-100 border-red-500/40 shadow-red-900/20"
                : "bg-slate-900/90 text-slate-100 border-slate-700 shadow-slate-950/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                  isWishlist
                    ? "bg-rose-500/20 text-rose-400"
                    : isSuccess
                    ? "bg-emerald-500/20 text-emerald-400"
                    : isError
                    ? "bg-red-500/20 text-red-400"
                    : "bg-indigo-500/20 text-indigo-400"
                }`}
              >
                {isWishlist ? (
                  <Heart size={16} className="fill-rose-400" />
                ) : isSuccess ? (
                  <CheckCircle2 size={16} />
                ) : isError ? (
                  <AlertCircle size={16} />
                ) : (
                  <Info size={16} />
                )}
              </span>
              <p className="text-xs sm:text-sm font-semibold leading-tight">
                {t.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white transition p-1"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
