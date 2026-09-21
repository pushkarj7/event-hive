import { NavLink, Link } from "react-router-dom";
function Navbar(){
    const linkClasses=({isActive}) =>
                    `transition-colors duration-200 ${
                        isActive
                         ? "font-semibold text-blue-600" 
                         : "text-slate-600 hover:text-blue-600"
                    }`;
                return(
                    // logo
        <nav className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/" className="text-2xl font-bold" >Event <span className="text-blue-600">Hive</span></Link>
                {/* Navlinks */}
                <div className="flex items-center gap-8">
                    <NavLink to="/"end className= {linkClasses}> Home</NavLink>
                    <NavLink to="/events" className={linkClasses}>Events</NavLink>
                    <NavLink to="/about"className= {linkClasses}>About</NavLink>
                    <NavLink to="/contact"className= {linkClasses}>Contact </NavLink>
                </div>
                {/* login button */}
                   <Link to="/login" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white">
                   Login
                   </Link>
            </div>
            
        </nav>
    );
}
export default Navbar;