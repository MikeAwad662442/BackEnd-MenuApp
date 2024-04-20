"use strict";
// =================== //
// === QR Server ===== //
// =================== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_QR = void 0;
/**
 * QR Table
 * Import Facility LOGO
 * WIFI Info
 * Update INFO && PRINT
 */
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class C_QR extends sequelize_1.Model {
}
exports.C_QR = C_QR;
C_QR.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    wifiName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    // wifiImage: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
    wifiPass: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    wifiType: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    wifiHidden: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    serverURL: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "C_QR",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
// C_QR.sync({ alter: true })
