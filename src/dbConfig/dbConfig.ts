import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

    if (!uri) {
      throw new Error("Please define MONGODB_URI");
    }
    mongoose.connect(uri);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connection established");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
