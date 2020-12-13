import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import socketio from "socket.io";
// mongo connection
import "./config/mongo.js";
// socket configuration
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import chatRoomRouterOneToOne from "./routes/chatRoomOneToOne.js";
import deleteRouter from "./routes/delete.js";

const app = express();

const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/room", chatRoomRouter);
app.use("/roomonetoone", chatRoomRouterOneToOne);
app.use("/delete", deleteRouter);

app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

const server = http.createServer(app);
/** Create socket connection */
global.io = socketio.listen(server);
global.io.on("connection", () => {
  console.log("socket connected");
});
server.listen(port, () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
