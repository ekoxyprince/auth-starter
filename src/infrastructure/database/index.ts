import mongoose from "mongoose";
import config from "../../config";

const connectToDb = () => {
  return mongoose
    .connect(config.database_uri!, {
      dbName: config.database,
    })
    .then((connected) => {
      console.log("Connected to database");
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default connectToDb;
