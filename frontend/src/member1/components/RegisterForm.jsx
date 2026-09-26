import { useState } from "react";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Phone,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
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
      if (!name.trim()) {
        newErrors.name = "Full name is required";
      } else if (name.trim().length < 3) {
        newErrors.name = "Full name must be at least 3 characters";
      }

      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailPattern.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!password.trim()) {
        newErrors.password = "Password is required";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    }

    if (registerMethod === "phone") {
      if (!phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!phonePattern.test(phone)) {
        newErrors.phone = "Please enter a valid 10 digit phone number";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (registerMethod === "email") {
        console.log("Register Request:", {
          method: registerMethod,
          name,
          email,
        });
      } else {
        console.log("Register Request:", {
          method: registerMethod,
          phone,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6">
      {/* Background Decorations */}
      <div className="pointer-events-none fixed -left-32 top-20 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="pointer-events-none fixed -right-32 bottom-10 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

      {/* Main Layout */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 py-10 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        {/* Left Side Content */}
        <div className="hidden w-full max-w-105 shrink-0 lg:block">
          <p className="text-sm font-bold tracking-[0.2em] text-indigo-500">
            EVENT HIVE
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900">
            Discover experiences
            <br />
            worth remembering.
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
            Find amazing events, discover new experiences,
            and connect with people who share your interests.
          </p>

          {/* Categories */}
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              Concerts
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              Workshops
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              Sports
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              Experiences
            </span>
          </div>
        </div>

        {/* Register Card */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-122.5 shrink-0 rounded-[18px] border border-slate-100 bg-white px-5 py-6 shadow-xl sm:px-7 sm:py-7"
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close register form"
            className="absolute right-5 top-5 text-slate-700 transition hover:text-slate-950"
          >
            <X size={19} strokeWidth={1.8} />
          </button>

          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
            <UserRound
              size={28}
              strokeWidth={2}
              className="text-indigo-500"
            />
          </div>

          {/* Heading */}
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create Account
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Join 50 Lakh+ Happy User 
            </p>
          </div>

          {/* Email / Phone Toggle */}

          <div className="mt-6 flex rounded-xl bg-slate-100 p-1">
            <button
            type="button"
            onClick={ () => {
              setRegisterMethod("email");
              setError({});
            }}
            className={`w-1/2 rounded-lg py-2 text-sm font-medium transition ${
            registerMethod === "email"
          ? "bg-white text-slate-900 shadow-sm" :
         "text-slate-500"
            }`}
        >
          Email
        </button>

            <button
            type="button "
            onClick={ () => {
              setRegisterMethod("phone");
              setError({});
            }}
            className={`w-1/2 rounded-lg py-2 text-sm font-medium transition ${
              registerMethod ==="phone"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500"
            }`}>

              Phone
            </button>
          </div>

          {/* Form Fields */}

          <div className="mt-5 space-y-3">
            {registerMethod === "email" ? (
              <>
                {/* Full Name */}
                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);

                      if (error.name) {
                        setError((previous) => ({
                          ...previous,
                          name: "",
                        }));
                      }
                    }}
                    placeholder="Full Name"
                    aria-invalid={Boolean(error.name)}
                    className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                      error.name
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />

                  {error.name && (
                    <p className="mt-1 text-xs text-red-600">
                      {error.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);

                      if (error.email) {
                        setError((previous) => ({
                          ...previous,
                          email: "",
                        }));
                      }
                    }}
                    placeholder="Email Address"
                    aria-invalid={Boolean(error.email)}
                    className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                      error.email
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />

                  {error.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {error.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);

                      if (error.password) {
                        setError((previous) => ({
                          ...previous,
                          password: "",
                        }));
                      }
                    }}
                    placeholder="Password"
                    aria-invalid={Boolean(error.password)}
                    className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                      error.password
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                  >
                    {showPassword ? (
                      <EyeOff size={17} aria-hidden="true" />
                    ) : (
                      <Eye size={17} aria-hidden="true" />
                    )}
                  </button>

                  {error.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {error.password}
                    </p>
                  )}
                </div>
              </>
            ) : (
              /* Phone Mode */
              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);

                    if (error.phone) {
                      setError((previous) => ({
                        ...previous,
                        phone: "",
                      }));
                    }
                  }}
                  placeholder="Phone Number (10 digits)"
                  aria-invalid={Boolean(error.phone)}
                  className={`h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white ${
                    error.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  }`}
                />

                {error.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {error.phone}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Please wait..."
                : registerMethod === "email"
                  ? "Create Account"
                  : "Send OTP"}
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-5 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-500 transition hover:text-indigo-600"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;