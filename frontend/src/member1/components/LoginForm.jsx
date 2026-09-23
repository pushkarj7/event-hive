import { useState } from "react";
const LoginForm =() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
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
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
                </div>

                <div>
                    <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Password
                    </label>

                    <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Log in
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
                    <button
                        type="button"
                        className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                        Sign up
                    </button>
                    </p>
            </div>
        </form>
    );
};

export default LoginForm;