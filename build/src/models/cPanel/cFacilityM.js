"use strict";
// ==================== //
// ===== Facility ===== //
// ==================== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_Facility = void 0;
/**
 * Facility Name
 * Facility LOGO
 *
 * Facility DB include in Social Media Router
 * and in Social Media Frontend
 * and use the image in WIFI Network QR
 */
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class C_Facility extends sequelize_1.Model {
}
exports.C_Facility = C_Facility;
C_Facility.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        unique: false,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        unique: false,
        allowNull: true,
    },
    imgType: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "C_Facility",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
// C_Language.sync({ alter: true })
