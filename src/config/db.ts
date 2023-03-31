// FINISH 01 / 03 / 2023
import { Sequelize } from "sequelize";

const db = new Sequelize({
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
db.sync(
  { alter: true }
  // { force: false }
);
db.query("PRAGMA foreign_keys = true;"); // === Start Foreign Keys in SQLite

export default db;
