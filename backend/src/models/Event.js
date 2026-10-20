import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
{
  title:{
    type:String,
    required:[true,"Event title is required"],
    trim:true,
    maxlength:150,
  },
  description:{
    type:String,
    required:[true,"Event description is required"],
    trim:true,
  },
  category:{
    type:String,
    required:[true,"Event category is required"],
    trim:true,
  },
  artist:{
    type:String,
    trim:true,
    default:""
  },
  location:{
    type:String,
    required:[true,"Event location is required"],
    trim:true,
  },
  date:{
    type:Date,
    required:[true,"Event date is required"],
  },
  image:{
    type:String,
    default:"",
  },
  price:{
    type:Number,
    required:true,
    min:0,
  },
  totalSeats:{
    type:Number,
    required:true,
    min:1,
  },
  availableSeats:{
    type:Number,
    required:true,
    min:0,
  },
  organizer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  status:{
    type:String,
    enum:["upcoming","cancelled","completed"],
    default:"upcoming",
  },
},
 {
  timestamps:true,
 }
);
const Event = mongoose.model("Event",eventSchema);
export default Event;