import express from "express";
import { Register, getUsers, Login, Logout, getUserById } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { getLaundry, getLaundryById, laundry } from "../controllers/laundry.js";
import { getArticle } from "../controllers/articles.js";
import Multer from "multer";
import imgUpload from "../models/imgUpload.js";

export const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", Register);

router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.get("/laundry", getLaundry);
router.get("/laundry/:id", getLaundryById);
router.post('/laundry',multer.single('photo'),imgUpload.uploadToGcs, laundry);

router.get("/article", getArticle);


export default router;
