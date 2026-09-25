import LoginForm from "../components/LoginForm";

const Login =() => {
    return(
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                <section className="m-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Welcome Back! Please Login to your account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500 sm:text-base">
                            Login To Your Account
                        </p>
                    </div>

                    <LoginForm />
                </section>
            </div>
        </main>
    );
};

export default Login;