import User from "../models/User.js";
export const requireOrganizer = async (req,res,next) => {
    try{
        const user = await User.findById(req.userId).select("role isActive");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found. Please try again."
            });
        }
        if(!user.isActive){
            return res.status(403).json({
                success:false,
                message:"Your account is inactive.",
            })
        }
        if(!["organizer","admin"].includes(user.role)){
            return res.status(403).json({
                success:false,
                message:"Only organizers can perform this task",
            });
        }
        req.user = user;
        next();
    }catch(error){
        next(error);
    }
};
