import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { nanoid } from "nanoid";

const { DataTypes } = Sequelize;

const Laundry = db.define('laundry', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => `laundry-${nanoid(10)}`
      },
    nama_laundry:{
        type : DataTypes.STRING
    },
    tanggal_berdiri:{
        type : DataTypes.DATE
    },
    kota:{
        type : DataTypes.STRING
    },
    latitude:{
        type : DataTypes.STRING
    },
    longitude:{
        type : DataTypes.STRING
    },
    photo:{
        type : DataTypes.TEXT
    },
},{
    freezeTableName:true
});

export default Laundry;