// ==================== //
// ===== Language ===== //
// ==================== //

// Language Table
// Default Language for APP
// Multiple Language use || not use in APP
// Direction Left => Right // Right => Left
// DataBase
import { DataTypes, Model } from "sequelize";
import db from "../../config/db";

export interface Language {
  id: string;
  name: string;
  direction: string;
  active: boolean;
  default: boolean;
}

export class C_Language extends Model<Language> {}

C_Language.init(
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    direction: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "C_Language",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);

// C_Language.sync({ alter: true })
