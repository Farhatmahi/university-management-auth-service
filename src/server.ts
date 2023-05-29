import mongoose from "mongoose";
import app, { PORT } from "./app";
import config from "./config";

async function connect() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected to MongoDB");

    app.listen(config.port, () => {
      console.log(`Listening on PORT : ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
connect();
