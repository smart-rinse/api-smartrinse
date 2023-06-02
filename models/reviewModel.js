import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Laundry from "./laundryModel.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Review = db.define(
  "review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    sentiment: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "review",
    timestamps: false,
  }
);

Laundry.hasMany(Review, {
  foreignKey: "laundryId",
  as: "reviews",
});

Review.belongsTo(Laundry, {
  foreignKey: "laundryId",
  as: "laundry",
});

Review.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

export default Review;
