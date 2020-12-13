import express from "express";
// controllers
import chatRoom from "../controllers/chatRoom.js";
import chatRoomOneToOne from "../controllers/chatOneToOne.js";

const router = express.Router();

// router.get("/", chatRoom.getRecentConversation);
router.get("/:roomId", chatRoom.getConversationByRoomId);
router.post("/initiate", chatRoom.initiate);
router.post("/:roomId/message", chatRoom.postMessage);
router.post("/:roomId/messageonetoone", chatRoomOneToOne.postMessageToUser);
// router.post("/:userId/message", chatRoom.postMessageToUser);
router.put("/:roomId/mark-read", chatRoom.markConversationReadByRoomId);

export default router;
