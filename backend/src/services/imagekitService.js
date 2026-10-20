import {toFile} from "@imagekit/nodejs";
import getImageKitClient from "../config/imagekit.js";
export const uploadEventImage = async(fileBuffer,originalName) =>{
    if(!fileBuffer || !originalName) {
        throw new Error("Image file is required");
    }
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g,"_");
    const fileName = `event-${Date.now()}-${safeName}`;
    const client = getImageKitClient();
    const uploadedImage = await client.files.upload({
        file: await toFile(fileBuffer,fileName),
        fileName,
        folder: "event-hive/events",
    });
    return{
        url:uploadedImage.url,
        fileId: uploadedImage.fileId,
    };
};
export const deleteEventImage = async(fileId) => {
    if(!fileId){
      throw new Error("Image file ID is required for deletion");
    }
    const client = getImageKitClient();
    await client.files.delete(fileId);
    return true;
};
