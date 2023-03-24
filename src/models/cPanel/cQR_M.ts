// =================== //
// === QR Server ===== //
// =================== //

import { DataTypes, Model } from "sequelize";
import db from "../../config/db";
export interface QR {
  id: any;
  wifiName: string;
  // wifiImage: string;
  wifiPass: string;
  wifiType: string;
  wifiHidden: boolean;
  serverURL: string;
}

export class C_QR extends Model<QR> {}

C_QR.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    wifiName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // wifiImage: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
    wifiPass: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    wifiType: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    wifiHidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    serverURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "C_QR",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);

// C_QR.sync({ alter: true })
