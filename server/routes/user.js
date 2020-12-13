import express from "express";
// controllers
import user from "../controllers/user.js";

const router = express.Router();

router.get("/", user.onGetAllUsers);
router.post("/", user.onCreateUser);
router.get("/:id", user.onGetUserById);
router.delete("/:id", user.onDeleteUserById);

export default router;
