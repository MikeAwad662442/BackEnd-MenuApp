"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// FINISH 01 / 03 / 2023
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize({
    storage: "./public/db/menu.sqlite",
    dialect: "sqlite",
});
/**
 * FIX
 * [ERROR] SequelizeForeignKeyConstraintError: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed
 */
/**
 * Because Foreign Key in SQLite not build in
 * for that Sequelize it always have error in sync database
 */
db.query("PRAGMA foreign_keys = false;"); // === Stop Foreign Keys us before scan for SQLite
db.sync({ alter: true }
// { force: false }
);
db.query("PRAGMA foreign_keys = true;"); // === Start Foreign Keys in SQLite
exports.default = db;
