import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
import Owner from "./models/ownerModel.js";
import Laundry from "./models/laundryModel.js";
import Users from "./models/userModel.js";
import Service from "./models/serviceModel.js";
import Review from "./models/reviewModel.js";
import Favorite from "./models/favoriteModel.js";
import Transaction from "./models/transactionModel.js";
import TransactionService from "./models/transactionServiceModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.error(error);
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("API Ready");
});
app.use(router);

const PORT = process.env.PORT || 8000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
