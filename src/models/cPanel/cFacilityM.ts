// ==================== //
// ===== Facility ===== //
// ==================== //

/**
 * Facility Name
 * Facility LOGO
 *
 * Facility DB include in Social Media Router
 * and in Social Media Frontend
 * and use the image in WIFI Network QR
 */

import { DataTypes, Model } from "sequelize";
import db from "../../config/db";
import { SocialMedia } from "./cSocialMediaM";

// === Group Facility Info & SocialMedia Info === //
export interface FacilityInfo {
  FacilityID: any;
  FacilityName: string;
  File: any;
  FacilityImageType: string;
  upSocialMedia: [SocialMedia];
}
// === Group Facility Info & SocialMedia Info === //
export interface Facility {
  id: any;
  name: string;
  image: string;
  imgType: string;
}

export class C_Facility extends Model<Facility> {}

C_Facility.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    imgType: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "C_Facility",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);

// C_Language.sync({ alter: true })
