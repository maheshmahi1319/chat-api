import express from "express";
// controllers
import chatRoomOneToOne from "../controllers/chatOneToOne.js";

const router = express.Router();

router.post("/:roomId/messageonetoone", chatRoomOneToOne.postMessageToUser);

export default router;
