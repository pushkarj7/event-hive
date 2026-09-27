function Hero(){
  return(
    <section className=" bg-background py-16">
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-6 md:flex-row">
      {/* left content */}
     <div className="w-full md:w-1/2">
       <div className="space-y-6 max-w-xl">
         <h1 className="text-4xl font-bold text-text md:text-5xl">
            Your Events. Your Moments.
         </h1>
         <p className="text-lg text-text-secondary">
           Discover, book and enjoy  amazing event experiences created by our community of organizers and creators.
         </p>
         <button className=" rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark ">
           Explore Events
         </button>
       </div>
      </div>
      {/* right content */}
     <div className="mt-12 w-full md:mt-0 md:w-1/2">
      <div className="mx-auto h-80 w-80 rounded-3xl bg-primary p-4">
       <div className=" flex flex-col justify-between rounded-2xl bg-white p-6">
        <p className="w-fit rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font-medium text-primary">OCT 25</p>
        <div>
         <h2 className="text-2xl font-bold text-text">Music Night</h2>
         <p className="text-text-secondary">New Delhi</p>
        </div>
        <button className="w-fit rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-dark">Book Now</button>
       </div>
      </div>
     </div>
    </div>
    </section>
  );
}
export default Hero;