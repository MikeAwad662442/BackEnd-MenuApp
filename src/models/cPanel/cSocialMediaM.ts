// ==================== //
// === Social Media === //
// ==================== //

// interface to Social Media Table
// == id / icon / link / active

import { DataTypes, Model } from "sequelize";
import db from "../../config/db";

interface SocialMedia {
    id: string;
    icon: string;
    link: string;
    active: boolean;
}

export class C_SocialMedia extends Model<SocialMedia>{ }

C_SocialMedia.init(
    {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: true,
            unique: true,
        },
        icon: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        tableName: "C_SocialMedia",
        // I don't want timestamps!
        createdAt: false,
        updatedAt: false,
    }
);

// C_SocialMedia.sync({ alter: true })