"use strict";
// =============== //
// == Item Type == //
// =============== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V_ItemTypesLanguage = exports.V_ItemTypes = void 0;
/**
 * Item Type it`s Lv.1 of Menu
 * It includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for ItemTypes
 * Active ItemTypes || Not
 * Note :: For ItemType,
 *      the Name of ItemType must be included but Body isn't required
 */
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class V_ItemTypes extends sequelize_1.Model {
}
exports.V_ItemTypes = V_ItemTypes;
V_ItemTypes.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
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
}, {
    sequelize: db_1.default,
    tableName: "V_ItemTypes",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
class V_ItemTypesLanguage extends sequelize_1.Model {
}
exports.V_ItemTypesLanguage = V_ItemTypesLanguage;
V_ItemTypesLanguage.init({
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
    tableName: "V_ItemTypesLanguage",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
// V_ItemTypesLanguage.sync({ alter: true })
// === ItemTypesLanguage DB === //
/**
 * Used to Get Info from Both Tables
 */
V_ItemTypes.hasMany(V_ItemTypesLanguage, {
    as: "info",
    foreignKey: "ItemTypeID",
    sourceKey: "id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
V_ItemTypesLanguage.belongsTo(V_ItemTypes, {
    foreignKey: "ItemTypeID",
    targetKey: "id",
});
