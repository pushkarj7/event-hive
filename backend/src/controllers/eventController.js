import mongoose from "mongoose";
import Event from "../models/Event.js";
import { deleteEventImage } from "../services/imagekitService.js";
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
      imageFileId,
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
    imageFileId,
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
export const getAllEvents = async (req, res) => {
  try {
    const { search, category, city } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 50)
    );
    const skip = (page - 1) * limit;
    const filter = {};

    if (category && category.toLowerCase() !== "all") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (city && city.toLowerCase() !== "all locations" && city.toLowerCase() !== "all") {
      filter.location = { $regex: city, $options: "i" };
    }

    if (search?.trim()) {
      const safeSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { location: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
        { artist: { $regex: safeSearch, $options: "i" } },
      ];
    }
    const [events, total] = await Promise.all([
      Event.find(filter)
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit),
      Event.countDocuments(filter),
    ]);
    return res.status(200).json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get events error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
  export const getEventById = async (req,res) => {
    try{
      const {id}=req.params;
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
          success:false,
          message:"Invalid event ID",
        });
      }
      const event =await Event.findById(id);
      if(!event){
        return res.status(404).json({
          success:false,
          message:"Event not found",
        });
      }
      return res.status(200).json({
        success:true,
        data:event,
      });
    }catch(error){
      return res.status(500).json({
        success:false,
        message:"Internal server error",
      });
    }
  };
  export const updateEvent = async(req,res) => {
    try{
      const{id} = req.params;
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
          success: false,
          message:"Invalid event id",
        });
      }
      const event = await Event.findById(id);
      if(!event){
        return res.status(404).json({
          success:false,
          message:"Event not found",
        });
      }
      const isOwner = event.organizer && req.user?._id && event.organizer.toString() === req.user._id.toString();
      const isAdmin = req.user?.role === "admin";
      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to update this event",
        });
      }
       const allowedFields=[
        "title",
        "description",
        "category",
        "artist",
        "location",
        "date",
        "image",
        "price",
        "totalSeats",
        "status",
       ];
       const stringFields = [
        "title",
        "description",
        "category",
        "artist",
        "location",
        "image",
       ];
       const updates = {};
       const body = req.body ?? {};
       for(const field of allowedFields){
        if(Object.hasOwn(body,field)){
          updates[field] = body[field];
        }
       }
       for(const field of stringFields){
        if(Object.hasOwn(updates,field)){
          const value = updates[field];
          if(
            typeof value  !== "string" ||
            (field !== "artist" && field !== "image" &&
            !value.trim())
          ){
            return res.status(400).json({
              success: false,
              message: `Invalid value for ${field}`,
            });
          }
          updates[field] = value.trim();
        }
       }
       if (Object.hasOwn(updates,"date")){
        if(
          typeof updates.date !== "string" &&
          !(updates.date instanceof Date)
        ){
          return res.status(400).json({
            success:false,
            message:"Invalid event date",
          });
        }
        const parsedDate = new Date(updates.date);
        if(Number.isNaN(parsedDate.getTime())){
          return res.status(400).json({
            success:false,
            message:"Invalid event date",
          });
        }
        updates.date = parsedDate;
       }
       if(Object.hasOwn(updates,"price")){
        const price = updates.price;
        if(
          price ==="" ||
          price === null ||
          typeof price ==="boolean" ||
          !Number.isFinite(Number(price)) ||
          Number(price) < 0
        ){
          return res.status(400).json({
            success:false,
            message:"Price must be a non negative number",
          });
        }
        updates.price = Number(price);
       }
       if(Object.hasOwn(updates,"totalSeats")){
        const seats = updates.totalSeats;
        if(
          seats === "" ||
          seats === null ||
          typeof seats === "boolean" ||
          !Number.isInteger(Number(seats)) ||
          Number(seats)<1
        ){
          return res.status(400).json({
            success:false,
            message:"Seats must be a positive integer",
          });
        }
         const newTotalSeats = Number(seats);
      const bookedSeats = event.totalSeats - event.availableSeats;

      if (newTotalSeats < bookedSeats) {
        return res.status(400).json({
          success: false,
          message: "Total seats cannot be less than already booked seats",
        });
      }
      updates.totalSeats = newTotalSeats;
      updates.availableSeats = newTotalSeats - bookedSeats;
    }
    if (
      Object.hasOwn(updates, "status") &&
      !["upcoming", "cancelled", "completed"].includes(updates.status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid event status",
      });
    }
    Object.assign(event, updates);
    await event.save();
    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
   } catch (error) {
    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Update event error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    }
  };
export const deleteEvent = async(req,res) => {
  try{
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid event ID.",
      });
    }
    const event = await Event.findById(id);
    if(!event){
      return res.status(404).json({
        success:false,
        message:"Event not found.",
      });
    }
    const isOwner = event.organizer && req.user?._id && event.organizer.toString() === req.user._id.toString();
    const isAdmin = req.user?.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this event.",
      });
    }
    // Industry Standard: If tickets have been booked, soft-cancel rather than hard-deleting
    const hasBookings = event.totalSeats && event.availableSeats < event.totalSeats;
    if (hasBookings) {
      event.status = "cancelled";
      await event.save();
      return res.status(200).json({
        success: true,
        message: "Event has active bookings — safely marked as cancelled to preserve records.",
        data: event,
      });
    }

    await Event.findByIdAndDelete(id);
    if(event.imageFileId){
      try{
        await deleteEventImage(event.imageFileId);
      }catch(imageError){
        console.error("Event deleted,but ImageKit cleanup failed:",imageError.message);
      }
    }
    return res.status(200).json({
      success:true,
      message:"Event deleted successfully.",
    });

}catch(error){
  console.error("Delete event error:",error);
  return res.status(500).json({
    success:false,
    message:"Internal server error.",
  });
 }
};