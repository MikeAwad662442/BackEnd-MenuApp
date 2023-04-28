// =============== //
// ==== Item ===== //
// =============== //

/**
 * Items it`s Lv.2 of Menu
 * It`s includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Items
 * Active Items || Not
 * Note :: For Items,
 *      the Name & Body of Items must be included
 */

import { DataTypes, Model } from "sequelize";
import db from "../../config/db";
import { V_ItemTypes } from "./ItemTypeM";

// === Group ItemTypes & Language === //
export interface ItemsFull {
  ID: any;
  ItemTypeID: any;
  File: any;
  ImageType: string;
  Active: any;
  Price: number;
  InfoArray: [ItemsLanguage];
}
// === Group ItemTypes & Language === //
// === ItemTypes DB === //
export interface Items {
  id: any;
  ItemTypeID: any;
  listNum: any;
  image: string;
  imgType: string;
  active: boolean;
  price: number;
}

export class V_Items extends Model<Items> {}
V_Items.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    ItemTypeID: {
      type: DataTypes.UUID,
      unique: false,
      allowNull: true,
    },
    listNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
    },
    imgType: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
      unique: false,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "V_Items",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);
// V_Items.sync({ alter: true })
// === ItemTypes DB === //

// === ItemTypesLanguage DB === //
export interface ItemsLanguage {
  id: any;
  ItemsID: any;
  lang: string;
  name: string;
  description: string;
}
export class V_ItemsLanguage extends Model<ItemsLanguage> {}
V_ItemsLanguage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    ItemsID: {
      type: DataTypes.UUID,
      unique: false,
      allowNull: true,
    },
    lang: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "V_ItemsLanguage",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);
// V_ItemTypesLanguage.sync({ alter: true })

// === ItemTypesLanguage DB === //
/**
 * Used to Get Info from Both Tables
 */
V_Items.hasMany(V_ItemsLanguage, {
  as: "info",
  foreignKey: "ItemsID",
  sourceKey: "id",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
V_ItemsLanguage.belongsTo(V_Items, {
  foreignKey: "ItemsID",
  targetKey: "id",
});
V_Items.belongsTo(V_ItemTypes, {
  foreignKey: "ItemTypeID",
  targetKey: "id",
});
