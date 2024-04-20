"use strict";
// =============== //
// ==== Events === //
// =============== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V_EventsLanguage = exports.V_Events = void 0;
/**
 * EVENTS && EVENTS Languages Tables
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Events
 * Active Event || Not
 * Note :: For Event,
 *      the Name of Event must be included but Body isn't required
 */
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class V_Events extends sequelize_1.Model {
}
exports.V_Events = V_Events;
V_Events.init({
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
    tableName: "V_Events",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
class V_EventsLanguage extends sequelize_1.Model {
}
exports.V_EventsLanguage = V_EventsLanguage;
V_EventsLanguage.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    EventID: {
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
    tableName: "V_EventsLanguage",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
});
// V_EventsLanguage.sync({ alter: true })
// === EventsLanguage DB === //
/**
 * Used to Get Info from Both Tables
 */
V_Events.hasMany(V_EventsLanguage, {
    as: "info",
    foreignKey: "EventID",
    sourceKey: "id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
V_EventsLanguage.belongsTo(V_Events, {
    foreignKey: "EventID",
    targetKey: "id",
});
