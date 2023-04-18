// =============== //
// ==== Events === //
// =============== //

// interface to Events Table
// == id / icon / link / active

import { CreationOptional, DataTypes, Model } from "sequelize";
import db from "../../config/db";

// === Group Events & Language === //
export interface EventsFull {
  EventsID: any;
  File: any;
  EventsImageType: string;
  EventsActive: any;
  EventsInfoArray: [EventsLanguage];
}
// === Group Events & Language === //

// === Events DB === //
export interface Events {
  id: any;
  listNum: any;
  image: string;
  imgType: string;
  active: boolean;
}

export class V_Events extends Model<Events> {}
V_Events.init(
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
    tableName: "V_Events",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);
// V_Events.sync({ alter: true })
// === Events DB === //

// === EventsLanguage DB === //
export interface EventsLanguage {
  id: any;
  EventID: any;
  lang: string;
  name: string;
  description: string;
}
export class V_EventsLanguage extends Model<EventsLanguage> {}
V_EventsLanguage.init(
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
    tableName: "V_EventsLanguage",
    // I don't want timestamps!
    createdAt: false,
    updatedAt: false,
  }
);
// V_EventsLanguage.sync({ alter: true })
// === EventsLanguage DB === //
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
