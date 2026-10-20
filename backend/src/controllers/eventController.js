import Event from "../models/Event.js";
export const createEvent = async(req,res)=>{
  try{
    const{
      title,
      description,
      category,
      artist,
      location,
      date, 
      image, 
      price,
      totalSeats,
    } =req.body;
    const isValidDate = date && !Number.isNaN(Date.parse(date));
    const isValidPrice = 
    price !=="" &&
    price !== null &&
    Number.isFinite(Number(price)) &&
    Number(price) >= 0;
    const isValidSeats =
    totalSeats !=="" &&
    totalSeats !== null &&
    Number.isInteger(Number(totalSeats)) &&
    Number(totalSeats) >= 1;
    if(
      !title?.trim()||
      !description?.trim()||
      !category?.trim()||
      !location?.trim()||
      !isValidDate||
      !isValidPrice||
      !isValidSeats
     ) {
      return res.status(400).json({
        success:false,
        message:"Please provide valid event details",
      });
   }
   if(!req.user?._id) {
    return res.status(401).json({
      success:false,
      message:"Authentication required",
    });
  }
   const event = await Event.create({
    title,
    description,
    category,
    artist,
    location,
    date,
    image,
    price,
    totalSeats,
    availableSeats:totalSeats,
    organizer:req.user._id,
   });
   return res.status(201).json({
    success:true,
    message:"Event created successfully",
    data:event,
   });
  } catch(error){
    if(error.name === "ValidationError"|| error.name ==="CastError"){
      return res.status(400).json({
        success:false,
        message:error.message,
      });
    }
    console.error("Create event error:",error);
    return res.status(500).json({
      success:false,
      message:"Internal server error",
    });
  }
};
export const getAllEvents = async(req,res)=>{
  try{
    const{search,category}=req.query;
    const filter={};
    if(category){
      filter.category = category;
    }
    if(search){
     const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        {title:{ $regex: safeSearch, $options:"i"} },
        {location:{ $regex:safeSearch, $options:"i"} },
        {description:{$regex: safeSearch,$options:"i"}},
        {artist:{ $regex: safeSearch, $options:"i"}},
        ];
      }
     const events = await Event.find(filter).sort({date:1});
     return res.status(200).json({
      success:true,
      count:events.length,
      data:events,
     });
    }catch(error){
      console.error("Get events error:",error);
      return res.status(500).json({
        success:false,
        message:"Internal server error",
      });
    }
  };