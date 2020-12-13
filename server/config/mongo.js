import mongoose from "mongoose";

const CONNECTION_URL = "mongodb://localhost:27017/chatdb";

mongoose.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MongoDB has connected succesfully");
  }
);
