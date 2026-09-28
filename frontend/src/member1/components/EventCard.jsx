import {Heart,MapPin,Star} from "lucide-react";
function EventCard({ title,location,price,category,date,image,rating}){
  const eventsDate=new Date(date);
    const month=eventsDate.toLocaleString("en-US",{month:"short",});
    const day= eventsDate.getDate();
    return(
   <div className=" group w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative h-52 overflow-hidden">
      <img 
      src={image}
      alt="Event"
      className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute bottom-3 left-3 rounded-lg bg-white px-2.5 py-1.5 text-center shadow-sm">
         <p className="text-xs font-semibold text-text-secondary">
          {month}
         </p>
         <p className="text-lg font-bold leading-none text-text">
          {day}
         </p>
      </div>
      <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-[#EEF2FF]">
          <Heart
            size={18}
            className="text-text"
            />
         </button>
      </div>
      <div className="p-4">
       <span className=" inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-primary">
          {category}
       </span>
        <h2 className="mt-3 line-clamp-1 text-lg font-bold text-text">
         {title}
        </h2>
        <div className="mt-2 flex items-center gap-1.5 texte-sm text-text-secondary">
        <MapPin size={14}/>
        <span>{location}</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
        <Star
        size={15}
        className="fill-yellow-400 text-yellow"/>
        <span className="text-sm font-semibold text-text">
         {rating}
        </span>
        <span className="text-sm text-text-secondary">
          /5
        </span>
      </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 px-4 pb-4">
        <p className="text-lg font-bold text-text">
            ₹{price}
        </p>
        <button className="rounded-lg bg-primary px-4 py-2  text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          Book Now
        </button>
      </div>
   </div>
    );
}
export default EventCard;