"use strict";
// =============== //
// ==== Item ===== //
// =============== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V_ItemsLanguage = exports.V_Items = void 0;
/**
 * Items it`s Lv.2 of Menu
 * It`s includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Items
 * Active Items || Not
 * Note :: For Items,
 *      the Name & Body of Items must be included
 */
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
const ItemTypeM_1 = require("./ItemTypeM");
class V_Items extends sequelize_1.Model {
}
exports.V_Items = V_Items;
V_Items.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    ItemTypeID: {
        type: sequelize_1.DataTypes.UUID,
        unique: false,
        allowNull: true,
    },
    listNum: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        unique: false,
        allowNull: false,
    },
    imgType: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        unique: false,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "V_Items",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
class V_ItemsLanguage extends sequelize_1.Model {
}
exports.V_ItemsLanguage = V_ItemsLanguage;
V_ItemsLanguage.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    ItemsID: {
        type: sequelize_1.DataTypes.UUID,
        unique: false,
        allowNull: true,
    },
    lang: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "V_ItemsLanguage",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
// V_ItemTypesLanguage.sync({ alter: true })
// === ItemTypesLanguage DB === //
/**
 * Used to Get Info from Both Tables
 */
V_Items.hasMany(V_ItemsLanguage, {
    as: "info",
    foreignKey: "ItemsID",
    sourceKey: "id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
V_ItemsLanguage.belongsTo(V_Items, {
    foreignKey: "ItemsID",
    targetKey: "id",
});
V_Items.belongsTo(ItemTypeM_1.V_ItemTypes, {
    foreignKey: "ItemTypeID",
    targetKey: "id",
});
