function Navbar(){
    return(
        <nav className="flex items-center justidy-betweeb px-8 py-4">
            <h1 className="text-2xl font-bold">
                Event Hive
            </h1>
            <div className="flex gap-6">
                <a href="/">Home</a>
                <a href="/events">Events</a>
                <a href="/contact">Contact</a>
            </div>
            <button className="rounded-lg px-5 py-2">Login</button>
        </nav>
    )
}
export default Navbar;