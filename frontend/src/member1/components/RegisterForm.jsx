import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  LockKeyhole,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAppStore();
  const [registerMethod, setRegisterMethod] = useState("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    if (registerMethod === "email") {
      if (!name.trim()) newErrors.name = "Full name is required";
      else if (name.trim().length < 3)
        newErrors.name = "Full name must be at least 3 characters";
      if (!email.trim()) newErrors.email = "Email is required";
      else if (!emailPattern.test(email))
        newErrors.email = "Please enter a valid email address";
      if (!password.trim()) newErrors.password = "Password is required";
      else if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
    }
    if (registerMethod === "phone") {
      if (!phone.trim()) newErrors.phone = "Phone number is required";
      else if (!phonePattern.test(phone))
        newErrors.phone = "Please enter a valid 10 digit phone number";
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (registerMethod === "email") login({ email, name });
      else login({ phone, name: phone });
      navigate("/profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-110 rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8"
    >
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
      >
        <X size={16} />
      </button>

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
        <Sparkles size={20} />
      </div>

      <div className="mt-4 text-center">
        <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900">
          Create account
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Join 50 Lakh+ happy explorers on Event Hive
        </p>
      </div>

      <div className="mt-6 flex rounded-full bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => {
            setRegisterMethod("email");
            setError({});
          }}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
            registerMethod === "email"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => {
            setRegisterMethod("phone");
            setError({});
          }}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
            registerMethod === "phone"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Phone
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {registerMethod === "email" ? (
          <>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error.name) setError((p) => ({ ...p, name: "" }));
                }}
                placeholder="Full name"
                className={`h-11 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                  error.name
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
              {error.name && (
                <p className="mt-1.5 text-xs text-red-600">{error.name}</p>
              )}
            </div>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error.email) setError((p) => ({ ...p, email: "" }));
                }}
                placeholder="Email address"
                className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                  error.email
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
              {error.email && (
                <p className="mt-1.5 text-xs text-red-600">{error.email}</p>
              )}
            </div>

            <div className="relative">
              <LockKeyhole
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error.password) setError((p) => ({ ...p, password: "" }));
                }}
                placeholder="Password (min 8 chars)"
                className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                  error.password
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {error.password && (
                <p className="mt-1.5 text-xs text-red-600">{error.password}</p>
              )}
            </div>

            <p className="pt-1 text-xs leading-4 text-slate-400">
              By creating an account, you agree to our{" "}
              <span className="font-medium text-slate-600">Terms</span> &{" "}
              <span className="font-medium text-slate-600">Privacy Policy</span>.
            </p>
          </>
        ) : (
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error.phone) setError((p) => ({ ...p, phone: "" }));
              }}
              placeholder="Phone number (10 digits)"
              className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                error.phone
                  ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
            {error.phone && (
              <p className="mt-1.5 text-xs text-red-600">{error.phone}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : null}
          {isLoading
            ? "Please wait..."
            : registerMethod === "email"
            ? "Create account"
            : "Send OTP"}
          {!isLoading && <ArrowRight size={16} />}
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt=""
            className="h-4 w-4"
          />{" "}
          Continue with Google
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
        <ShieldCheck size={12} /> We never share your data — 100% private
      </p>
    </form>
  );
};

export default RegisterForm;
