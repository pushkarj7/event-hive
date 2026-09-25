import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const LoginForm =() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validateForm= () => {
        const newErrors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if  (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
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
            await new Promise((resolve) => setTimeout(resolve, 1500))
        

        console.log("Login Request:", { email, password 
        });
    } finally {
        setIsLoading(false);
         }
    };

    return (
        <form
            onSubmit={handleSubmit} 
            className="mx-auto mt-12 max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"> Welcome Back </h1>

            <p className="mt-2 text-center text-sm text-slate-500"> Log in to continue to Event Hive </p>
            <div className="space-y-5">
                <div>
            <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
            >
                Email
            </label>

            <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
                setEmail(event.target.value);

                if (error.email) {
                    setError((previous) => ({
                    ...previous, email: ""
                    }));
                }
                }}
            placeholder="Enter your email"
            className={`w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:ring-2 ${
                error.email ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
            />
            {error.email && (
                <p className="mt-2 text-sm text-red-600">{error.email}</p>
            )}
                </div>

                                        
                        <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            aria-invalid={Boolean(error.password)}
                            aria-describedby={
                                error.password ? "password-error" : undefined
                            }
                            className={`w-full rounded-xl border px-4 py-3 pr-12
                                text-sm text-slate-900 outline-none transition
                                placeholder:text-slate-400 focus:ring-2 ${
                                error.password
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                                }`}
                            />

                            <button
                            type="button"
                            onClick={() => setShowPassword((previous) => !previous)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            aria-pressed={showPassword}
                            className="absolute inset-y-0 right-3 flex items-center
                                text-slate-500 transition hover:text-indigo-600
                                focus-visible:rounded focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-indigo-500"
                            >
                            {showPassword ? (
                                <EyeOff size={20} aria-hidden="true" />
                            ) : (
                                <Eye size={20} aria-hidden="true" />
                            )}
                            </button>
                        </div>

                        {error.password && (
                            <p
                            id="password-error"
                            className="mt-2 text-sm text-red-600"
                            >
                            {error.password}
                            </p>
                        )}
                        </div>

                <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                {isLoading ? "Logging in..." : "Log in"}
                </button>

                <div className="mt-4 flex justify-end">
                <button
                type="button"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                    Forgot password?
                </button>
                </div>
                <p className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        type="button"
                        className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                        Sign up
                    </Link>
                    </p>
            </div>
        </form>
    );
};

export default LoginForm;