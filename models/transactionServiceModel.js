import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Service from "./serviceModel.js";
import Transaction from "./transactionModel.js";

const { DataTypes } = Sequelize;

const TransactionService = db.define(
  "TransactionService", // Ubah nama tabel menjadi "TransactionService"
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transactionNumber: {
      type: DataTypes.STRING,
      allowNull: false,
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

TransactionService.associate = (models) => { // Hapus deklarasi variabel models
  TransactionService.belongsTo(Service, { foreignKey: "serviceId" }); // Menggunakan Service langsung
  Service.hasMany(TransactionService, { foreignKey: "serviceId" }); // Menggunakan Service langsung
};

export default TransactionService;
