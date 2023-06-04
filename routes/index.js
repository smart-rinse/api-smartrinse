import express from "express";
import { Register, getUsers, Login, Logout, getUserById, changePassword, editUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { createLaundry, getLaundry, getLaundryById, searchLaundry, filterLaundryByRating, getLaundryBySentiment } from "../controllers/laundry.js";
import { getArticle } from "../controllers/articles.js";
import { uploadImage } from "../controllers/uploadImage.js";
import Multer from "multer";
import imgUpload from "../helper/imgUpload.js";
import { createReview } from "../controllers/review.js";
import { faqApps } from "../controllers/faq.js";
import { createFavoriteLaundry, getLaundryByFavorite, removeFavoriteLaundry } from "../controllers/favorite.js";
import { createService } from "../controllers/service.js";
import { createTransaction, getTransactionById } from "../controllers/transaction.js";


export const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/register", Register);
router.put("/editPassword/:id", verifyToken, changePassword);
router.put("/editUser/:id", verifyToken, multer.single("photo"), imgUpload.uploadToGcs, editUser);

router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.get("/laundry", getLaundry);
router.get("/laundry/sentiment", getLaundryBySentiment);
router.get("/laundry/:id", getLaundryById);
router.post("/laundry/create", verifyToken, multer.single("photo"), imgUpload.uploadToGcs, createLaundry);
router.post("/service/:id", verifyToken, createService);
router.post("/laundry/:id/review", verifyToken, createReview);
router.get("/search", searchLaundry);
router.get("/rating", filterLaundryByRating);

//Favorite
router.post("/favorite/:id", verifyToken, createFavoriteLaundry);
router.get("/favorite/laundry", verifyToken, getLaundryByFavorite);
router.delete('/favorite/delete/:id', verifyToken, removeFavoriteLaundry)

router.post("/transaction/:id", verifyToken, createTransaction);
router.get("/transaction/get/:id", verifyToken, getTransactionById);
// router.get("/invoice/:id", verifyToken, getInvoice);

router.get("/article", getArticle);
router.get("/faq", faqApps);


router.post("/uploadImage", multer.single("image"), imgUpload.uploadToGcs, uploadImage);

export default router;
