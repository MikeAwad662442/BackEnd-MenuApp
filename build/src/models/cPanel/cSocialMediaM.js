"use strict";
// ==================== //
// === Social Media === //
// ==================== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_SocialMedia = void 0;
/**
 * SocialMedia Table
 * add Social Media Icon && Links
 * Frond Page have SocialMedia && Facility
 */
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class C_SocialMedia extends sequelize_1.Model {
}
exports.C_SocialMedia = C_SocialMedia;
C_SocialMedia.init({
    id: {
        type: sequelize_1.DataTypes.TEXT,
        primaryKey: true,
        allowNull: true,
        unique: true,
    },
    icon: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    link: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "C_SocialMedia",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
// C_SocialMedia.sync({ alter: true })
