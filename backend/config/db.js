
import mongoose from "mongoose";
import "dotenv/config";

const dbUrl = process.env.MONGODB_URL;

const connectDB = async () => {
    await mongoose.connect(dbUrl)
        .then(() => console.log("DB is connected successfully!"))
        .catch((err) => console.log("Erron in connecting DB ", err?.message));
}

export default connectDB;