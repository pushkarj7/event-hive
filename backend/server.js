import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initDefaultAdmin } from "./src/utils/initAdmin.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await initDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }); 
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};
startServer();
