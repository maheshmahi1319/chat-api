import UserModel from "../models/User.js";

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.find();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.findOne({ _id: req.params.id });
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const result = req.body;
      const user = new UserModel(result);
      const savedUser = await user.save();
      console.log(savedUser);
      return res.status(200).json({ success: true, savedUser: savedUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
