"use strict";
// ==================== //
// ===== Language ===== //
// ==================== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_Language = void 0;
/**
 * Language Table
 * Default Language for APP
 * Multiple Language use || not use in APP
 * Direction Left => Right // Right => Left
 * DataBase
 */
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class C_Language extends sequelize_1.Model {
}
exports.C_Language = C_Language;
C_Language.init({
    id: {
        type: sequelize_1.DataTypes.TEXT,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
    direction: {
        type: sequelize_1.DataTypes.TEXT,
        unique: false,
        allowNull: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    default: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "C_Language",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
// C_Language.sync({ alter: true })
