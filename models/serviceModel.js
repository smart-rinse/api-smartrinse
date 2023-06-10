import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { nanoid } from "nanoid";
import Users from "./userModel.js";
import Laundry from "./laundryModel.js";
import Transaction from "./transactionModel.js";
import TransactionService from "./transactionServiceModel.js";
import Owner from "./ownerModel.js";

const { DataTypes } = Sequelize;

const Service = db.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jenis_service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Service.belongsTo(Owner, { foreignKey: "ownerId" });
Users.hasMany(Service, { foreignKey: "ownerId" });

Service.belongsTo(Laundry, { foreignKey: "laundryId" });
Laundry.hasMany(Service, { foreignKey: "laundryId" });

Service.hasMany(TransactionService, { foreignKey: "serviceId" });
TransactionService.belongsTo(Service, { foreignKey: "serviceId" });

export default Service;
