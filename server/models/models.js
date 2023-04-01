const sequelize = require('./../db');
const {DataTypes} = require('sequelize');

const Flats = sequelize.define('flats',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    floor: {type: DataTypes.SMALLINT, unique: false, allowNull: false, validate: {isNumeric: true}},
    pos_on_floor: {type: DataTypes.SMALLINT, unique: false, allowNull: false, validate: {isNumeric: true}},
    price: {type: DataTypes.INTEGER, unique: false, allowNull: false, validate: {isNumeric: true}},
    rooms: {type: DataTypes.SMALLINT, unique: false, allowNull: false, validate: {isNumeric: true}},
    area_total: {type: DataTypes.REAL, unique: false, allowNull: false, validate: {isFloat: true}},
    area_kitchen: {type: DataTypes.REAL, unique: false, allowNull: true, validate: {isFloat: true}},
    area_live: {type: DataTypes.REAL, unique: false, allowNull: true, validate: {isFloat: true}},
    layout_image: {type: DataTypes.STRING, unique: false, allowNull: true, validate: {isUrl:true}}
});

module.exports = {Flats};