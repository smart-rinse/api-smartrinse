import { Sequelize } from "sequelize";
import db from "../config/database.js";
import {nanoid} from "nanoid";

const {DataTypes} = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => `user-${nanoid(10)}`
      },
    name:{
        type : DataTypes.STRING
    },
    email:{
        type : DataTypes.STRING
    },
    password:{
        type : DataTypes.STRING
    },
    refresh_token:{
        type : DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default Users;