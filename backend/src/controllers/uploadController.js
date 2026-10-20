import { uploadEventImage, deleteEventImage } from "../services/imagekitService.js";
export const uploadEventImageController = async(req,res) => {
  let uploadedImage;   
  try{
    if(!req.file){
        return res.status(400).json({
            success:false,
            message:"Please select an image",
        });
    }
    uploadedImage = await uploadEventImage(
        req.file.buffer,
        req.file.originalname
    );
    return res.status(200).json({
        success:true,
        message:"Image uploaded successfully",
        data:{
            url: uploadedImage.url,
            fileId: uploadedImage.fileId,
        },
    });
  }catch(error){
    if(uploadedImage?.fileid){
      try{
        await deleteEventImage(uploadedImage.fileId);
      }catch(cleanupError){
        console.error("Image cleanup failed:",cleanupError.message);
      }
    }
    console.error("Image upload error:",error.message);
    return res.status(500).json({
        success:false,
        message:"Unable to upload image",
    });
  }
};
