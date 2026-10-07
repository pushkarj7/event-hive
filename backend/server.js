import mongoose from "mongoose";
 
(async ()=>
{
  try{
    await mongoose.connect(process.env.MONGODB_URL);
  }catch(error)
  {
    console.log(error);
  }  
}
)();