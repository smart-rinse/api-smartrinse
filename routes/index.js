import express from "express";
import { Register, getUsers, Login, Logout, getUserById, changePassword, editUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { createLaundry, getLaundry, getLaundryById, searchLaundry, filterLaundryByRating, getLaundryBySentiment, getLaundryByOwner } from "../controllers/laundry.js";
import { getArticle } from "../controllers/articles.js";
import { uploadImage } from "../controllers/uploadImage.js";
import Multer from "multer";
import imgUpload from "../helper/imgUpload.js";
import { createReview } from "../controllers/review.js";
import { faqApps } from "../controllers/faq.js";
import { createFavoriteLaundry, getLaundryByFavorite, removeFavoriteLaundry } from "../controllers/favorite.js";
import { createService } from "../controllers/service.js";
import { createTransaction, editTransactionById, getOrdersByOwner, getTransactionById, getTransactionByUser, updateTransactionStatus } from "../controllers/transaction.js";
import { setFolderLaundry, setFolderOwner, setFolderUser } from "../middleware/folderMiddleware.js";
import { LoginOwner, LogoutOwner, RegisterOwner, changePasswordOwner, editOwner, getOwnerById, getOwners } from "../controllers/owner.js";

export const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

const router = express.Router();

//User
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/register", Register);
router.put("/editPassword/:id", verifyToken, changePassword);
router.put("/editUser/:id", verifyToken, multer.single("photo"), setFolderUser, imgUpload.uploadToGcs, editUser);

router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//Laundry
router.get("/laundry", getLaundry);
router.get("/laundry/sentiment", getLaundryBySentiment);
router.get("/laundry/:id", getLaundryById);
router.post("/laundry/create", verifyToken, multer.single("photo"), setFolderLaundry, imgUpload.uploadToGcs, createLaundry);
router.post("/service/:id", verifyToken, createService);
router.post("/laundry/:id/review", verifyToken, createReview);
router.get("/search", searchLaundry);
router.get("/rating", filterLaundryByRating);

//Favorite
router.post("/favorite/:id", verifyToken, createFavoriteLaundry);
router.get("/favorite/laundry", verifyToken, getLaundryByFavorite);
router.delete("/favorite/delete/:id", verifyToken, removeFavoriteLaundry);

//Transaction
router.post("/transaction/:id", verifyToken, createTransaction);
router.get("/transaction/:id", verifyToken, getTransactionById);
router.get("/transaction", verifyToken, getTransactionByUser);
router.get("/owner/transaction", verifyToken, getOrdersByOwner);
router.put("/transaction/:id", verifyToken, editTransactionById);
router.put("/owner/status/:id", verifyToken, updateTransactionStatus)

//owner
router.get("/owners", verifyToken, getOwners);
router.get("/owner/:id", verifyToken, getOwnerById);
router.get("/token", refreshToken);
router.get("/owner/get/laundry", verifyToken,getLaundryByOwner);
router.post("/owner/register", RegisterOwner);
router.post("/owner/login", LoginOwner);
router.delete("/logout", LogoutOwner);
router.put("/owner/editPassword/:id", verifyToken, changePasswordOwner);
router.put("/owner/editOwner/:id", verifyToken, multer.single("photo"), setFolderOwner, imgUpload.uploadToGcs, editOwner);

//Article, FAQ
router.get("/article", getArticle);
router.get("/faq", faqApps);
router.post("/uploadImage", multer.single("image"), imgUpload.uploadToGcs, uploadImage);

export default router;
