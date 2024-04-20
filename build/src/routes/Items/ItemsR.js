"use strict";
// =============== //
// ==== Item ===== //
// =============== //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsRouter = void 0;
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
const express_1 = __importDefault(require("express"));
const cors_1 = require("../../config/cors");
const UpFiles_1 = require("../../middleware/UploadFile/UpFiles");
const vItems_1 = require("../../middleware/Items/vItems");
const ItemsRouter = express_1.default.Router();
exports.ItemsRouter = ItemsRouter;
/** GET Items && Items INFO page **/
// === Get All Items from Server by Front Language === //
ItemsRouter.route("/view/:lang/:ID")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    const Lang = req.params.lang; // === Active Language
    const ID = req.params.ID; // === ItemTypeID || ItemID
    try {
        await (0, vItems_1.ItemsGatAll)(Lang, ID).then((ItemSend) => {
            return res.json(ItemSend);
        });
    }
    catch (e) {
        return res.json(e);
    }
});
// === Get All Items from Server by Front Language === //
ItemsRouter.route("/Update/:ID")
    // GET
    .get(cors_1.corsWithOptions, async (req, res, next) => {
    // const params = req.params;
    const ID = req.params.ID; // === Event ID
    try {
        await (0, vItems_1.ItemGetUpdateID)(ID).then((ItemSend) => {
            return res.json(ItemSend);
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
UpFiles_1.fileUp.single("File"), async (req, res, next) => {
    const ID = req.params.ID; // === ItemTypeID
    const Full = req.body;
    console.log("Full By ID ::", Full);
    const ItemTypeID = Full.ItemTypeID;
    const Active = Full.Active;
    const ImageType = Full.ImageType;
    const Price = Full.Price;
    const InfoArray = Full.InfoArray;
    const IMG = await (0, UpFiles_1.fileDB)(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
    try {
        await (0, vItems_1.ItemUpdateID)(ID, ItemTypeID, IMG, ImageType, Active, Price, InfoArray).then((ItemSend) => {
            return res.json(ItemSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
})
    // Delete
    .delete(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
async (req, res, next) => {
    const ID = req.params.ID; // === ItemTypeID
    try {
        await (0, vItems_1.ItemDeleteID)(ID).then((ItemSend) => {
            return res.json(ItemSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});
ItemsRouter.route("/Update/")
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
UpFiles_1.fileUp.single("File"), async (req, res, next) => {
    const Full = req.body;
    console.log("Full ::", Full);
    const ItemTypeID = Full.ItemTypeID;
    const Active = Full.Active;
    const ImageType = Full.ImageType;
    const Price = Full.Price;
    const InfoArray = Full.InfoArray;
    const IMG = await (0, UpFiles_1.fileDB)(req.file?.path, req.body.File, ImageType); // Files Ro Images To DB
    // console.log("Full ::", Full, "Active ::", Active);
    try {
        await (0, vItems_1.ItemNew)(ItemTypeID, IMG, ImageType, Active, Price, InfoArray).then((ItemSend) => {
            return res.json(ItemSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});
/** Update Location of ItemType in View All ItemType Page **/
ItemsRouter.route("/OrderList")
    // Update
    .put(cors_1.corsWithOptions, 
// TokenCheck,
// ifAdmin,
async (req, res, next) => {
    const Full = req.body;
    try {
        await (0, vItems_1.ItemsOrderList)(Full).then((ItemSend) => {
            return res.json(ItemSend); // True/False
        });
    }
    catch (e) {
        return res.json(e);
    }
});
