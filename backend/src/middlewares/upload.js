import  multer from "multer";
const allowedMinimumTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
];
const storage = multer.memoryStorage();
const fileFilter =(req,file,callback) => {
    if(!allowedMinimumTypes.includes(file.mimetype)){
        return callback(
            new Error("Only JPEG,PNG,WEBP images are allowed!")
        );
    }
    callback(null,true);
}
const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 5*1024*1024,
        files:1,
    },
});
export const uploadSingleEventImage = upload.single("image");