import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  LockKeyhole,
  X,
  ArrowRight,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/EventContext";
import EventHiveLogo from "./EventHiveLogo";

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
      if (!name.trim()) newErrors.name = "Full name is required";
      if (!phone.trim()) newErrors.phone = "Phone number is required";
      else if (!phonePattern.test(phone))
        newErrors.phone = "Please enter a valid 10-digit phone number";
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
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (registerMethod === "email") login({ email, name });
      else login({ phone, name });
      navigate("/profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-[430px] rounded-[24px] border border-slate-200/90 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8 font-sans"
    >
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
      >
        <X size={16} />
      </button>

      {/* Brand Logo & Header */}
      <div className="flex flex-col items-center text-center">
        <Link to="/" className="inline-block transition hover:opacity-90">
          <EventHiveLogo size={44} showText={true} />
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
          Create account
        </h1>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Join 50 Lakh+ happy explorers on Event Hive
        </p>
      </div>

      {/* Method Toggle */}
      <div className="mt-6 flex rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => {
            setRegisterMethod("email");
            setError({});
          }}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
            registerMethod === "email"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          With Email
        </button>
        <button
          type="button"
          onClick={() => {
            setRegisterMethod("phone");
            setError({});
          }}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
            registerMethod === "phone"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          With Mobile
        </button>
      </div>

      <div className="mt-5 space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error.name) setError((p) => ({ ...p, name: "" }));
              }}
              placeholder="e.g. Rahul Sharma"
              className={`h-11 w-full rounded-xl border bg-slate-50/60 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                error.name
                  ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
          </div>
          {error.name && (
            <p className="mt-1 text-xs font-medium text-red-600">{error.name}</p>
          )}
        </div>

        {registerMethod === "email" ? (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
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
                  placeholder="name@example.com"
                  className={`h-11 w-full rounded-xl border bg-slate-50/60 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                    error.email
                      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {error.email && (
                <p className="mt-1 text-xs font-medium text-red-600">{error.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Create Password
              </label>
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
                  placeholder="Minimum 8 characters"
                  className={`h-11 w-full rounded-xl border bg-slate-50/60 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                    error.password
                      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error.password && (
                <p className="mt-1 text-xs font-medium text-red-600">{error.password}</p>
              )}
            </div>

            <p className="pt-0.5 text-[11px] leading-4 text-slate-500 font-normal">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="font-semibold text-slate-700 hover:text-indigo-600 underline">
                Terms of Service
              </Link>{" "}
              &amp;{" "}
              <Link to="/privacy" className="font-semibold text-slate-700 hover:text-indigo-600 underline">
                Privacy Policy
              </Link>.
            </p>
          </>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number
            </label>
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
                placeholder="10-digit mobile number"
                className={`h-11 w-full rounded-xl border bg-slate-50/60 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                  error.phone
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
            </div>
            {error.phone && (
              <p className="mt-1 text-xs font-medium text-red-600">{error.phone}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg disabled:opacity-60 active:scale-[0.99]"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : null}
          {isLoading
            ? "Creating account..."
            : registerMethod === "email"
            ? "Create Event Hive Account"
            : "Send OTP Verification"}
          {!isLoading && <ArrowRight size={16} />}
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
            or sign up with
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={() => {
            login({ email: "google.newuser@eventhive.in", name: "Google Explorer" });
            navigate("/profile");
          }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 shadow-xs"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-4 w-4"
          />{" "}
          Continue with Google
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-slate-600 font-medium">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
        <ShieldCheck size={13} className="text-emerald-500" /> We never share your personal information
      </p>
    </form>
  );
};

export default RegisterForm;
