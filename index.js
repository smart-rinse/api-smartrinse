import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import Users from "./models/userModel.js";
import Review from "./models/reviewModel.js";
import Laundry from "./models/laundryModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
  await Users.sync();
  await Laundry.sync();
  await Review.sync();
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

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
