
import ImageKit from "@imagekit/nodejs";

const getImageKitClient = () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is missing in backend .env");
  }

  return new ImageKit({ privateKey });
};

export default getImageKitClient;
