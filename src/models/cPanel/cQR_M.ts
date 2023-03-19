// =================== //
// === QR Server ===== //
// =================== //

import { DataTypes, Model } from "sequelize";
import db from "../../config/db";
export interface QR {
  wifiName: string;
  wifiImage: string;
  wifiPass: string;
  wifiType: string;
  wifiHidden: boolean;
  serverURL: string;
}

export class C_QR extends Model<QR> {
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

C_QR.init(
  {
    wifiName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    wifiImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
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
      allowNull: true,
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
