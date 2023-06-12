import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";
import Laundry from "./laundryModel.js";

const { DataTypes } = Sequelize

const Favorite = db.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Favorite.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Favorite, { foreignKey: 'userId' });

Favorite.belongsTo(Laundry, { foreignKey: 'laundryId' });
Laundry.hasMany(Favorite, { foreignKey: 'laundryId' });

export default Favorite;
