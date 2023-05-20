import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { nanoid } from "nanoid";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => `user-${nanoid(10)}`,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isLaundry: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


export default Users;
