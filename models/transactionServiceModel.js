import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Service from "./serviceModel.js";

const { DataTypes } = Sequelize;

const TransactionService = db.define(
  "TransactionService",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

TransactionService.associate = (models) => { 
  TransactionService.belongsTo(Service, { foreignKey: "serviceId" });
  Service.hasMany(TransactionService, { foreignKey: "serviceId" });
};

export default TransactionService;
