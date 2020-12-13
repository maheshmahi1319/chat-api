import ChatRoomModel from "../models/ChatRoom.js";
import ChatMessageOneToOneModel from "../models/ChatMessageOneToOne.js";
import UserModel from "../models/User.js";
import moment from "moment";
export default {
  initiate: async (req, res) => {
    console.log(req.body);
    try {
      const { userIds } = req.body;
      const { userId: chatInitiator } = req;
      const allUserIds = [...userIds, chatInitiator];
      const chatRoom = await ChatRoomModel.initiateChat(
        allUserIds,
        chatInitiator
      );
      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      const post = await ChatMessageModel.createPostInChatRoom(
        roomId,
        messagePayload,
        currentLoggedUser
      );
      global.io.sockets.in(roomId).emit("new message", { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
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
  getRecentConversation: async (req, res) => {
    try {
      const currentLoggedUser = req.userId;
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser);
      const roomIds = rooms.map((room) => room._id);
      const recentConversation = await ChatMessageModel.getRecentConversation(
        roomIds,
        options,
        currentLoggedUser
      );
      return res
        .status(200)
        .json({ success: true, conversation: recentConversation });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  getConversationByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }
      const users = await UserModel.getUserByIds(room.userIds);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const conversation = await ChatMessageModel.getConversationByRoomId(
        roomId,
        options
      );
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
      console.log(res.body);
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  markConversationReadByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }

      const currentLoggedUser = req.userId;
      const result = await ChatMessageModel.markMessageRead(
        roomId,
        currentLoggedUser
      );
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },
};
