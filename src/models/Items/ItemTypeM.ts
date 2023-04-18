// =============== //
// == Item Type == //
// =============== //

/**
 * Item Type it`s Lv.1 of Menu
 * It includes the first and main level of classification of lists
 *
 * GET / UPDATE / INSERT / DELETE
 * ORDER LIST for Events
 * Active Event || Not
 * Note :: For Event,
 *      the Name of Event must be included but Body isn't required
 */

import { DataTypes, Model } from "sequelize";
import db from "../../config/db";

// === Group Events & Language === //
export interface ItemTypesFull {
  ItemTypesID: any;
  File: any;
  EventsImageType: string;
  EventsActive: any;
  EventsInfoArray: [ItemTypesLanguage];
}
// === Group Events & Language === //

// === Events DB === //
export interface ItemTypes {
  id: any;
  listNum: any;
  image: string;
  imgType: string;
  active: boolean;
}

export class V_ItemTypes extends Model<ItemTypes> {}
V_ItemTypes.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
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
  },
  {
    sequelize: db,
    tableName: "V_ItemTypes",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);
// V_Events.sync({ alter: true })
// === Events DB === //

// === EventsLanguage DB === //
export interface ItemTypesLanguage {
  id: any;
  EventID: any;
  lang: string;
  name: string;
  description: string;
}
export class V_ItemTypesLanguage extends Model<ItemTypesLanguage> {}
V_ItemTypesLanguage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    EventID: {
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
    tableName: "V_ItemTypesLanguage",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);
// V_EventsLanguage.sync({ alter: true })

// === EventsLanguage DB === //
/**
 * Used to Get Info from Both Tables
 */
V_ItemTypes.hasMany(V_ItemTypesLanguage, {
  as: "info",
  foreignKey: "EventID",
  sourceKey: "id",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
V_ItemTypesLanguage.belongsTo(V_ItemTypes, {
  foreignKey: "EventID",
  targetKey: "id",
});
