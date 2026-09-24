
function Home(){
    return(
       <main>
        <section className="bg-background px-6 py-16 md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
                {/* left content */}
                <div>
                    <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-primary">
                        YOUR EVENTS. YOUR MOMENTS. 
                    </span>
                    <h1 className="mt-6 text-4xl font-bold leading-tight text-text md:text-5xl lg:text-6xl">
                      Discover Events  
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
                        Find, explore and book amazing events happening around you.
                        From concerts and workshops to conferences and more. 
                    </p>
                    {/* buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark">
                            Explore Events
                        </button>
                        <button className="rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-indigo-50">
                            Create Event
                        </button>
                    </div>
                </div>
                  {/* right visual */}
                  <div className="relative flex justify-center">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
                        <div className="h-48 rounded-2xl bg-linear-to-br from-primary to-accent">
                        </div>
                        <div className="mt-5">
                            <p className="text-sm font-medium text-text-secondary">
                                Featured Events
                            </p>
                            <h2 className="mt-1 text-2xl font-bold text-text">
                                Music & Live Concert
                            </h2>
                            <p className="mt-2 text-text-secondary">
                                New Delhi &nbsp;. &nbsp; 28 Sept
                            </p>
                            <button className="mt-5 w-full rounded-xl bg-text py-3 font-semibold text-white transition hover:bg-primary-dark">
                                View Event
                            </button>
                        </div>
                    </div>
                  </div>
            </div>
        </section>
        
       </main>
    );
}
export default Home;