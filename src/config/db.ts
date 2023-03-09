// FINISH 01 / 03 / 2023
import { Sequelize } from "sequelize";

const db= new Sequelize({
    storage:"./public/db/menu.sqlite",
    dialect:"sqlite",
})
db.sync(
    { alter: true },
    // { force: false }
)
export default db;
