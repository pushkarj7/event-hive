import LoginForm from "../../member1/components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* subtle gradient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-[80px]" />
        <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-violet-200/30 blur-[80px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-[80px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Left — branding (desktop only) */}
        <div className="hidden w-[48%] flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-10 text-white lg:flex">
          <Link to="/" className="text-sm font-bold tracking-[0.18em]">EVENT HIVE</Link>
          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight">Discover<br />experiences<br />worth remembering.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-indigo-100">Find amazing events, discover new experiences, and connect with people who share your interests.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur">Concerts</span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur">Workshops</span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur">Sports</span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur">Experiences</span>
            </div>
          </div>
          <p className="text-xs text-indigo-200">© 2026 Event Hive — Made with ♥ in India</p>
        </div>

        {/* Right — form */}
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default Login;
