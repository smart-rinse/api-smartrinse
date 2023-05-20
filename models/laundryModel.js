import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { nanoid } from "nanoid";
import Users from "./userModel.js";

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
    kota: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    jam_operasional: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.TEXT,
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
