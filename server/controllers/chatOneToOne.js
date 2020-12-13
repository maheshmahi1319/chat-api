import ChatRoomModel from "../models/ChatRoom.js";
import ChatMessageOneToOneModel from "../models/ChatMessageOneToOne.js";
import UserModel from "../models/User.js";
import moment from "moment";
export default {
  postMessageToUser: async (req, res) => {
    try {
      const { roomId } = req.params;
      const messagePayload = {
        messageText: req.body.messageText,
        msgFrom: req.body.msgFrom,
        msgTo: req.body.msgTo,
      };
      const post = await ChatMessageOneToOneModel.createPostInChatRoom(
        roomId,
        messagePayload,
        req.body.msgFrom
      );
      global.io.sockets.in(roomId).emit("new message", { message: post });
      console.log(post);
      return res.status(200).json({ success: true, post: post });
    } catch (error) {}
  },
};
