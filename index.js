import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
import Laundry from "./models/laundryModel.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected');
    
} catch (error) {
    console.error(error);
}

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("API Ready To GO!");
  });
app.use(router);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
