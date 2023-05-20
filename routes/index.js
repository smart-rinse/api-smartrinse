import express from "express";
import { Register, getUsers, Login, Logout, getUserById, changePassword, editUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { createLaundry, getLaundry, getLaundryById } from "../controllers/laundry.js";
import { getArticle } from "../controllers/articles.js";
import { uploadImage } from "../controllers/uploadImage.js";
import Multer from "multer";
import imgUpload from "../models/imgUpload.js";

export const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/register", Register);
router.put("/editPassword/:id", verifyToken, changePassword);
router.put("/editUser/:id", verifyToken, editUser);

router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.get("/laundry", getLaundry);
router.get("/laundry/:id", getLaundryById);
router.post("/laundry/create", verifyToken, multer.single("photo"), imgUpload.uploadToGcs, createLaundry);

router.get("/article", getArticle);

router.post("/uploadImage", multer.single("image"), imgUpload.uploadToGcs, uploadImage);

export default router;
