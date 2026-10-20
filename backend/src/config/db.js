import mongoose from "mongoose";  
import { DB_NAME } from "../constant.js";

const connectDB = async()=>{
try{
  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
  console.log(`MONGODB connected || DB HOST : ${mongoose.connection.host}`);
}
catch(error)
{
  console.log("MONGODB connection error",error);
}
};
export default connectDB;