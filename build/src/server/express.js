"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exp = void 0;
// ==================== //
// = All EXPRESS TOOLS  //
// ==================== //
const express_1 = __importDefault(require("express")); // Import Express Server
const compression_1 = __importDefault(require("compression")); // compress all Files before be sended to the Client
const cors_1 = require("../config/cors");
const path_1 = __importDefault(require("path"));
const exp = (0, express_1.default)();
exports.exp = exp;
exp
    .use((0, compression_1.default)({ level: 6 })) // compress all Files before be sended to the Client
    .use(cors_1.corsWithOptions) // to let Browser connect express server
    .use(express_1.default.json()) // Get JSON from Body
    // === to read the www file it must to add to same path of server.ts === //
    .use("/", express_1.default.static("./www")) // === Red Files === //
    // === to read the www file it must to add to same path of server.ts === //
    .use(express_1.default.static("public")); // === Red Files === //
// === Routes === //
// ItemTypesRouter
const ItemTypeR_1 = require("../routes/Items/ItemTypeR");
exp.use("/ItemTypes", ItemTypeR_1.ItemTypesRouter);
// ItemsRouter
const ItemsR_1 = require("../routes/Items/ItemsR");
exp.use("/Items", ItemsR_1.ItemsRouter);
// EventsRouter
const eventsR_1 = require("../routes/Events/eventsR");
exp.use("/events", eventsR_1.EventsRouter);
// *** cPanel *** //
// LanguageRouter
const cLanguageR_1 = require("../routes/cPanel/cLanguageR");
exp.use("/language", cLanguageR_1.LanguageRouter);
// SocialMedia
const cSocialMediaR_1 = require("../routes/cPanel/cSocialMediaR");
exp.use("/social", cSocialMediaR_1.SocialMediaRouter);
// QR Server
const cQR_R_1 = require("../routes/cPanel/cQR_R");
exp.use("/qr", cQR_R_1.QR);
// *** cPanel *** //
// === Routes === //
// === Front === //
exp.get("*", cors_1.corsWithOptions, (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, "./../../www/index.html"));
});
