function EventInfo({event}){
    return(
        <div className="flex flex-col">
          {/* category */}
          <span className="w-fit round-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
             {event.category}
           </span>
           {/* title */}
           <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl ">
            {event.title}
           </h1>
           {/* date & time */}
           <div className="mt-6 flex items-center gap-3 text-text-secondary">
           <span>📅</span>
           <span>
            {event.date} . {event.time}
           </span>
          </div>
          {/* venue */}
          <div className="mt-3 flex items-center gap-3 text-text-secondary">
           <span>📍</span>
           <span>
            {event.venue}
           </span>
          </div>
          {/* rating */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-text">
              {event.rating}
              </span>
              <span className="text-text-secondary">
               Rating
              </span>
          </div>
          {/* price */}
          <p className="mt-5 text-2xl font-bold text-primary">
           {event.price}
          </p>
          {/* Description */}
          <p className="mt-5 max-w-2xl leading-7 text-text-secondary">
            {event.description}
          </p>
        </div>

    );
}
export default EventInfo;