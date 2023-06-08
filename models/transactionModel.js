import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";
import Laundry from "./laundryModel.js";
import TransactionService from "./transactionServiceModel.js";
import { generateTransactionNumber } from "../helper/utils.js";

const { DataTypes } = Sequelize;

const Transaction = db.define("Transaction", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue:() => generateTransactionNumber(),
  },
  // transactionNumber: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  transactionDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false,
});

Transaction.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Transaction, { foreignKey: "userId" });

Transaction.belongsTo(Laundry, { foreignKey: "laundryId" });
Laundry.hasMany(Transaction, { foreignKey: "laundryId" });

Transaction.hasMany(TransactionService, { foreignKey: "transactionId" });
TransactionService.belongsTo(Transaction, { foreignKey: "transactionId" });


export default Transaction;
