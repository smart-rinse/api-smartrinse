import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { nanoid } from "nanoid";
import Users from "./userModel.js";
import Owner from "./ownerModel.js";

const { DataTypes } = Sequelize;

const Laundry = db.define(
  "laundry",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => `laundry-${nanoid(10)}`,
    },
    nama_laundry: {
      type: DataTypes.STRING,
    },
    tanggal_berdiri: {
      type: DataTypes.DATEONLY,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    jam_buka: {
      type: DataTypes.STRING,
    },
    jam_tutup: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.TEXT,
    },
    average_rating: {
      type: DataTypes.FLOAT,
    },
    average_sentiment: {
      type: DataTypes.FLOAT,
    },
    count_reviews: {
      type: DataTypes.INTEGER,
    },
    rekening: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "laundry",
    timestamps: false,
  }
);

Users.hasMany(Laundry, {
  foreignKey: "userId",
  as: "laundries",
});

Laundry.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

export default Laundry;
